import { createFileRoute } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, KeyValueRows, Prose, Section, SectionHeading } from "@/components/ps/primitives";
import { AuthorityEnvelope } from "@/components/ps/specimens";
import { GITHUB_URL } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const PATH = "/architecture/authority-model";
const TITLE = "Authority model — envelopes, denials and separation of duties";
const DESCRIPTION =
  "How Proof & State declares authority before work begins: scoped envelopes with explicit denials, budgets and expiry, and the separation of proposer, authority, executor, signer and verifier.";

const DUTIES = [
  {
    key: "Proposer",
    value: "Prepares an action and the exact state it applies to. Cannot grant itself authority.",
  },
  {
    key: "Authority",
    value: "Issues a scoped, expiring envelope bound to that prepared state. Performs no work.",
  },
  {
    key: "Executor",
    value: "Applies the action exactly once under the envelope. Cannot widen its own scope.",
  },
  { key: "Signer", value: "Signs a receipt over action, prepared state and authority reference." },
  {
    key: "Verifier",
    value: "Judges the result from outside the execution path, holding no write authority.",
  },
];

export const Route = createFileRoute("/architecture/authority-model")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: PATH, type: "article" }),
    scripts: [
      breadcrumbLd([
        { name: "Architecture", path: "/architecture" },
        { name: "Authority model", path: PATH },
      ]),
    ],
  }),
  component: AuthorityModelPage,
});

function AuthorityModelPage() {
  return (
    <>
      <PageHeader
        eyebrow="Architecture"
        title="Authority model"
        lead="Authority is declared before admission, in writing, with explicit denials. A run cannot negotiate for more once it is underway, because there is no runtime path that grants it."
        crumbs={[
          { label: "Architecture", to: "/architecture" },
          { label: "Authority model", to: PATH },
        ]}
        rail={[
          { label: "Declare", tone: "info" },
          { label: "Admit", tone: "info" },
          { label: "Execute", tone: "exec" },
          { label: "Expire", tone: "unproven" },
        ]}
      />

      <Section id="envelope">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="envelope"
              eyebrow="Envelope"
              title="Scope, denial, budget, expiry."
            />
            <Prose className="mt-8">
              <p>
                An authority envelope states four things before any work starts: what the run may
                touch, what it explicitly may not touch, how much work it may consume, and when the
                grant stops being valid.
              </p>
              <p>
                Explicit denials matter more than they look. A scope list describes intent; a denial
                list describes the blast radius you have decided to rule out. Deployment, database
                writes, secret reads and service restarts are denied by default because their
                consequences are not reversible by retrying.
              </p>
              <p>
                Expiry is tied to the lease rather than to a wall-clock afterthought. There is no
                implicit renewal, so an abandoned run loses authority rather than retaining it
                indefinitely.
              </p>
            </Prose>
            <Callout tone="denied" title="Out of envelope means refused" className="mt-8">
              Work outside the envelope is refused at admission. It is not escalated, queued for
              approval mid-run, or downgraded to a warning.
            </Callout>
          </div>
          <AuthorityEnvelope />
        </div>
      </Section>

      <Section id="duties">
        <SectionHeading
          id="duties"
          eyebrow="Separation of duties"
          title="Five roles, held apart on purpose"
          lead="Collapsing any two of these roles produces a system that can approve its own consequences."
        />
        <div className="mt-10 max-w-3xl">
          <KeyValueRows rows={DUTIES} />
        </div>
      </Section>

      <RelatedLinks
        links={[
          {
            label: "State model",
            to: "/architecture/state-model",
            note: "What a run may do next.",
          },
          {
            label: "AgentProof",
            to: "/products/agentproof",
            note: "Authority bound to prepared state.",
          },
          {
            label: "Least authority",
            to: "/principles/least-authority",
            note: "The principle behind the model.",
          },
          { label: "Security", to: "/security", note: "Posture and disclosure." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Narrow authority is what makes broad autonomy survivable."
        primary={{ label: "Read the principles", to: "/principles" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
