---
schema: clawsweeper.project-vision.v1
project_id: proof-and-state-website
repository: AyobamiH/proof-and-state-website
---

# Project Vision

## Identity

This repository is the independently owned public frontend for Proof & State.

## Purpose

Explain the Proof & State product family clearly, accurately, and accessibly while keeping every runtime, release, marketplace, and verification claim grounded in current portfolio evidence.

## Owns

- proofandstate.com frontend source, routes, design, metadata, and public content.
- Website build configuration, client diagnostics, and Cloudflare deployment configuration.
- Public navigation between Proof & State products and their canonical service surfaces.

## Does Not Own

- Portfolio governance or evidence truth; that belongs to proof-and-state.
- DoneState, OpsTruth, or AgentProof runtime behaviour.
- Marketplace/review status merely because the website displays it.
- Lovable as a source or deployment authority.

## Non-Negotiable Invariants

- Public claims must not outrun current governance evidence.
- A receipt, page, health response, or successful build is not automatically proof of product completion.
- The owned repository and Cloudflare Worker are the website source/deployment authorities.
- Branding and product names must match the canonical portfolio identities.
- Only public client-safe configuration may reach frontend code.

## Evidence of Done

A website change is done when the repository checks pass, the built output represents the intended content, and any production claim is backed by the appropriate governance/runtime evidence. Production deployment is a separate action.

## Relationships

- proof-and-state: governance and evidence authority.
- DoneState, OpsTruth, AgentProof: products described and linked by this frontend.

## Canonical Sources

README.md, AGENTS.md, docs/TOOLCHAIN.md, and current Proof & State governance records for product-status claims.

## Agent Rule

Treat this repository as a communication surface, not as evidence authority. When wording and portfolio evidence disagree, fix or flag the wording rather than inventing status.
