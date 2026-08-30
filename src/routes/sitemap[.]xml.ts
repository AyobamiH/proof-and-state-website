import { createFileRoute } from "@tanstack/react-router";

import { PRINCIPLES } from "@/content/principles";
import { SITE_URL } from "@/content/site";

/**
 * Canonical public routes. Dynamic principle articles are expanded from the local
 * content collection, mirroring the /principles/$slug route's content source.
 * No <lastmod> is emitted: no authoritative per-page timestamp exists.
 */
const STATIC_PATHS = [
  "/",
  "/products",
  "/donestate",
  "/products/opstruth",
  "/products/agentproof",
  "/architecture",
  "/architecture/state-model",
  "/architecture/authority-model",
  "/trust",
  "/security",
  "/principles",
  "/glossary",
  "/developers",
  "/developers/quickstart",
  "/developers/integrations",
  "/docs",
  "/open-source",
  "/changelog",
  "/about",
  "/contact",
  "/status",
  "/legal/privacy",
  "/legal/terms",
];

function buildSitemap() {
  const paths = [
    ...STATIC_PATHS,
    ...PRINCIPLES.map((principle) => `/principles/${principle.slug}`),
  ];
  const urls = paths.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join("\n");
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
