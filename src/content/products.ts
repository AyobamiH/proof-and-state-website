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
    role: "Reviewable repository maintenance",
    layer: "Repository maintenance",
    path: "/donestate",
    repo: REPO_URLS.donestate,
    definition:
      "DoneState helps maintain selected GitHub repositories by turning bounded maintenance goals into reviewable branches and pull requests, while repository owners keep final merge authority.",
    tagline: "Automated maintenance that stays reviewable.",
    summary:
      "DoneState is for teams that want AI-assisted maintenance without making repository review optional. It prepares work, runs checks and hands changes back through normal GitHub review.",
    capabilities: [
      {
        title: "Scoped repository work",
        detail: "Maintenance is limited to the repository access and goal chosen for the job.",
      },
      {
        title: "Pull-request workflow",
        detail: "Remote changes are prepared on a branch and surfaced for normal review.",
      },
      {
        title: "Checks before handoff",
        detail: "Project checks can run before proposed changes are handed back to a reviewer.",
      },
      {
        title: "Recoverable work",
        detail:
          "Interrupted maintenance work is designed to resume from recorded progress instead of starting blindly again.",
      },
      {
        title: "Traceable changes",
        detail:
          "Branches, commits and pull requests provide a durable record of what was proposed.",
      },
      {
        title: "Existing GitHub review",
        detail:
          "DoneState fits around repository review instead of replacing the owner's final decision.",
      },
    ],
    nonCapabilities: [
      "Does not merge its own pull requests",
      "Does not expand repository access by itself",
      "Does not turn an attempted change into proof that the outcome is correct",
    ],
    boundary:
      "DoneState prepares reviewable changes. Repository owners keep final merge authority.",
    stateBadge: "Live",
    accent: "exec",
  },
  {
    key: "opstruth",
    name: "OpsTruth",
    role: "Independent software evidence checks",
    layer: "Evidence checks",
    path: "/products/opstruth",
    repo: REPO_URLS.opstruth,
    definition:
      "OpsTruth inspects repository and software-delivery evidence without changing the system it checks. It is publicly available as the opstruth-evidence GitHub Marketplace Action and through its current public interfaces.",
    tagline: "Check what changed without changing it again.",
    summary:
      "OpsTruth gathers evidence from source, checks and delivery surfaces so teams can see what is supported, what needs attention and what still has not been confirmed.",
    capabilities: [
      {
        title: "Repository inspection",
        detail: "Checks source and repository evidence at the version being reviewed.",
      },
      {
        title: "Build and test evidence",
        detail:
          "Surfaces evidence from project checks instead of relying on a prose success summary.",
      },
      {
        title: "CI evidence",
        detail:
          "Reads available continuous-integration results and configuration relevant to a claim.",
      },
      {
        title: "Runtime and deployment evidence",
        detail:
          "Can compare public runtime or deployment evidence with the software claim being reviewed.",
      },
      {
        title: "Inspection-only operation",
        detail:
          "The checker is designed to observe and report rather than repair, deploy or publish.",
      },
      {
        title: "GitHub Marketplace Action",
        detail:
          "The opstruth-evidence Action is publicly listed with v1.0.0 and stable v1 references.",
      },
    ],
    nonCapabilities: [
      "Does not deploy what it checks",
      "Does not merge or publish changes",
      "Does not restart services or rewrite the system under review",
    ],
    boundary: "OpsTruth inspects and reports. It does not repair or deploy what it checks.",
    stateBadge: "Available",
    accent: "verified",
  },
  {
    key: "agentproof",
    name: "AgentProof",
    role: "Planned signed evidence for consequential actions",
    layer: "In development",
    path: "/products/agentproof",
    repo: REPO_URLS.agentproof,
    definition:
      "AgentProof is a Proof & State component in development for creating independently checkable evidence around consequential AI-assisted actions. Its contract is defined, but downstream release work remains.",
    tagline: "A future record for high-consequence actions.",
    summary:
      "AgentProof is not presented as a released product. The current design work focuses on recording what important action was approved, what happened and what evidence should remain afterwards.",
    capabilities: [
      {
        title: "Design goal: action records",
        detail:
          "Create a durable record for important AI-assisted actions rather than relying on session history alone.",
      },
      {
        title: "Design goal: approval context",
        detail:
          "Connect the eventual record to the action that was actually reviewed before it happened.",
      },
      {
        title: "Design goal: independent checking",
        detail:
          "Make the resulting evidence checkable later without trusting the original session summary.",
      },
      {
        title: "Design goal: recovery clarity",
        detail:
          "Reduce ambiguity around whether an interrupted consequential action actually completed.",
      },
    ],
    nonCapabilities: [
      "Not presented as generally available",
      "No current production guarantee is claimed on this site",
      "Planned behaviour is not described as already shipped",
    ],
    boundary: "Current status: the contract is defined and downstream release work remains.",
    stateBadge: "In development",
    accent: "info",
  },
];

