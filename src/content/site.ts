/**
 * Site-level constants: identity, external sources, navigation and footer taxonomy.
 * Every route referenced here exists under src/routes.
 */

export const SITE_NAME = "Proof & State";
export const SITE_URL = "https://proofandstate.com";
export const SITE_TAGLINE = "Accountability infrastructure for autonomous engineering";

export const GITHUB_URL = "https://github.com/AyobamiH";
export const CONTACT_EMAIL = "hello@proofandstate.com";
export const SECURITY_EMAIL = "security@proofandstate.com";

/** Canonical governance repository for the Proof & State system and this website. */
export const GOVERNANCE_REPO_URL = "https://github.com/AyobamiH/proof-and-state";

export const REPO_URLS = {
  donestate: "https://github.com/AyobamiH/donestate",
  opstruth: "https://github.com/AyobamiH/opstruth",
  agentproof: "https://github.com/AyobamiH/agentproof",
} as const;

/**
 * Canonical live endpoints. These are the addresses to link; historical
 * workers.dev hostnames are not canonical and are not published here.
 */
export const SERVICE_URLS = {
  donestate: "https://donestate.proofandstate.com",
  donestateMcp: "https://donestate.proofandstate.com/mcp",
  opstruth: "https://opstruth.io",
  opstruthMcp: "https://mcp.opstruth.io/mcp",
} as const;

/** DoneState distribution status. Review is not approval and not directory publication. */
export const DONESTATE_REVIEW_STATUS =
  "DoneState 0.2.0 is in OpenAI Review. It is not approved and not published to any directory.";

/** The one-sentence definition of the umbrella system, quoted verbatim site-wide. */
export const SYSTEM_DEFINITION =
  "Proof & State is AI work accountability infrastructure: DoneState executes under declared authority, AgentProof authorises consequential actions and signs receipts, and OpsTruth verifies the result read-only from outside the execution path.";

export const NAV_GROUPS = [
  {
    label: "Products",
    to: "/products",
    items: [
      { label: "Overview", to: "/products", note: "How the three layers relate" },
      { label: "DoneState", to: "/donestate", note: "Durable execution and control plane" },
      { label: "OpsTruth", to: "/products/opstruth", note: "Independent read-only verifier" },
      {
        label: "AgentProof",
        to: "/products/agentproof",
        note: "Authorised transactions and receipts",
      },
    ],
  },
  {
    label: "Architecture",
    to: "/architecture",
    items: [
      { label: "System topology", to: "/architecture", note: "The independence boundary" },
      { label: "State model", to: "/architecture/state-model", note: "Run lifecycle and recovery" },
      {
        label: "Authority model",
        to: "/architecture/authority-model",
        note: "Envelopes and duties",
      },
    ],
  },
  {
    label: "Trust",
    to: "/trust",
    items: [
      { label: "Trust by architecture", to: "/trust", note: "Why structure beats assurance" },
      { label: "Security", to: "/security", note: "Posture and disclosure" },
      { label: "Principles", to: "/principles", note: "Long-form technical positions" },
      { label: "Glossary", to: "/glossary", note: "Definitions of every term" },
    ],
  },
  {
    label: "Developers",
    to: "/developers",
    items: [
      { label: "Developer gateway", to: "/developers", note: "Where to start" },
      { label: "Quickstart", to: "/developers/quickstart", note: "First verified run" },
      { label: "Integrations", to: "/developers/integrations", note: "Harness compatibility" },
      { label: "Documentation", to: "/docs", note: "Reference index" },
      { label: "Open source", to: "/open-source", note: "Repositories and licensing" },
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
    heading: "Architecture",
    links: [
      { label: "System topology", to: "/architecture" },
      { label: "State model", to: "/architecture/state-model" },
      { label: "Authority model", to: "/architecture/authority-model" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { label: "Trust by architecture", to: "/trust" },
      { label: "Security", to: "/security" },
      { label: "Principles", to: "/principles" },
      { label: "Glossary", to: "/glossary" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Get started", to: "/developers" },
      { label: "Quickstart", to: "/developers/quickstart" },
      { label: "Integrations", to: "/developers/integrations" },
      { label: "Documentation", to: "/docs" },
      { label: "Open source", to: "/open-source" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Status", to: "/status" },
      { label: "Changelog", to: "/changelog" },
    ],
  },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy", to: "/legal/privacy" },
  { label: "Terms", to: "/legal/terms" },
] as const;

export const TRUST_STRIP = [
  {
    label: "Read-only verification",
    detail: "OpsTruth holds no write authority over any system it inspects.",
    to: "/products/opstruth",
  },
  {
    label: "Signed receipts",
    detail: "Approval is bound to exact prepared state before execution.",
    to: "/products/agentproof",
  },
  {
    label: "Crash-safe state",
    detail: "Leases, idempotency keys and durable transitions on every run.",
    to: "/architecture/state-model",
  },
  {
    label: "No self-verification",
    detail: "A run closes on independent attestation, not on agent report.",
    to: "/trust",
  },
] as const;

/**
 * Harnesses these tools are designed to work alongside. These are compatibility
 * targets and integration surfaces — not partnerships, endorsements or affiliations.
 */
export const HARNESS_TARGETS = [
  { name: "Codex", note: "CLI coding harness" },
  { name: "Claude Code", note: "Terminal coding agent" },
  { name: "Cursor", note: "Editor-resident agent" },
  { name: "Lovable", note: "Application build agent" },
  { name: "OpenClaw", note: "Open harness" },
  { name: "Replit", note: "Hosted agent environment" },
] as const;

export const HARNESS_DISCLAIMER =
  "These are ecosystem targets and compatible workflows. Naming a harness is not a claim of partnership, endorsement, certification or affiliation.";
