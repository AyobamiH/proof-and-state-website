/** Stable brand revision: change only for an intentional identity release, not each deploy. */
export const BRAND_ROOT = "/brand/v1";
export const BRAND_MARK = `${BRAND_ROOT}/proof-and-state-mark.svg`;
export const BRAND_SHARE_IMAGE = `${BRAND_ROOT}/share.png`;
export const BRAND_IMAGE_ALT = "Proof & State: evidence for AI-assisted software delivery";

export const BRAND_LINKS = [
  { rel: "shortcut icon", href: `${BRAND_ROOT}/favicon.ico`, type: "image/x-icon" },
  { rel: "icon", href: `${BRAND_ROOT}/favicon-32.png`, type: "image/png", sizes: "32x32" },
  { rel: "icon", href: `${BRAND_ROOT}/icon-96.png`, type: "image/png", sizes: "96x96" },
  { rel: "icon", href: BRAND_MARK, type: "image/svg+xml", sizes: "any" },
  { rel: "apple-touch-icon", href: `${BRAND_ROOT}/apple-touch-icon.png`, sizes: "180x180" },
  { rel: "manifest", href: "/site.webmanifest" },
];
