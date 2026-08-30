import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

import { StateChip } from "./primitives";

type Node = {
  id: string;
  title: string;
  role: string;
  detail: string;
  to?: "/donestate" | "/products/opstruth" | "/products/agentproof";
  tone: "info" | "exec" | "verified" | "unproven";
};

const EXECUTION_SIDE: Node[] = [
  {
    id: "objective",
    title: "Human objective + authority",
    role: "Input",
    detail: "A prose outcome and an explicit authority envelope enter the system together.",
    tone: "unproven",
  },
  {
    id: "donestate",
    title: "DoneState",
    role: "Execution / control plane",
    detail:
      "Admits the run, holds the lease, records durable transitions, halts at AWAITING_VERIFICATION.",
    to: "/donestate",
    tone: "exec",
  },
  {
    id: "agentproof",
    title: "AgentProof",
    role: "Authorised transactions",
    detail: "Consequential effects are bound to prepared state and emit a signed receipt.",
    to: "/products/agentproof",
    tone: "info",
  },
];

const VERIFICATION_SIDE: Node[] = [
  {
    id: "evidence",
    title: "Observable evidence",
    role: "Surface",
    detail:
      "Repository at an exact commit, CI output, configuration, routes, runtime and deployment artefacts.",
    tone: "unproven",
  },
  {
    id: "opstruth",
    title: "OpsTruth",
    role: "Independent verifier",
    detail: "Reads only. Classifies each check as Verified, Risky or Unproven.",
    to: "/products/opstruth",
    tone: "verified",
  },
  {
    id: "attestation",
    title: "Attestation closes state",
    role: "Output",
    detail: "The run closes when an independent attestation says observed state matches the claim.",
    tone: "verified",
  },
];

function DiagramNode({ node }: { node: Node }) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          {node.role}
        </span>
        <StateChip tone={node.tone} dot={false}>
          {node.id}
        </StateChip>
      </div>
      <p className="mt-3 font-display text-base font-medium text-foreground">{node.title}</p>
      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">{node.detail}</p>
    </>
  );

  const className =
    "block rounded-[10px] border border-hairline bg-card p-4 transition-colors hover:border-hairline-strong";

  return node.to ? (
    <Link to={node.to} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

function Column({ nodes, heading, note }: { nodes: Node[]; heading: string; note: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
          {heading}
        </h3>
        <p className="font-mono text-[0.625rem] text-muted-foreground/80">{note}</p>
      </div>
      <ol className="mt-4 space-y-3">
        {nodes.map((node, index) => (
          <li key={node.id}>
            {index > 0 ? (
              <span aria-hidden="true" className="mx-auto mb-3 block h-4 w-px bg-hairline-strong" />
            ) : null}
            <DiagramNode node={node} />
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Whole-system topology with an explicit independence boundary between
 * execution and verification.
 */
export function SystemDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("panel overflow-hidden", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-secondary/60 px-4 py-2.5 sm:px-6">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
          Proof &amp; State — system topology
        </span>
        <span className="font-mono text-[0.6875rem] text-muted-foreground">
          execution ⟂ verification
        </span>
      </div>

      <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
        <Column nodes={EXECUTION_SIDE} heading="Execution side" note="may act" />

        <div aria-hidden="true" className="relative flex items-center justify-center lg:w-16">
          <div className="h-px w-full bg-[repeating-linear-gradient(to_right,var(--hairline-strong)_0_6px,transparent_6px_12px)] lg:h-full lg:w-px lg:bg-[repeating-linear-gradient(to_bottom,var(--hairline-strong)_0_6px,transparent_6px_12px)]" />
          <span className="absolute bg-card px-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground lg:rotate-90 lg:whitespace-nowrap lg:px-3">
            Independence boundary
          </span>
        </div>

        <Column nodes={VERIFICATION_SIDE} heading="Verification side" note="observes only" />
      </div>

      <p className="border-t border-hairline px-5 py-4 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-foreground sm:px-8">
        Self-verification is not proof
      </p>
    </div>
  );
}
