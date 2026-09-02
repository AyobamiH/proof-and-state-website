/**
 * Public site identity, links and navigation.
 * Internal implementation records live in the project repositories, not in public copy.
 */

export const SITE_NAME = "Proof & State";
export const SITE_URL = "https://proofandstate.com";
export const SITE_TAGLINE = "Evidence for AI-assisted software delivery";

export const GITHUB_URL = "https://github.com/AyobamiH/proof-and-state-website";
export const CONTACT_EMAIL = "hello@proofandstate.com";
export const SECURITY_EMAIL = "security@proofandstate.com";
export const GOVERNANCE_REPO_URL = "https://github.com/AyobamiH/proof-and-state";

export const REPO_URLS = {
  donestate: "https://github.com/AyobamiH/donestate",
  opstruth: "https://github.com/AyobamiH/opstruth",
  agentproof: "https://github.com/AyobamiH/agentproof",
} as const;

export const SERVICE_URLS = {
  donestate: "https://donestate.proofandstate.com",
  donestateMcp: "https://donestate.proofandstate.com/mcp",
  opstruth: "https://opstruth.io",
  opstruthMcp: "https://mcp.opstruth.io/mcp",
} as const;

export const OPSTRUTH_MARKETPLACE_URL = "https://github.com/marketplace/actions/opstruth-evidence";

export const DONESTATE_REVIEW_STATUS =
  "DoneState is live on its owned service domain. DoneState 0.2.0 remains in OpenAI review, and its GitHub Marketplace listing is also under external review. Neither review state means approval or public listing there.";

export const OPSTRUTH_STATUS =
  "OpsTruth is publicly available as the opstruth-evidence GitHub Marketplace Action, with v1.0.0 and the stable v1 reference published.";

export const AGENTPROOF_STATUS =
  "AgentProof is in development. Its contract is defined, but downstream release work remains and it is not presented as a released product.";

export const SYSTEM_DEFINITION =
  "Proof & State builds tools that help teams use AI in software delivery with clearer boundaries, reviewable changes and evidence that can be checked independently.";

export const NAV_GROUPS = [
  {
    label: "Products",
    to: "/products",
    items: [
      { label: "Overview", to: "/products", note: "What is available now and what is next" },
      { label: "DoneState", to: "/donestate", note: "Reviewable repository maintenance" },
      { label: "OpsTruth", to: "/products/opstruth", note: "Independent software evidence checks" },
      { label: "AgentProof", to: "/products/agentproof", note: "In development" },
    ],
  },
  {
    label: "Trust",
    to: "/trust",
    items: [
      { label: "How we build trust", to: "/trust", note: "Public commitments and limits" },
      { label: "Security", to: "/security", note: "Security posture and disclosure" },
      { label: "Open source", to: "/open-source", note: "Repositories and public releases" },
      { label: "Status", to: "/status", note: "Current product and distribution status" },
    ],
  },
  {
    label: "Company",
    to: "/about",
    items: [
      { label: "About", to: "/about", note: "Why Proof & State exists" },
      { label: "Changelog", to: "/changelog", note: "Published release record" },
      { label: "Contact", to: "/contact", note: "Get in touch" },
    ],
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Products",
    links: [
      { label: "Overview", to: "/products" },
      { label: "DoneState", to: "/donestate" },
      { label: "OpsTruth", to: "/products/opstruth" },
      { label: "AgentProof", to: "/products/agentproof" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { label: "How we build trust", to: "/trust" },
      { label: "Security", to: "/security" },
      { label: "Open source", to: "/open-source" },
      { label: "Status", to: "/status" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Changelog", to: "/changelog" },
      { label: "Contact", to: "/contact" },
    ],
  },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy", to: "/legal/privacy" },
  { label: "Terms", to: "/legal/terms" },
] as const;

export const TRUST_STRIP = [
  {
    label: "Reviewable changes",
    detail:
      "Repository maintenance is prepared for review instead of being silently treated as finished.",
    to: "/donestate",
  },
  {
    label: "Independent checks",
    detail: "OpsTruth inspects software evidence without changing the system it is checking.",
    to: "/products/opstruth",
  },
  {
    label: "Clear product status",
    detail: "Live, under review and in-development states are described separately.",
    to: "/status",
  },
  {
    label: "Source you can inspect",
    detail: "Public claims are tied back to repositories and published releases where available.",
    to: "/open-source",
  },
] as const;

export const HARNESS_TARGETS = [
  { name: "Codex", note: "AI coding workflow" },
  { name: "Claude Code", note: "AI coding workflow" },
  { name: "Cursor", note: "AI-assisted editor" },
  { name: "Lovable", note: "Application build workflow" },
  { name: "OpenClaw", note: "Agent workflow" },
  { name: "Replit", note: "Hosted development environment" },
] as const;

export const HARNESS_DISCLAIMER =
  "These names describe ecosystem workflows only. They are not claims of partnership, endorsement, certification or affiliation.";
