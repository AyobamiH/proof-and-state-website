# Proof & State — Information Architecture, Visual System and Discoverability Plan

Current state: 5 routes (`/`, `/products`, `/architecture`, `/trust`, `/developers`), a `ps/` component set (proof pipeline, architecture diagram, evidence console, product modules, state timeline, terminal), semantic state tokens already defined in `src/styles.css` (verified / risky / unproven / terminal), `public/robots.txt` present, no sitemap, no llms.txt.

This plan defines the target architecture before any edits.

---

## 1. Route map

Nested route families so new pages never require a shell redesign.

```text
/                              Homepage
/products                      Overview + comparison of the three layers
/products/donestate            Product detail
/products/opstruth             Product detail
/products/agentproof           Product detail
/architecture                  System architecture, independence boundary
/architecture/state-model      Run states + transitions (deep dive)
/architecture/authority-model  Authority envelopes, separation of duties
/trust                         Trust by architecture (principles index)
/security                      Security posture, disclosure, least authority
/developers                    Developer gateway
/developers/quickstart         First run, install, verify
/developers/integrations       Harness/ecosystem compatibility targets
/docs                          Docs gateway (sectioned index, expandable)
/open-source                   Repos, licensing, contribution model
/changelog                     Release notes index (entry template ready)
/principles                    Research/principles essays index
/principles/$slug              Individual principle / technical article
/glossary                      Definitions of every entity and term
/about                         Company, thesis, who it is for
/contact                       Contact routes (email/GitHub, no fake forms)
/status                        Release + maturity status, explained honestly
/legal/privacy
/legal/terms
```

Improvements over the requested list:

- `/research` renamed `/principles` (matches the trust vocabulary) with `$slug` children so essays are individually indexable.
- `/glossary` added — the single strongest asset for AI retrieval quoting entity definitions correctly.
- `/architecture/state-model` and `/architecture/authority-model` split out so the architecture page stays readable while depth grows.
- `/docs` is a gateway now, structured so `/docs/$product/$slug` can be added later without moving URLs.
- `/changelog` uses a data file per release; `/changelog/$version` can be added when volume justifies it.

Reserved for later, designed for but not built: `/customers`, `/protocols`, `/products/$slug` beyond the three, `/docs/$product/$slug`.

Note: `/trust` here is the app-owned "trust by architecture" page and stays distinct from Lovable's reserved `/.well-known/trust.html`.

---

## 2. Page purpose and content

