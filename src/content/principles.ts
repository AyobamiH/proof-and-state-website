export type PrincipleSection = { heading: string; paragraphs: string[] };

export type Principle = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  /** Short definition used on /trust and in structured data. */
  statement: string;
  sections: PrincipleSection[];
  implementedBy: { name: string; path: string; how: string }[];
};

export const PRINCIPLES: Principle[] = [
  {
    slug: "independent-verification",
    title: "Independent verification",
    kicker: "Principle 01",
    summary:
      "A claim of completion is evidence about the claimant, not about the system. Verification only means something when the verifier is structurally incapable of having caused the outcome it judges.",
    statement:
      "Work is not done because the component that did it says so. It is done when a party outside the execution path attests that the observable state matches the claim.",
    sections: [
      {
        heading: "Self-verification is not proof",
        paragraphs: [
          "An agent that writes code, runs its own checks and then reports success has produced one artefact: a report. The report and the work share an author, a context window and a set of assumptions. Every failure mode that caused the work to be wrong is available to make the report wrong in the same direction.",
          "This is not a statement about model quality. A perfectly reliable component still cannot supply independent evidence about itself, because independence is a property of position, not of competence.",
        ],
      },
      {
        heading: "Independence is structural",
        paragraphs: [
          "Independence means the verifier does not share the execution path, does not inherit the executor's assumptions, and cannot alter the thing it is judging. In Proof & State, OpsTruth holds no write authority at all. It cannot deploy, restart, publish or mutate a database. Its inability to act is what makes its report worth reading.",
          "DoneState is built to depend on that separation. A run halts at AWAITING_VERIFICATION rather than closing itself, so the boundary is enforced by the state machine rather than by convention.",
        ],
      },
      {
        heading: "Three outcomes, not two",
        paragraphs: [
          "A verifier that must answer pass or fail will eventually call an absence of evidence a pass. OpsTruth separates Verified, Risky and Unproven so that missing evidence stays visible as missing evidence.",
          "Unproven is the honest result for a check that could not be evidenced. Treating it as a failure creates noise; treating it as a pass creates false confidence. Naming it keeps the report accurate about its own limits.",
        ],
      },
    ],
    implementedBy: [
      {
        name: "OpsTruth",
        path: "/products/opstruth",
        how: "Read-only verification with a three-way classification.",
      },
      {
        name: "DoneState",
        path: "/donestate",
        how: "Runs halt at AWAITING_VERIFICATION rather than self-closing.",
      },
    ],
  },
  {
    slug: "least-authority",
    title: "Least authority",
    kicker: "Principle 02",
    summary:
      "Every component receives the narrowest authority that lets it do its job, declared before it starts and enforced at admission rather than argued about at runtime.",
    statement:
      "Authority is granted narrowly, explicitly and in advance. Anything outside the declared envelope is refused, not negotiated.",
    sections: [
      {
        heading: "The envelope comes first",
        paragraphs: [
          "Before a run starts, its authority is written down: what it may touch, what it may spend, how long it may hold the lease, and what is explicitly denied. DoneState admits a run only if the requested outcome fits inside that envelope.",
          "Declaring authority in advance changes where the argument happens. Instead of a running agent asking for more access at the moment it is most inconvenient to refuse, the scope is settled while nobody is under pressure.",
        ],
      },
      {
        heading: "Blast radius is a design input",
        paragraphs: [
          "Budget ceilings, lease expiry and scope limits are not throttles bolted on afterwards. They define the worst outcome a run can produce, which is the number that actually matters when deciding how much autonomy to grant.",
          "An envelope that expires with the lease avoids the most common failure: authority that outlives the reason it was granted.",
        ],
      },
      {
        heading: "Authority the verifier does not have",
        paragraphs: [
          "Least authority applies hardest to the components people are most tempted to trust. OpsTruth has no write capability, so a compromised or simply wrong verifier cannot cause the damage it would otherwise be positioned to cause.",
          "AgentProof extends the same logic to consequential actions: proposer, authority, executor, signer and verifier are separate roles, so no single component can both act and vouch for the action.",
        ],
      },
    ],
    implementedBy: [
      {
        name: "DoneState",
        path: "/donestate",
        how: "Admission control against a declared authority envelope.",
      },
      {
        name: "AgentProof",
        path: "/products/agentproof",
        how: "Separation of proposer, authority, executor, signer and verifier.",
      },
      { name: "OpsTruth", path: "/products/opstruth", how: "No write authority of any kind." },
    ],
  },
  {
    slug: "evidence-over-claims",
    title: "Evidence over claims",
    kicker: "Principle 03",
    summary:
      "Prose summaries decay, get rewritten and cannot be re-checked. Evidence is bound to an exact commit or prepared state and can be inspected long after the session that produced it has ended.",
    statement:
      "Every consequential outcome is bound to an artefact that can be re-examined independently: a commit, a prepared-state digest, a durable transition or a signed receipt.",
    sections: [
      {
        heading: "Bind evidence to exact state",
        paragraphs: [
          "A summary that says the tests passed is unfalsifiable after the fact. A record that says which commit was built, what the run produced and what the verifier observed can be checked again tomorrow, by someone who was not there.",
          "AgentProof binds authority to an exact prepared state digest. If the state drifts between approval and execution, the authority no longer applies — because the thing that was approved no longer exists.",
        ],
      },
      {
        heading: "Durability outlives the session",
        paragraphs: [
          "Agent sessions are ephemeral. Context windows are discarded, terminals close, logs rotate. Any accountability model that lives inside the session disappears with it.",
          "DoneState writes transitions durably before the effects they describe, so recorded state is never ahead of reality and a crashed run resumes to a known point instead of a guessed one.",
        ],
      },
      {
        heading: "Verifiable without privileged access",
        paragraphs: [
          "A receipt that can only be checked by the system that issued it is a log entry. AgentProof receipts bind action, prepared state, authority and signer so that verification needs the receipt and a public key — not credentials for the system under scrutiny.",
          "This is the difference between an audit trail you are asked to believe and an audit trail you can check.",
        ],
      },
    ],
    implementedBy: [
      {
        name: "AgentProof",
        path: "/products/agentproof",
        how: "Signed receipts bound to exact prepared state.",
      },
      {
        name: "DoneState",
        path: "/donestate",
        how: "Durable transitions and audit history per run.",
      },
      {
        name: "OpsTruth",
        path: "/products/opstruth",
        how: "Reports bound to an exact commit and observed artefacts.",
      },
    ],
  },
];

export const PRINCIPLE_BY_SLUG = new Map(PRINCIPLES.map((p) => [p.slug, p]));

/** Shorter architectural commitments listed on /trust. */
export const TRUST_COMMITMENTS = [
  {
    title: "Least authority",
    body: "Every component gets the narrowest authority that lets it do its job. The verifier cannot deploy. The signer cannot propose work.",
  },
  {
    title: "Explicit consequence envelopes",
    body: "Scope, budget, blast radius and expiry are declared before admission. Out-of-envelope work is refused, not renegotiated at runtime.",
  },
  {
    title: "Exact-commit evidence",
    body: "Evidence binds to a specific commit or prepared state, never to a summary written afterwards by the component that did the work.",
  },
  {
    title: "Separation of duties",
    body: "Proposer, authority, executor, signer and verifier stay distinct roles. Collapsing them collapses the proof.",
  },
  {
    title: "Deterministic recovery",
    body: "Leases, idempotency keys and durable transitions mean an interrupted run resumes to a known state instead of repeating side effects.",
  },
  {
    title: "No self-verification",
    body: "A run does not close because the agent reported success. It closes when an independent attestation says state matches claim.",
  },
] as const;
