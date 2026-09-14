import { BRAND_IMAGE_ALT, BRAND_SHARE_IMAGE } from "@/content/brand";
import { SITE_NAME, SITE_URL } from "@/content/site";

export type HeadInput = {
  title: string;
  description: string;
  /** Absolute path beginning with "/". */
  path: string;
  type?: "website" | "article";
};

/** Builds unique per-route metadata with a self-referencing canonical and og:url. */
export function buildHead({ title, description, path, type = "website" }: HeadInput) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? title : `${title} — ${SITE_NAME}`;
  const image = `${SITE_URL}${BRAND_SHARE_IMAGE}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: BRAND_IMAGE_ALT },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: BRAND_IMAGE_ALT },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    }),
  };
}

export function jsonLd(data: Record<string, unknown>) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}
