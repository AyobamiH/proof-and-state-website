import { createFileRoute } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import {
  Callout,
  DefinitionBlock,
  Prose,
  Section,
  SectionHeading,
} from "@/components/ps/primitives";
import { GITHUB_URL, SYSTEM_DEFINITION } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "About — why Proof & State exists";
const DESCRIPTION =
  "Proof & State is an independent engineering project building accountability infrastructure for autonomous work: durable execution, independent read-only verification and signed receipts.";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/about" }),
    scripts: [breadcrumbLd([{ name: "About", path: "/about" }])],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An agent said it was done. That is not the same as it being done."
        lead="Proof & State exists because autonomy scaled faster than accountability. The tooling to let an agent act is mature; the tooling to prove what it actually changed is not."
        crumbs={[{ label: "About", to: "/about" }]}
      />

      <Section id="thesis">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <Prose>
            <p>
              Every coding agent already produces a completion signal. The problem is what that
              signal is made of: the same model, the same context and the same assumptions that
              produced the work also produced the report about it. When the work is wrong, the
              report is usually wrong in the same direction.
            </p>
            <p>
              The response has mostly been to make agents more careful. That helps, and it does not
              solve the structural issue, because no component can supply independent evidence about
              itself regardless of how careful it is.
            </p>
            <p>
              Proof &amp; State takes the other route. Split the system so that the part that acts
              and the part that judges are different components with different authority, then make
              the artefacts durable enough to inspect after the session ends.
            </p>
            <p>
              That is the entire thesis. DoneState executes under declared authority and refuses to
              close its own run. AgentProof binds consequential actions to exact prepared state and
              signs a receipt. OpsTruth reads the result from outside and classifies it Verified,
              Risky or Unproven.
            </p>
          </Prose>
          <div>
            <Callout tone="denied" title="Self-verification is not proof">
              The single sentence the whole system is organised around.
            </Callout>
            <Callout tone="info" title="Independent project" className="mt-6">
              Proof &amp; State is developed in the open. No funding, customers, partnerships or
              certifications are claimed on this site.
            </Callout>
          </div>
        </div>
      </Section>

      <Section id="definition">
        <SectionHeading id="definition" eyebrow="Definition" title="What Proof & State is" />
        <div className="mt-10">
          <DefinitionBlock term="Proof & State" definition={SYSTEM_DEFINITION} />
        </div>
      </Section>

      <Section id="how-we-work">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading
            id="how-we-work"
            eyebrow="How we work"
            title="Source first, claims second."
          />
          <Prose>
            <p>
              The repositories come before the marketing. Where this site describes behaviour, the
              corresponding repository should let you check it.
            </p>
            <p>
              We would rather publish an empty changelog and an honest status page than manufacture
              momentum. Accountability infrastructure that overstates itself has already failed its
              own test.
            </p>
          </Prose>
        </div>
      </Section>

      <RelatedLinks
        links={[
          { label: "Principles", to: "/principles", note: "The positions behind the work." },
          { label: "Architecture", to: "/architecture", note: "How the thesis is built." },
          { label: "Open source", to: "/open-source", note: "Read the implementation." },
          { label: "Contact", to: "/contact", note: "Get in touch." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Autonomy is fine. Unverifiable autonomy is not."
        primary={{ label: "Read the architecture", to: "/architecture" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
