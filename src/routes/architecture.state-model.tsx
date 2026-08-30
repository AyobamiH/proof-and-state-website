import { createFileRoute } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, KeyValueRows, Prose, Section, SectionHeading } from "@/components/ps/primitives";
import { StateTimeline, Terminal } from "@/components/ps/specimens";
import { RUN_TIMELINE } from "@/content/products";
import { GITHUB_URL } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const PATH = "/architecture/state-model";
const TITLE = "Run state model — durable transitions and deterministic recovery";
const DESCRIPTION =
  "How a DoneState run moves from ADMITTED through EXECUTING, VALIDATING and AWAITING_VERIFICATION to VERIFIED, and why leases, idempotency keys and durable transitions make recovery deterministic.";

const MECHANISMS = [
  {
    key: "Lease",
    value:
      "A time-bounded claim on a run. Only the lease holder may transition it, so two workers cannot execute the same run concurrently.",
  },
  {
    key: "Idempotency key",
    value:
      "A stable key derived from the intended effect. Replaying an interrupted step resolves to the original outcome rather than repeating a side effect.",
  },
  {
    key: "Durable transition",
    value:
      "The new state is recorded before the work that depends on it begins, so a crash leaves a known state rather than an ambiguous one.",
  },
  {
    key: "Budget",
    value:
      "A declared ceiling on work. Exhaustion is a state transition with an audit record, not a silent stop.",
  },
  {
    key: "Audit history",
    value: "The ordered record of every transition, retained after the executing process is gone.",
  },
];

export const Route = createFileRoute("/architecture/state-model")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: PATH, type: "article" }),
    scripts: [
      breadcrumbLd([
        { name: "Architecture", path: "/architecture" },
        { name: "State model", path: PATH },
      ]),
    ],
  }),
  component: StateModelPage,
});

function StateModelPage() {
  return (
    <>
      <PageHeader
        eyebrow="Architecture"
        title="Run state model"
        lead="A run is a durable object with a small set of legal transitions. The interesting property is not which states exist — it is which transition no component inside the run is permitted to make."
        crumbs={[
          { label: "Architecture", to: "/architecture" },
          { label: "State model", to: PATH },
        ]}
        rail={RUN_TIMELINE.map((state) => ({ label: state.state, tone: state.tone }))}
      />

      <Section id="states">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <SectionHeading id="states" eyebrow="States" title="Five states, one closed door." />
            <Prose className="mt-8">
              <p>
                A run enters at <strong>ADMITTED</strong> only if the requested outcome fits the
                declared authority envelope. Admission is where an out-of-scope request is refused,
                before any work has been done and before refusing is expensive.
              </p>
              <p>
                <strong>EXECUTING</strong> holds a lease and consumes budget. The agent harness does
                the work here; DoneState records what happened rather than deciding what is true
                about it.
              </p>
              <p>
                <strong>VALIDATING</strong> gathers local evidence — checks, build output, whatever
                the run can observe about itself. This is evidence, not attestation, and the
                distinction is load bearing.
              </p>
              <p>
                <strong>AWAITING_VERIFICATION</strong> is a terminal state as far as the execution
                path is concerned. The run stops and waits. There is no internal transition to
                completion.
              </p>
              <p>
                <strong>VERIFIED</strong> is reachable only through an independent attestation. The
                component that produced the work cannot produce the signal that closes it.
              </p>
            </Prose>
            <Callout tone="risk" title="Why the halt matters" className="mt-8">
              A system that auto-completes on internal validation has moved the trust boundary
              inside the thing being trusted. The halt is what keeps that boundary outside.
            </Callout>
          </div>
          <div className="space-y-6">
            <StateTimeline />
            <Terminal
              label="recovery after interruption"
              lines={[
                { kind: "cmd", text: "donestate resume run/7c41" },
                { kind: "out", text: "lease expired · reclaiming" },
                { kind: "out", text: "last durable state: VALIDATING" },
                { kind: "out", text: "idempotency key matched · side effect not repeated" },
                { kind: "out", text: "AWAITING_VERIFICATION" },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section id="mechanisms">
        <SectionHeading
          id="mechanisms"
          eyebrow="Mechanisms"
          title="What makes recovery deterministic"
          lead="Crash safety is not a retry loop. It is the property that an interrupted run has exactly one correct continuation."
        />
        <div className="mt-10 max-w-3xl">
          <KeyValueRows rows={MECHANISMS} />
        </div>
      </Section>

      <RelatedLinks
        links={[
          {
            label: "Authority model",
            to: "/architecture/authority-model",
            note: "What a run may do at all.",
          },
          { label: "DoneState", to: "/donestate", note: "The layer that implements this model." },
          { label: "System topology", to: "/architecture", note: "Where the boundary sits." },
          { label: "Glossary", to: "/glossary", note: "Lease, idempotency, attestation." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="The state machine is in the source. Read it rather than taking this page's word for it."
        primary={{ label: "Open source", to: "/open-source" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
