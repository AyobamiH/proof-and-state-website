import { createFileRoute } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, KeyValueRows, Prose, Section, SectionHeading } from "@/components/ps/primitives";
import { ComparisonMatrix } from "@/components/ps/specimens";
import {
  DONESTATE_REVIEW_STATUS,
  GITHUB_URL,
  HARNESS_DISCLAIMER,
  HARNESS_TARGETS,
  SERVICE_URLS,
} from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const PATH = "/developers/integrations";
const TITLE = "Integrations — harness-agnostic by design";
const DESCRIPTION =
  "Proof & State is built for coding agents without being tied to one. How DoneState, OpsTruth and AgentProof sit alongside an existing harness, CI pipeline and review workflow.";

const SURFACES = [
  {
    dimension: "Coding harness",
    values: [
      "Runs the work inside a DoneState run",
      "Not inspected as a trusted narrator",
      "May propose, never authorise",
    ],
  },
  {
    dimension: "Version control",
    values: [
      "Scoped branch write under the envelope",
      "Read at an exact commit",
      "PR-first for remote mutation",
    ],
  },
  {
    dimension: "CI pipeline",
    values: [
      "Emits evidence into the run record",
      "Read as verification evidence",
      "Receipts reference the CI evidence",
    ],
  },
  {
    dimension: "Runtime and deployment",
    values: [
      "Denied by default in the envelope",
      "Observed read-only",
      "Signed if explicitly authorised",
    ],
  },
];

export const Route = createFileRoute("/developers/integrations")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: PATH }),
    scripts: [
      breadcrumbLd([
        { name: "Developers", path: "/developers" },
        { name: "Integrations", path: PATH },
      ]),
    ],
  }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Developers"
        title="Built for coding agents. Not tied to one."
        lead="Accountability belongs to the run, not to the harness that happens to be executing it. Swapping agents should not change what counts as evidence."
        crumbs={[
          { label: "Developers", to: "/developers" },
          { label: "Integrations", to: PATH },
        ]}
        rail={[
          { label: "Harness", tone: "unproven" },
          { label: "Run", tone: "exec" },
          { label: "Evidence", tone: "verified" },
        ]}
      />

      <Section id="targets">
        <SectionHeading
          id="targets"
          eyebrow="Ecosystem targets"
          title="Compatible workflows"
          lead="These are the environments the tooling is designed to sit alongside."
        />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {HARNESS_TARGETS.map((harness) => (
            <li key={harness.name} className="bg-card p-5">
              <p className="font-display text-[1.0625rem] font-medium text-foreground">
                {harness.name}
              </p>
              <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                {harness.note}
              </p>
            </li>
          ))}
        </ul>
        <Callout tone="risk" title="No partnership is claimed" className="mt-8 max-w-3xl">
          {HARNESS_DISCLAIMER}
        </Callout>
      </Section>

      <Section id="surfaces">
        <SectionHeading
          id="surfaces"
          eyebrow="Integration surfaces"
          title="Where each layer touches your stack"
          lead="Read the columns as authority, not as features."
        />
        <div className="mt-10">
          <ComparisonMatrix
            label="Integration surfaces by layer"
            columns={["DoneState", "OpsTruth", "AgentProof"]}
            rows={SURFACES}
          />
        </div>
      </Section>

      <Section id="endpoints">
        <SectionHeading
          id="endpoints"
          eyebrow="Endpoints"
          title="Canonical service and MCP addresses"
          lead="Point tooling at these addresses. Any workers.dev hostname you may have on file is historical and is not a canonical link."
        />
        <div className="mt-10 max-w-3xl">
          <KeyValueRows
            rows={[
              { key: "DoneState service", value: SERVICE_URLS.donestate },
              { key: "DoneState MCP", value: SERVICE_URLS.donestateMcp },
              { key: "OpsTruth website", value: SERVICE_URLS.opstruth },
              { key: "OpsTruth MCP", value: SERVICE_URLS.opstruthMcp },
            ]}
          />
        </div>
        <Callout tone="unproven" title="Review status" className="mt-8 max-w-3xl">
          {DONESTATE_REVIEW_STATUS}
        </Callout>
      </Section>

      <Section id="approach">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading id="approach" eyebrow="Approach" title="Adopt one layer at a time." />
          <Prose>
            <p>
              Most teams start with the verifier, because it changes nothing. It reads a repository
              and returns a classified report; there is no write path to be nervous about.
            </p>
            <p>
              The second step is usually durable execution: putting agent runs under DoneState so
              that an interrupted session leaves a known state and a run cannot mark itself done.
            </p>
            <p>
              Receipts come last, when consequential actions are involved. They are worth the
              overhead exactly when an action cannot simply be retried.
            </p>
          </Prose>
        </div>
      </Section>

      <RelatedLinks
        links={[
          { label: "Quickstart", to: "/developers/quickstart", note: "First verified run." },
          { label: "Documentation", to: "/docs", note: "Reference index." },
          { label: "Architecture", to: "/architecture", note: "Why the layers stay separate." },
          { label: "Open source", to: "/open-source", note: "Repositories and licensing." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="The harness is replaceable. The evidence should not be."
        primary={{ label: "Quickstart", to: "/developers/quickstart" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
