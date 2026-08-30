import { REPO_URLS } from "./site";

export type ProductKey = "donestate" | "opstruth" | "agentproof";

export type RunState = {
  state: string;
  detail: string;
  tone: "info" | "exec" | "risk" | "verified" | "unproven";
};

export type Product = {
  key: ProductKey;
  name: string;
  role: string;
  layer: string;
  path: "/donestate" | "/products/opstruth" | "/products/agentproof";
  repo: string;
  /** One canonical sentence, quoted verbatim in schema, llms.txt and page copy. */
  definition: string;
  tagline: string;
  summary: string;
  capabilities: { title: string; detail: string }[];
  nonCapabilities: string[];
  boundary: string;
  stateBadge: string;
  accent: "info" | "verified" | "exec";
};

export const PRODUCTS: Product[] = [
  {
    key: "donestate",
    name: "DoneState",
    role: "Durable execution and control plane",
    layer: "Execution",
    path: "/donestate",
    repo: REPO_URLS.donestate,
    definition:
      "DoneState is the durable execution and control plane for autonomous coding work: it accepts an outcome plus an authority envelope, enforces admission, budgets, leases and idempotency, records durable state transitions and audit evidence, recovers deterministically from crashes, and cannot verify its own work.",
    tagline: "Give the agent room to work without giving up control.",
    summary:
      "A run begins with a prose outcome and an explicit authority envelope. DoneState decides whether that run is admissible, holds the lease while it executes, records every transition durably, and stops at AWAITING_VERIFICATION until an independent attestation arrives.",
    capabilities: [
      {
        title: "Admission control",
        detail:
          "A run is admitted only if the requested outcome fits inside the declared authority envelope. Out-of-envelope work is refused up front, not negotiated mid-run.",
      },
      {
        title: "Budgets and leases",
        detail:
          "Each run holds a lease with an expiry and a budget ceiling. A lost lease stops execution rather than allowing two workers to act on the same state.",
      },
      {
        title: "Idempotency",
        detail:
          "Operations carry idempotency keys so a retried or replayed step converges on the same result instead of duplicating side effects.",
      },
      {
        title: "Durable state transitions",
        detail:
          "Every transition is written before the effect it describes, so the recorded state is never ahead of reality.",
      },
      {
        title: "Crash recovery",
        detail:
          "After a crash, a run resumes from its last durable state. Recovery is deterministic: the same recorded history produces the same resumption.",
      },
      {
        title: "Audit evidence",
        detail:
          "The run history is the audit trail — inputs, authority, transitions and outcomes — readable after the agent session is gone.",
      },
      {
        title: "Harness-agnostic",
        detail:
          "DoneState governs the run, not the model or the editor. The coding harness is a replaceable component.",
      },
    ],
    nonCapabilities: [
      "Does not verify its own work",
      "Does not close a run on an agent's self-report",
      "Does not act outside the declared authority envelope",
    ],
    boundary:
      "DoneState cannot self-verify. A run halts at AWAITING_VERIFICATION and only closes when an independent verifier attests that the state matches the claim.",
    stateBadge: "AWAITING_VERIFICATION",
    accent: "exec",
  },
  {
    key: "opstruth",
    name: "OpsTruth",
    role: "Independent read-only verifier",
    layer: "Verification",
    path: "/products/opstruth",
    repo: REPO_URLS.opstruth,
    definition:
      "OpsTruth is an independent read-only verifier for AI-assisted engineering: it inspects repository, stack, test, build, CI, secrets, configuration, route, runtime and deployment evidence, separates findings into Verified, Risky and Unproven, and performs no write actions of any kind.",
    tagline: "Verification that holds no power to change what it judges.",
    summary:
      "OpsTruth reads the system from outside the execution path. It gathers evidence, states plainly what that evidence supports, and refuses to upgrade an absence of evidence into a pass.",
    capabilities: [
      {
        title: "Repository and stack inspection",
        detail:
          "Reads the tree at an exact commit: structure, dependencies, framework and build configuration.",
      },
      {
        title: "Tests, build and CI evidence",
        detail:
          "Collects what actually ran and what it produced, rather than what a summary says it produced.",
      },
      {
        title: "Secrets and configuration checks",
        detail:
          "Looks for exposed credentials and configuration that contradicts the deployed shape of the system.",
      },
      {
        title: "Routes and runtime evidence",
        detail: "Checks that declared routes and runtime surfaces respond as the claim implies.",
      },
      {
        title: "Deployment evidence",
        detail: "Compares the deployed artefact against the commit the claim is bound to.",
      },
      {
        title: "Verified / Risky / Unproven",
        detail:
          "Three outcomes, not two. Unproven is a first-class result: the check could not be evidenced, and that is reported rather than hidden.",
      },
    ],
    nonCapabilities: [
      "Does not deploy",
      "Does not mutate databases",
      "Does not publish",
      "Does not restart services",
      "Does not perform any write action",
    ],
    boundary:
      "OpsTruth holds read-only authority by design. A verifier that can change the system cannot independently judge it.",
    stateBadge: "READ_ONLY",
    accent: "verified",
  },
  {
    key: "agentproof",
    name: "AgentProof",
    role: "Authorised transaction and signed-receipt layer",
    layer: "Authorisation",
    path: "/products/agentproof",
    repo: REPO_URLS.agentproof,
    definition:
      "AgentProof is the transaction and signed-receipt layer for consequential agent actions: it binds authority to an exact prepared state, executes exactly once with recovery, and emits an independently verifiable signed receipt, keeping proposer, authority, executor, signer and verifier separate.",
    tagline: "Consequential actions leave evidence that outlives the session.",
    summary:
      "Before a consequential action runs, AgentProof pins the exact prepared state and the authority that permits it. Execution is exactly-once and recoverable. What comes out is a receipt anyone holding the public key can check.",
    capabilities: [
      {
        title: "Exact prepared state",
        detail:
          "Authority is granted against a specific prepared state, not a description of it. If the state drifts, the authority no longer applies.",
      },
      {
        title: "Exactly-once execution",
        detail:
          "A transaction commits once. Retries after a partial failure resolve, they do not repeat the effect.",
      },
      {
        title: "Recovery",
        detail:
          "An interrupted transaction resolves to a known terminal outcome rather than an ambiguous one.",
      },
      {
        title: "Independently verifiable receipts",
        detail:
          "A receipt binds action, prepared state digest, authority and signer. Verification needs the receipt and the public key — not access to the system that produced it.",
      },
      {
        title: "Separation of duties",
        detail:
          "Proposer, authority, executor, signer and verifier are distinct roles. No single component both acts and vouches for the action.",
      },
    ],
    nonCapabilities: [
      "Does not grant itself authority",
      "Does not sign for actions it proposed",
      "Does not execute against drifted state",
    ],
    boundary:
      "Collapsing proposer, authority, executor, signer and verifier into one component collapses the proof. AgentProof keeps them apart.",
    stateBadge: "RECEIPT_SIGNED",
    accent: "info",
  },
];

