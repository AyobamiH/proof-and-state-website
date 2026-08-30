# Proof & State Website

This repository is the independently owned source of truth for the Proof & State public frontend.

- Canonical domain: [proofandstate.com](https://proofandstate.com)
- Website source: [AyobamiH/proof-and-state-website](https://github.com/AyobamiH/proof-and-state-website)
- Governance and evidence: [AyobamiH/proof-and-state](https://github.com/AyobamiH/proof-and-state)

Lovable was used only to scaffold the initial design direction. It is not the source, deployment, hosting, or domain authority. The first owned snapshot maps Lovable commit `fa6f7271f2e15791578df335ecaba738ff401710` to repository import commit `852bf86763bd03ec8447be448637976438def2f3`.

## Local development

Install [Bun](https://bun.sh), then run:

```sh
git clone https://github.com/AyobamiH/proof-and-state-website.git
cd proof-and-state-website
bun install --frozen-lockfile
bun run dev
```

## Verification

Run the same checks enforced by CI:

```sh
bun run lint
bunx tsc --noEmit
bun run build
```

The production build is emitted to `.output/`.

## Deployment

Production is deployed from this repository to the `proof-and-state-website` Cloudflare Worker. The committed Wrangler configuration attaches both `proofandstate.com` and `www.proofandstate.com`; the Worker redirects `www` requests to the canonical root domain with HTTP 308.

The deployment workflow runs only after changes reach `main` and requires these GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Lovable is not part of the production request or deployment path.

## Truth boundaries

The website explains Proof & State products and links to their canonical service surfaces. Runtime, release, and verification claims must remain backed by current evidence in the governance repository. A receipt, static page, or passing health response does not by itself prove that an action completed successfully.

In particular, the DoneState OpenAI listing remains described as **In Review** until the platform reports approval, and a maintenance run remains **Awaiting Verification** when independent OpsTruth verification is inconclusive.

## Stack

- TanStack Start
- React and TypeScript
- Tailwind CSS
- Nitro Cloudflare output
