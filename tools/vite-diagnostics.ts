import type { Plugin } from "vite";

/** Standard Vite hooks only: no framework source rewriting or vendor globals. */
export function proofStateDiagnostics(): Plugin {
  let buildFailureReported = false;
  const reportBuild = (error: unknown) => {
    if (!error || buildFailureReported) return;
    buildFailureReported = true;
    console.error("[proof-state:build-error] Build rejected; see the Vite diagnostic above.");
  };
  return {
    name: "proof-state:diagnostics",
    buildEnd: reportBuild,
    renderError: reportBuild,
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        response.once("finish", () => {
          if (response.statusCode < 500) return;
          // Do not send request URLs, headers, bodies, error messages or stacks over HMR.
          const data = {
            service: "proof-and-state-website",
            kind: "server-response",
            status: response.statusCode,
          };
          server.config.logger.error(
            `[proof-state:server-error] HTTP ${response.statusCode}; inspect the server error log.`,
          );
          server.ws.send({ type: "custom", event: "proof-state:server-error", data });
        });
        next();
      });
    },
  };
}
