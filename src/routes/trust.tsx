import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, DefinitionBlock, Section, SectionHeading } from "@/components/ps/primitives";
import { SystemDiagram } from "@/components/ps/system-diagram";
import { PRINCIPLES, TRUST_COMMITMENTS } from "@/content/principles";
import { GITHUB_URL, SYSTEM_DEFINITION } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Trust — accountability enforced by architecture";
const DESCRIPTION =
  "Proof & State earns trust through structure rather than assurance: least authority, explicit consequence envelopes, exact-commit evidence, separation of duties, deterministic recovery and no self-verification.";

export const Route = createFileRoute("/trust")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/trust" }),
    scripts: [breadcrumbLd([{ name: "Trust", path: "/trust" }])],
  }),
  component: TrustPage,
});

function TrustPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust"
        title="Trust by architecture, not by assurance."
        lead="We would rather show you a structure that makes a failure mode impossible than write a paragraph promising it will not happen."
        crumbs={[{ label: "Trust", to: "/trust" }]}
        rail={[
          { label: "Least authority", tone: "info" },
          { label: "Exact evidence", tone: "verified" },
          { label: "Separated duties", tone: "exec" },
        ]}
      />

      <Section id="commitments">
        <SectionHeading
          id="commitments"
          eyebrow="Commitments"
          title="Six properties the system is built to hold"
          lead="Each one is enforced by where authority sits, not by policy or intent."
        />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_COMMITMENTS.map((commitment) => (
            <div key={commitment.title} className="bg-card p-6">
              <dt className="font-display text-[1.0625rem] font-medium text-foreground">
                {commitment.title}
              </dt>
              <dd className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
                {commitment.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="boundary">
        <SectionHeading
          id="boundary"
          eyebrow="Boundary"
          title="The one line the system will not cross"
          lead="Verification sits outside the execution path. Evidence crosses the boundary; authority never does."
        />
        <div className="mt-12">
          <SystemDiagram />
        </div>
        <Callout tone="denied" title="Self-verification is not proof" className="mt-10 max-w-3xl">
          Completion reported by the component that performed the work tells you about that
          component&rsquo;s confidence, not about the state of the system.
        </Callout>
      </Section>

      <Section id="principles">
        <SectionHeading
          id="principles"
          eyebrow="Principles"
          title="The positions behind the commitments"
          lead="Three long-form technical positions. They are arguments, not slogans, and they are meant to be disagreed with in detail."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <li key={principle.slug} className="bg-card">
              <Link
                to="/principles/$slug"
                params={{ slug: principle.slug }}
                className="block h-full p-6 transition-colors hover:bg-secondary"
              >
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {principle.kicker}
                </p>
                <p className="mt-3 font-display text-xl font-medium text-foreground">
                  {principle.title}
                </p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
                  {principle.summary}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="honesty">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading
            id="honesty"
            eyebrow="What we do not claim"
            title="Maturity is not a marketing decision."
          />
          <ul className="space-y-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
            <li>
              We do not list customers, logos, adoption counts or partnerships. None are claimed
              because none are being asserted here.
            </li>
            <li>
              We do not claim certifications, audits or compliance attestations. If that changes,
              the evidence will be published alongside the claim.
            </li>
            <li>
              We do not publish uptime figures or live service metrics. See{" "}
              <Link to="/status" className="text-info underline underline-offset-4">
                status
              </Link>{" "}
              for what is actually known.
            </li>
            <li>
              We do not list releases that have not been cut. The{" "}
              <Link to="/changelog" className="text-info underline underline-offset-4">
                changelog
              </Link>{" "}
              stays empty until there is something real in it.
            </li>
          </ul>
        </div>
      </Section>

      <Section id="definition">
        <DefinitionBlock term="Proof & State" definition={SYSTEM_DEFINITION} />
      </Section>

      <RelatedLinks
        links={[
          { label: "Security", to: "/security", note: "Posture, boundaries and disclosure." },
          { label: "Architecture", to: "/architecture", note: "How the boundary is enforced." },
          { label: "Principles", to: "/principles", note: "The long-form arguments." },
          { label: "Open source", to: "/open-source", note: "Read the implementation." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Every commitment on this page should be checkable against the source."
        primary={{ label: "Open source", to: "/open-source" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