| Route                            | Purpose                                               | Core blocks                                                                                                                                                                                                                                                        |
| -------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                              | Thesis + system overview, route into each layer       | Status bar, hero + proof rail, trust strip, three product modules, architecture preview, evidence panels, ecosystem, principles, developer CTA, final CTA                                                                                                          |
| `/products`                      | How the three layers relate and why they are separate | Relationship diagram, layer comparison matrix, per-product summary cards linking to details                                                                                                                                                                        |
| `/products/donestate`            | Durable execution/control plane                       | Definition block, capability list (admission, budgets, leases, idempotency, state transitions, crash recovery, audit evidence), state timeline specimen, "cannot self-verify" boundary callout, repo link, related links                                           |
| `/products/opstruth`             | Independent read-only verifier                        | Definition, evidence sources inspected (repo, stack, tests, build, CI, secrets, config, routes, runtime, deployment), Verified/Risky/Unproven matrix specimen, explicit non-capabilities (no deploy, no DB mutation, no publish, no restart, no writes), repo link |
| `/products/agentproof`           | Authorised transaction + signed receipt layer         | Definition, prepared state + authority, exactly-once execution/recovery, receipt specimen, proposer/authority/executor/signer/verifier separation table, repo link                                                                                                 |
| `/architecture`                  | Whole-system topology                                 | Large diagram with INDEPENDENCE BOUNDARY, data/authority flow, "Self-verification is not proof", links to the two deep dives                                                                                                                                       |
| `/architecture/state-model`      | Run lifecycle                                         | Full state table, transition diagram, failure/recovery paths                                                                                                                                                                                                       |
| `/architecture/authority-model`  | Authority envelopes                                   | Envelope anatomy, scope/limits, separation-of-duties matrix                                                                                                                                                                                                        |
| `/trust`                         | Architectural trust principles                        | Least authority, consequence envelopes, exact-commit evidence, separation of duties, deterministic recovery, no self-verification — each linking to `/principles/$slug`                                                                                            |
| `/security`                      | Posture and reporting                                 | Threat model boundaries, read-only guarantees, secret handling posture, responsible disclosure contact. Only claims backed by the architecture; no certifications                                                                                                  |
| `/developers`                    | Entry point for engineers                             | Paths (quickstart, integrations, docs, open source), terminal specimens, repo grid                                                                                                                                                                                 |
| `/developers/quickstart`         | Get something verified                                | Ordered steps, `npx opstruth`, `npm install -g donestate`, AgentProof source/RC wording, expected output surfaces                                                                                                                                                  |
| `/developers/integrations`       | Harness compatibility                                 | Codex, Claude Code, Cursor, Lovable, OpenClaw, Replit as compatibility/target workflows, with an explicit no-partnership statement                                                                                                                                 |
| `/docs`                          | Documentation gateway                                 | Sectioned index per product + concepts; each card links to repo docs today, in-app docs later                                                                                                                                                                      |
| `/open-source`                   | Source and contribution                               | Repo table (donestate, opstruth, agentproof), licence, issue/PR expectations, GitHub-first CTA                                                                                                                                                                     |
| `/changelog`                     | Release history                                       | Reverse-chronological entries from a typed data file; version, date, layer tag, summary                                                                                                                                                                            |
| `/principles`                    | Editorial/technical writing index                     | Card list of essays                                                                                                                                                                                                                                                |
| `/principles/$slug`              | One essay                                             | Technical publication layout, TechArticle schema, breadcrumbs                                                                                                                                                                                                      |
| `/glossary`                      | Definitions                                           | Alphabetical `<dl>` of entities and terms with cross-links                                                                                                                                                                                                         |
| `/about`                         | Company and thesis                                    | What accountability infrastructure means, scope of ambition, no maturity or headcount claims                                                                                                                                                                       |
| `/contact`                       | Reach us                                              | Email + GitHub issues, expectation-setting; no fabricated SLAs                                                                                                                                                                                                     |
| `/status`                        | Honest status                                         | Per-component release/maturity stage explained in prose, link to changelog. Explicitly labelled "not a live uptime feed"                                                                                                                                           |
| `/legal/privacy`, `/legal/terms` | Owner-authored legal                                  | Site-scoped, plainly attributed to Proof & State                                                                                                                                                                                                                   |

---

## 3. Navigation, footer, linking

**Primary nav** (sticky, hairline base): Products (dropdown: overview + 3 products), Architecture, Trust (menu: Trust, Security, Principles), Developers (menu: Developers, Quickstart, Integrations, Docs), GitHub, theme toggle, `Explore the system` CTA. Mobile: same tree in an accordion sheet.

**Footer taxonomy** (5 columns + baseline): Products / Architecture / Trust & Security / Developers / Company. Baseline row: copyright, `execution ⟂ verification ⟂ receipts`, legal links, status link.

**Breadcrumbs**: rendered on every route below depth 1 via a shared `Breadcrumbs` component driven by route `staticData`, emitting BreadcrumbList JSON-LD alongside the visual trail.

**Internal linking rules**: every product page links to the other two plus `/architecture`; every principle links to the product that implements it; glossary terms link out from first use in product definitions; `/changelog` and `/status` cross-link; each page ends with a typed `RelatedLinks` block (3–4 links, no auto-generated link farms).

---

## 4. Visual system — Evidence Industrialism

**Palette** (replaces current tokens in `src/styles.css`, not a recolour): paper `#F7F6F3`-class near-white canvas, carbon ink text, graphite mid-tones, steel hairlines and rules; dark theme is carbon/graphite with paper-tinted text. Semantic only where it means something: green verified, amber risk, red denied/failed, blue informational, restrained safety orange for execution. No purple, no gradients as decoration.

**Type**: display grotesk for headings, neutral sans for body, mono for evidence, states, hashes and labels. Tight tracking on display, generous measure on body.

**Grid**: max width 1320, 12 columns, asymmetric splits (7/5, 8/4), section rules as hairlines, large vertical rhythm, radii 8–14px.

