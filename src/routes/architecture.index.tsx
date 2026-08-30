import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, DefinitionBlock, Section, SectionHeading } from "@/components/ps/primitives";
import { ReceiptSpecimen, StateTimeline, VerificationMatrix } from "@/components/ps/specimens";
import { SystemDiagram } from "@/components/ps/system-diagram";
import { GITHUB_URL, SYSTEM_DEFINITION } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Architecture — execution, authorisation and independent verification";
const DESCRIPTION =
  "The Proof & State system topology: a human objective and authority envelope enter DoneState, consequential effects emit AgentProof receipts, and OpsTruth verifies read-only across an explicit independence boundary.";

const FLOW = [
  {
    step: "01",
    title: "Objective and authority enter together",
    body: "A human states an outcome and, in the same act, declares the authority envelope it may be pursued under: permitted scope, explicit denials, budget ceiling and expiry. Admission is a check against that envelope, not a formality.",
  },
  {
    step: "02",
    title: "DoneState executes durably",
    body: "The run becomes a durable object. Leases prevent concurrent execution, idempotency keys prevent repeated side effects, and every state transition is recorded before the next begins.",
  },
  {
    step: "03",
    title: "Consequential effects go through AgentProof",
    body: "Anything with real-world consequence is prepared, authorised against exact state, executed exactly once and signed. The receipt is the durable artefact, not the log line describing it.",
  },
  {
    step: "04",
    title: "OpsTruth observes from outside",
    body: "The verifier reads repository, stack, test, build, CI, secret, config, route, runtime and deployment evidence at an exact commit. It holds no write authority over any of it.",
  },
  {
    step: "05",
    title: "Verification closes the state",
    body: "An attestation from the verifier is what moves a run from AWAITING_VERIFICATION to VERIFIED. Nothing inside the execution path can perform that transition.",
  },
];

export const Route = createFileRoute("/architecture/")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/architecture" }),
    scripts: [breadcrumbLd([{ name: "Architecture", path: "/architecture" }])],
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Architecture"
        title="Self-verification is not proof."
        lead="Proof & State is organised around one boundary: the side of the system that can act, and the side that can only observe. Everything else follows from keeping those two apart."
        crumbs={[{ label: "Architecture", to: "/architecture" }]}
        rail={[
          { label: "Objective", tone: "unproven" },
          { label: "Authority", tone: "info" },
          { label: "Execution", tone: "exec" },
          { label: "Verification", tone: "verified" },
        ]}
      />

      <Section id="topology">
        <SectionHeading
          id="topology"
          eyebrow="Topology"
          title="The independence boundary"
          lead="Execution and verification exchange evidence, never authority. No component on the left can influence a verdict on the right."
        />
        <div className="mt-12">
          <SystemDiagram />
        </div>
      </Section>

      <Section id="flow">
        <SectionHeading
          id="flow"
          eyebrow="Flow"
          title="How one run moves through the system"
          lead="Five steps, each producing an artefact that survives the session that created it."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-5">
          {FLOW.map((item) => (
            <li key={item.step} className="bg-card p-6">
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground">
                {item.step}
              </p>
              <p className="mt-4 font-display text-[1.0625rem] font-medium leading-snug text-foreground">
                {item.title}
              </p>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
        <Callout tone="denied" title="Self-verification is not proof" className="mt-10 max-w-3xl">
          If the component that performed the work can also declare the work complete, the
          completion signal carries no information beyond the component&rsquo;s own confidence.
          Independence is a property of position, not of competence.
        </Callout>
      </Section>

      <Section id="artefacts">
        <SectionHeading
          id="artefacts"
          eyebrow="Artefacts"
          title="What the architecture leaves behind"
          lead="Three durable artefacts per run: a state history, a signed receipt for each consequential action, and a classified verification report."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <StateTimeline />
          <ReceiptSpecimen />
          <VerificationMatrix />
        </div>
        <p className="mt-4 text-[0.8125rem] text-muted-foreground">
          Specimens are illustrative shapes, not records of real runs.
        </p>
      </Section>

      <Section id="deeper">
        <SectionHeading
          id="deeper"
          eyebrow="Go deeper"
          title="Two models worth reading in full"
          lead="The state model governs what a run may do next. The authority model governs what it may do at all."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2">
          <Link
            to="/architecture/state-model"
            className="bg-card p-6 transition-colors hover:bg-secondary"
          >
            <p className="font-display text-xl font-medium text-foreground">Run state model</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
              Transitions, leases, idempotency and deterministic recovery.
            </p>
          </Link>
          <Link
            to="/architecture/authority-model"
            className="bg-card p-6 transition-colors hover:bg-secondary"
          >
            <p className="font-display text-xl font-medium text-foreground">Authority model</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
              Envelopes, denials, budgets, expiry and separation of duties.
            </p>
          </Link>
        </div>
      </Section>

      <Section id="definition">
        <DefinitionBlock term="Proof & State" definition={SYSTEM_DEFINITION} />
      </Section>

      <RelatedLinks
        links={[
          { label: "Products", to: "/products", note: "The three layers in detail." },
          { label: "Trust", to: "/trust", note: "Commitments enforced by this structure." },
          { label: "Principles", to: "/principles", note: "The positions behind the design." },
          { label: "Glossary", to: "/glossary", note: "Definitions for every term used here." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="The architecture is only as credible as the source behind it. Read both."
        primary={{ label: "Open source", to: "/open-source" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
