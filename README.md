# Proof & State Website

This repository is the independently owned source of truth for the Proof & State public frontend.

- Canonical domain: [proofandstate.com](https://proofandstate.com)
- Published preview: [proof-state-forge.lovable.app](https://proof-state-forge.lovable.app)
- Website source: [AyobamiH/proof-and-state-website](https://github.com/AyobamiH/proof-and-state-website)
- Governance and evidence: [AyobamiH/proof-and-state](https://github.com/AyobamiH/proof-and-state)

Lovable was used to scaffold and publish the initial frontend. It is not the canonical source repository. The first owned snapshot maps Lovable commit `fa6f7271f2e15791578df335ecaba738ff401710` to repository import commit `852bf86763bd03ec8447be448637976438def2f3`.

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

## Truth boundaries

The website explains Proof & State products and links to their canonical service surfaces. Runtime, release, and verification claims must remain backed by current evidence in the governance repository. A receipt, static page, or passing health response does not by itself prove that an action completed successfully.

In particular, the DoneState OpenAI listing remains described as **In Review** until the platform reports approval, and a maintenance run remains **Awaiting Verification** when independent OpsTruth verification is inconclusive.

## Stack

- TanStack Start
- React and TypeScript
- Tailwind CSS
- Nitro Cloudflare output
