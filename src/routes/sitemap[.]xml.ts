import { createFileRoute } from "@tanstack/react-router";

import { SITE_URL } from "@/content/site";

const STATIC_PATHS = [
  "/",
  "/products",
  "/donestate",
  "/products/opstruth",
  "/products/agentproof",
  "/trust",
  "/security",
  "/open-source",
  "/changelog",
  "/about",
  "/contact",
  "/status",
  "/legal/privacy",
  "/legal/terms",
] as const;

function buildSitemap() {
  const urls = STATIC_PATHS.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