**Proprietary graphic language — the Evidence Rail**: a horizontal/vertical rail of nodes with mono labels, state chips and hash fragments, used as hero pipeline, section divider, diagram spine and page header ornament. This is the recognisable mark with the logo hidden.

**Specimen components** (reusable, data-driven):

- `EvidenceRail` — the rail in horizontal, vertical and compact variants
- `SystemDiagram` — labelled nodes, independence boundary, flow arrows
- `ReceiptSpecimen` — signed receipt with digest, authority, signer
- `AuthorityEnvelope` — scope/limits card
- `VerificationMatrix` — Verified / Risky / Unproven rows
- `StateTimeline` — ADMITTED → EXECUTING → VALIDATING → AWAITING_VERIFICATION → VERIFIED
- `Terminal` — command/output specimen
- `SpecPanel` — bordered technical panel with mono caption bar
- `DefinitionBlock` — entity definition, quotable, schema-aware
- `ComparisonMatrix`, `Callout`, `Breadcrumbs`, `RelatedLinks`, `PageHeader`, `SectionHeading`, `Prose`

**Layout templates**: `MarketingPage`, `ProductDetailPage`, `PublicationPage` (essays/legal), `DocsGatewayPage`, `IndexListPage`. New pages compose a template — the shell never changes.

**Motion**: line-draw on rails/diagrams, state-chip pulse, scroll reveal on section rules, hover reveals on specimen rows. All gated by `prefers-reduced-motion`.

---

## 5. SEO and AI discoverability

- Per-route `head()`: unique title, description, canonical, og:title/description/url, og:type, twitter:card. No og:image on `__root`.
- Server-rendered/static content everywhere; no client-only content gates.
- `public/robots.txt`: keep existing blocks, add a `Sitemap:` directive only once a public URL is confirmed.
- `sitemap.xml` as a TanStack server route (`src/routes/sitemap[.]xml.ts`) covering canonical public routes plus `$slug` entries from local content collections. Deferred until a public project URL exists — the site currently has no published URL; canonicals meanwhile use the `proofandstate.com` base already in the codebase, which we confirm with you before locking in.
- `llms.txt` at `public/llms.txt`: concise entity definitions for Proof & State, DoneState, OpsTruth, AgentProof, the independence boundary, plus a route index. `llms-full.txt` added once product pages exist, carrying the full definitions and non-capabilities.
- Structured data, truthful only: Organization + WebSite on `__root`; SoftwareSourceCode (with `codeRepository`) on each product page — not SoftwareApplication, since these are source projects; BreadcrumbList on nested routes; TechArticle on `/principles/$slug`; DefinedTermSet on `/glossary`.
- Entity discipline: one canonical sentence per product, repeated verbatim across site, llms.txt and schema so retrieval systems quote it correctly. Explicit relationship language ("DoneState executes; it cannot verify itself. OpsTruth verifies read-only and never writes. AgentProof authorises and signs.").
- FAQ content only where a real question exists (e.g. "Can OpsTruth deploy?" — no). No FAQPage schema padding, no doorway pages, no keyword stuffing.
- Stable descriptive URLs, `dateModified` on changelog/essays from real content dates only.

---

## 6. Phased implementation

1. **Foundations** — retoken `src/styles.css` to Evidence Industrialism, build layout templates and the design-system primitives, rebuild nav + footer with the new taxonomy, add breadcrumbs.
2. **Core surfaces** — rebuild `/` and `/products`, ship the three product detail pages with their specimens.
3. **Depth** — `/architecture` + two deep dives, `/trust`, `/security`, `/principles` (+ 3 essays), `/glossary`.
4. **Developer track** — `/developers`, `/quickstart`, `/integrations`, `/docs` gateway, `/open-source`.
5. **Company & operations** — `/about`, `/contact`, `/status`, `/changelog`, `/legal/*`.
6. **Discoverability** — per-route metadata audit, structured data, `llms.txt`, sitemap once the public URL is set, internal-link pass, full typecheck/build and responsive/a11y verification.

## Technical notes

TanStack Start file routes: `products.donestate.tsx` → `createFileRoute("/products/donestate")`. Content lives in typed collections under `src/content/` (products, principles, changelog, glossary, nav) so pages, sitemap, llms.txt and schema read one source. No database or backend — static-first throughout.