export const PRODUCT_BY_KEY: Record<ProductKey, Product> = {
  donestate: PRODUCTS[0]!,
  opstruth: PRODUCTS[1]!,
  agentproof: PRODUCTS[2]!,
};

/** Layer comparison used on /products. */
export const LAYER_MATRIX: {
  dimension: string;
  donestate: string;
  opstruth: string;
  agentproof: string;
}[] = [
  {
    dimension: "Primary role",
    donestate: "Execute under declared authority",
    opstruth: "Verify from outside",
    agentproof: "Authorise and sign",
  },
  {
    dimension: "Write authority",
    donestate: "Scoped to the envelope",
    opstruth: "None",
    agentproof: "Exactly-once, per authorised transaction",
  },
  {
    dimension: "Closes a run",
    donestate: "No",
    opstruth: "Yes, by attestation",
    agentproof: "No",
  },
  {
    dimension: "Durable output",
    donestate: "Run state and audit history",
    opstruth: "Classified verification report",
    agentproof: "Signed receipt",
  },
  {
    dimension: "Reads at",
    donestate: "Live run state",
    opstruth: "Exact commit and deployed artefact",
    agentproof: "Exact prepared state",
  },
];

/** Specimen data — illustrative shapes of the artefacts each layer produces. */
export const RUN_TIMELINE: RunState[] = [
  { state: "ADMITTED", detail: "Outcome accepted inside authority envelope", tone: "info" },
  { state: "EXECUTING", detail: "Lease held, budget consuming", tone: "exec" },
  { state: "VALIDATING", detail: "Local checks and build evidence gathered", tone: "exec" },
  {
    state: "AWAITING_VERIFICATION",
    detail: "Halted — independent attestation required",
    tone: "risk",
  },
  { state: "VERIFIED", detail: "Attestation received, state closed", tone: "verified" },
];

export const VERIFICATION_ROWS: {
  check: string;
  surface: string;
  state: "verified" | "risky" | "unproven";
  note: string;
}[] = [
  {
    check: "Build reproduces at commit",
    surface: "build",
    state: "verified",
    note: "Artefact matches source tree",
  },
  {
    check: "Test suite executed",
    surface: "tests",
    state: "verified",
    note: "Exit status recorded in CI evidence",
  },
  {
    check: "No credentials in tracked files",
    surface: "secrets",
    state: "verified",
    note: "Scan clean at this commit",
  },
  {
    check: "Declared routes respond",
    surface: "runtime",
    state: "risky",
    note: "One route returns an error status",
  },
  {
    check: "Deployed artefact matches commit",
    surface: "deployment",
    state: "unproven",
    note: "No deployment evidence available",
  },
];

export const RECEIPT_SPECIMEN = {
  action: "merge_pull_request",
  preparedState: "sha256:9f2c41ab6e0d7c5183ba0e77c4d21f9a",
  authority: "envelope/repo-write@exp-2026-08-29T09:00Z",
  proposer: "agent:coding-harness",
  executor: "agentproof:executor-01",
  signer: "key:ed25519:AP-3f8c",
  verifier: "opstruth:report-2f19",
  digest: "ap1:7c4e9d2b83a15f60c8e7d419ab35f2c0",
  outcome: "committed_once",
} as const;

export const AUTHORITY_ENVELOPE_SPECIMEN = {
  scope: ["repo:write (branch: feature/*)", "ci:read", "artifact:read"],
  denied: ["deploy:*", "db:write", "secrets:read", "service:restart"],
  budget: "40 tool calls / 15 min wall clock",
  expiry: "Envelope expires with the lease. No implicit renewal.",
} as const;
