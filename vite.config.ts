import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { proofStateDiagnostics } from "./tools/vite-diagnostics";

/** Proof & State owns this composition; upstream tools keep their own identities. */
export default defineConfig(async ({ command, mode }) => {
  const developmentBuild = command === "build" && mode === "development";
  const devPlugins = [];
  if (mode === "development") {
    const { devtools } = await import("@tanstack/devtools-vite");
    devPlugins.push(
      devtools({
        logging: false,
        eventBusConfig: { enabled: false },
        enhancedLogs: { enabled: false },
        consolePiping: { enabled: false },
        removeDevtoolsOnBuild: false,
        injectSource: { enabled: true },
      }),
    );
  }
  return {
    plugins: [
      ...devPlugins,
      tailwindcss(),
      tsconfigPaths({ projects: ["./tsconfig.json"] }),
      proofStateDiagnostics(),
      tanstackStart({
        server: { entry: "server" },
        client: { entry: "client" },
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
      }),
      ...(command === "build" ? [nitro({ preset: "cloudflare-module" })] : []),
      react(),
    ],
    // Vite exposes only VITE_ variables. Never inline all of process.env.
    envPrefix: "VITE_",
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      ignoreOutdatedRequests: true,
    },
    ...(developmentBuild
      ? {
          environments: {
            client: { define: { "process.env.NODE_ENV": JSON.stringify("development") } },
          },
          esbuild: { keepNames: true },
        }
      : {}),
    server: {
      host: "127.0.0.1",
      port: 8080,
      strictPort: true,
      hmr: { overlay: true },
      watch: {
        ignored: [
          "**/.workspace/**",
          "**/.agents/**",
          "**/.claude/**",
          "**/.tanstack/tmp/**",
          "**/branding-evidence/**",
        ],
        awaitWriteFinish: { stabilityThreshold: 1000, pollInterval: 100 },
      },
    },
    preview: { host: "127.0.0.1", port: 8080, strictPort: true },
  };
});
