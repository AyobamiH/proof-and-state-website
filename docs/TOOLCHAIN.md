# Proof & State-owned website toolchain

## Audit before replacement

Baseline source: `484be40385f44223a3b748b77cafa13ae80ddd60`.
The installed `@lovable.dev/vite-tanstack-config` was version 2.15.0.
Its actual `dist/index.js` SHA-256 was `4120dbf90a55a4aef406ef55fb89a3880b4ef68b027434c4dfa01dd5071b63049`.
Audit run 34805035442 exercised the inherited production build and Worker.
Run 34805597832 retained the installed source, project snapshot, resolved config
and generated Wrangler contract in `owned-toolchain-source-audit`.
The executable factory, not just its comments or declarations, informed this migration.

The package WAS related to the build even though hosting was already independent.
This replaces its composition, not the underlying open-source projects with pretend
in-house copies. TanStack, React, Vite, Tailwind, Lightning CSS and Nitro retain their
upstream names and licences. No vendor source was copied into the replacement.

## Capability mapping

| Inherited capability | Owned replacement / disposition |
| --- | --- |
| React, TanStack Start and file-route generation | Direct Vite plugin imports; existing router and server entry preserved |
| Build-only Nitro default Cloudflare output | Explicit `cloudflare-module` preset; generated Wrangler contract checked against the baseline |
| Tailwind and Lightning CSS transformation | Direct plugins and explicit CSS transformer; existing locked Lightning CSS 1.33.0 promoted to a direct dependency |
| TypeScript aliases and React/query deduplication | Explicit alias, tsconfig-paths, six dedupe entries and existing optimiser entries |
| VITE_ environment definitions | Native Vite prefix boundary; explicit public/private canary build tests |
| Development builds with development React | Existing client NODE_ENV and keepNames behaviour retained |
| Devtools source inspection | Direct locked TanStack devtools 0.8.3 in development, no editor bridge or console piping |
| Local watch debounce | Explicit 1s stability / 100ms poll and owned temporary-folder ignores |
| All-interface port 8080 default | Port retained, intentionally tightened to loopback and strict port; native HMR overlay enabled |
| Dev SSR and server-function error transforms | Standard Vite completion hooks, native terminal diagnostics, and existing application middleware; no rewriting TanStack internals |
| Optional browser editor error hooks | Owned route boundary, React hydration callbacks and window error/rejection listeners |
| Sandbox build-error serialiser | Native Vite diagnostic plus owned failure classification; this sandbox-only serialiser was not active in the owned production build |
| Preview asset proxy, sandbox bridge, HMR gate, bundled-dev CSS shim, fetch-bundle preset and sandbox flag rewriting | Removed, not renamed: conditional vendor-editor paths unused by this site's Cloudflare deployment |
| Four package-age exemptions | Removed; the 24-hour installation guard remains |
| Editor workspace metadata | Removed; complete design brief retained as superseded history |

## Diagnostics and privacy boundary

Browser events are local `proof-state:runtime-error` CustomEvents and console signals.
They contain service, error category and optional Response status only. No error text,
stack, URL, request body, cookies or tokens are sent in that event. Same-error signals
are deduplicated and limited to 20 per minute. Local development also prints the original
error for debugging. React callbacks use supported hydrateRoot options rather than
patching a minified React bundle. Listener disposal supports hot reload.

There is no invented telemetry backend: browser events are NOT durable remote alerts.
Server diagnostics continue through existing console/Error cause-chain handling and
Cloudflare observability. The existing five-second server error capture is preserved,
not newly claimed to provide request-scoped distributed tracing.

`proof-state:server-error` is a local Vite HMR signal for 5xx responses, with no raw
request/error data. Vite's own transform/build errors remain visible in its terminal
and overlay. Server-function failures still pass through application middleware;
HTTP 200 error envelopes are not falsely described as 5xx notifications.

## Verification and maintenance

- `bun install --frozen-lockfile`, lint, TypeScript, owned unit tests and the existing
  20 branding regressions run before acceptance.
- `scripts/verify_toolchain.py` checks executable vendor markers, direct dependencies,
  unchanged protected source and the generated deployment contract. Bare product
  ecosystem mentions and historical provenance are intentionally not executable markers.
- `scripts/check_toolchain_integration.sh` uses an isolated archived workspace for
  negative import protection, explicit environment probes, browser hydration/navigation,
  successful/failing server functions and a cross-origin POST denial. Fixtures never ship.
- Existing branding checks run against the exact built Worker and production.
- Production toolchain readback compares the delivered JS/CSS bytes with the deployed
  build. Browser readback uses desktop/mobile layouts and retains screenshots.

The baseline hashes are migration guards. Future intentional edits to protected source
require reviewing and updating those guards in the same PR, not disabling acceptance.
Normal builds never regenerate branding or this baseline. A successful upload is not
production acceptance; inspect the post-deployment checks and retained evidence.
Rollback uses the prior Cloudflare deployment version and re-verifies prior contracts.

## Primary references

- https://tanstack.com/start/latest/docs/framework/react/guide/hosting
- https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point
- https://tanstack.com/start/latest/docs/framework/react/guide/import-protection
- https://react.dev/reference/react-dom/client/hydrateRoot
- https://vite.dev/guide/env-and-mode
- https://vite.dev/config/server-options
- https://nitro.build/deploy/providers/cloudflare
