export type GlossaryTerm = {
  term: string;
  definition: string;
  related?: { label: string; to: string }[];
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "AgentProof",
    definition:
      "The transaction and signed-receipt layer of Proof & State. It binds authority to an exact prepared state, executes consequential actions exactly once with recovery, and emits an independently verifiable signed receipt.",
    related: [{ label: "AgentProof", to: "/products/agentproof" }],
  },
  {
    term: "Admission control",
    definition:
      "The check DoneState performs before a run starts: the requested outcome must fit inside the declared authority envelope, otherwise the run is refused.",
    related: [{ label: "Authority model", to: "/architecture/authority-model" }],
  },
  {
    term: "Attestation",
    definition:
      "A statement from an independent party that observed state matches a claim. In Proof & State, an attestation from OpsTruth is what allows a DoneState run to close.",
    related: [{ label: "Independent verification", to: "/principles/independent-verification" }],
  },
  {
    term: "Authority envelope",
    definition:
      "The declared limits of a run: permitted scope, explicit denials, budget ceiling and expiry. Authority outside the envelope does not exist for that run.",
    related: [{ label: "Authority model", to: "/architecture/authority-model" }],
  },
  {
    term: "Consequential action",
    definition:
      "An action whose effects persist outside the agent session — merging, deploying, publishing, mutating data. These are the actions AgentProof wraps in an authorised transaction.",
    related: [{ label: "AgentProof", to: "/products/agentproof" }],
  },
  {
    term: "DoneState",
    definition:
      "The durable execution and control plane of Proof & State. It admits runs against an authority envelope, enforces budgets, leases and idempotency, records durable state transitions and audit evidence, and cannot verify its own work.",
    related: [{ label: "DoneState", to: "/donestate" }],
  },
  {
    term: "Exactly-once execution",
    definition:
      "A guarantee that an authorised transaction commits its effect one time. Retries after partial failure resolve the transaction rather than repeating the effect.",
  },
  {
    term: "Idempotency key",
    definition:
      "An identifier attached to an operation so that a repeated or replayed request converges on the same result instead of producing a second side effect.",
  },
  {
    term: "Independence boundary",
    definition:
      "The architectural line between execution and verification. Components on the execution side may act; components on the verification side may only observe. Nothing crosses it in both directions.",
    related: [{ label: "System topology", to: "/architecture" }],
  },
  {
    term: "Lease",
    definition:
      "A time-bounded hold on a run. While the lease is valid the holder may execute; when it expires or is lost, execution stops rather than continuing in parallel with another worker.",
    related: [{ label: "State model", to: "/architecture/state-model" }],
  },
  {
    term: "OpsTruth",
    definition:
      "The independent read-only verifier of Proof & State. It inspects repository, stack, test, build, CI, secrets, configuration, route, runtime and deployment evidence, and classifies findings as Verified, Risky or Unproven.",
    related: [{ label: "OpsTruth", to: "/products/opstruth" }],
  },
  {
    term: "Prepared state",
    definition:
      "The exact state an action was approved against, captured as a digest. If the real state drifts from the prepared state, the authority no longer applies.",
    related: [{ label: "Evidence over claims", to: "/principles/evidence-over-claims" }],
  },
  {
    term: "Proof & State",
    definition:
      "The umbrella accountability system comprising DoneState, OpsTruth and AgentProof: execution under declared authority, independent read-only verification, and signed receipts for consequential actions.",
  },
  {
    term: "Risky",
    definition:
      "An OpsTruth classification: evidence exists and it indicates a problem or a contradiction between the claim and the observed system.",
  },
  {
    term: "Separation of duties",
    definition:
      "Keeping proposer, authority, executor, signer and verifier as distinct roles so that no single component can both perform an action and vouch for it.",
    related: [{ label: "Least authority", to: "/principles/least-authority" }],
  },
  {
    term: "Signed receipt",
    definition:
      "A record binding an action, its prepared-state digest, the authority that permitted it and the signing key, verifiable by anyone holding the public key.",
    related: [{ label: "AgentProof", to: "/products/agentproof" }],
  },
  {
    term: "Unproven",
    definition:
      "An OpsTruth classification: the check could not be evidenced. It is reported as its own outcome rather than being rounded up to a pass or down to a failure.",
  },
  {
    term: "Verified",
    definition:
      "An OpsTruth classification: evidence exists and it supports the claim, bound to the exact commit or artefact inspected.",
  },
];