export const PRODUCT_BY_KEY: Record<ProductKey, Product> = {
  donestate: PRODUCTS[0]!,
  opstruth: PRODUCTS[1]!,
  agentproof: PRODUCTS[2]!,
};

export const LAYER_MATRIX: {
  dimension: string;
  donestate: string;
  opstruth: string;
  agentproof: string;
}[] = [
  {
    dimension: "Current availability",
    donestate: "Live service; external listings still in review",
    opstruth: "Public GitHub Marketplace Action",
    agentproof: "In development",
  },
  {
    dimension: "Use it for",
    donestate: "Preparing reviewable repository maintenance",
    opstruth: "Checking software evidence independently",
    agentproof: "Future evidence for consequential actions",
  },
  {
    dimension: "Change authority",
    donestate: "Prepares branches and pull requests; owner merges",
    opstruth: "Inspection only",
    agentproof: "Not yet a released runtime",
  },
  {
    dimension: "Public output",
    donestate: "Reviewable repository changes",
    opstruth: "Evidence report",
    agentproof: "Planned signed evidence",
  },
];

export const RUN_TIMELINE: RunState[] = [
  {
    state: "Goal received",
    detail: "A maintenance goal is accepted for a selected repository",
    tone: "info",
  },
  { state: "Work prepared", detail: "Changes are prepared on a reviewable branch", tone: "exec" },
  { state: "Checks run", detail: "Relevant project checks are run before handoff", tone: "exec" },
  {
    state: "Pull request opened",
    detail: "The proposed change is handed back for review",
    tone: "verified",
  },
  {
    state: "Owner review",
    detail: "The repository owner decides whether to merge",
    tone: "unproven",
  },
];

export const VERIFICATION_ROWS: {
  check: string;
  surface: string;
  state: "passed" | "attention" | "not-confirmed";
  note: string;
}[] = [
  {
    check: "Source can be inspected",
    surface: "Repository",
    state: "passed",
    note: "Repository evidence is available for review",
  },
  {
    check: "Project checks are recorded",
    surface: "Checks",
    state: "passed",
    note: "Available check results can be inspected",
  },
  {
    check: "Runtime behaviour matches the claim",
    surface: "Runtime",
    state: "attention",
    note: "A runtime result may need investigation",
  },
  {
    check: "Deployment evidence is linked",
    surface: "Deployment",
    state: "not-confirmed",
    note: "No deployment evidence was supplied in this example",
  },
];

export const RECEIPT_SPECIMEN = {
  status: "In development",
  purpose: "Record a consequential AI-assisted action",
  includes: "What was reviewed, what action occurred and the resulting evidence",
  verification: "Designed to be independently checkable later",
  availability: "Contract defined; downstream release work remains",
} as const;

export const AUTHORITY_ENVELOPE_SPECIMEN = {
  allowed: ["Selected repository work", "Reviewable branches", "Project checks"],
  ownerOnly: ["Final merge decision", "Unrequested repository access", "Silent publication"],
  limits: "Set by the operator for the job",
  control: "The owner keeps final review and release decisions",
} as const;
