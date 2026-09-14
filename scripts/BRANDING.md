# Website identity acceptance

The approved September 2 mark is unchanged. `/brand/v1/` is a stable identity release,
not a timestamp that changes on every deployment. Legacy `/favicon.ico` remains the
approved multi-resolution ICO. Root Apple aliases are provided for fallback discovery.

Normal builds use committed PNG/ICO bytes and need no additional rendering dependency.
For an intentional, reviewed identity release only, `render_branding.py --update-contract`
exports raster files from the approved SVG using CairoSVG 2.8.2 and Pillow 11.3.0.
The share-image text uses Liberation Sans (Arial fallback). Rendering environments may
produce different antialiasing: review and commit exports and their hashes together.
Never regenerate the golden contract automatically in normal CI or deployment.

## Checks

- `python3 -m unittest discover -s tests -v`: negative and positive regression cases.
- `python3 scripts/verify_branding.py --assets public`: source bytes and cache rules.
- `bun run build && bash scripts/check_built_branding.sh`: exact output assets and SSR
  head metadata through the generated Cloudflare Worker, without browser JavaScript.
- `python3 scripts/verify_branding.py --assets .output/public --origin https://proofandstate.com --www --attempts 6 --report branding-evidence/production.json`:
  compare each response against pinned source Git blob hashes (also record SHA-256),
  validate content types, image dimensions, cache policy, manifest, canonical redirects,
  and metadata on home, status and products. Alternate-host assets may serve the same
  correct bytes directly or redirect strictly to the canonical same path.

Source and built checks happen before deployment; live checks happen after deployment.
A failing live check marks deployment acceptance failed; it does not undo an already
uploaded Worker. Roll back the known deployment using Cloudflare when necessary, then
re-run the prior revision's acceptance checks. Do not report a failed gate as a pass.

The evidence artifact records commit, observation time, asset hashes, headers and SSR
metadata. Googlebot-labelled HTTP probes exercise that user-agent path only; they do not
prove requests from Google's infrastructure or that a third-party favicon cache refreshed.

## Cache boundaries

`public/_headers` applies policies to the static-asset service (not merely SSR responses).
Mutable discovery aliases and the web manifest revalidate. Immutable v1 assets have a
one-year cache lifetime. Do not overwrite v1 imagery; publish v2 for a future brand change.
The tests forbid overlapping cache-header declarations and protect mutable aliases.

An old ChatGPT citation or another platform's stored preview is outside this deployment's
cache boundary. Correct source, production and crawler-facing metadata do not prove that
an old external preview changed. Record that acceptance separately; no refresh deadline
or ability to invalidate a third-party private cache is implied.

References:
- https://developers.cloudflare.com/workers/static-assets/headers/
- https://developers.google.com/search/docs/appearance/favicon-in-search
- https://ogp.me/
