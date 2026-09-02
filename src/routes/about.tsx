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

const TITLE = "About | Why Proof & State exists";
const DESCRIPTION =
  "Proof & State is an independent engineering project focused on reviewable AI-assisted software delivery and evidence that can be checked after automation has acted.";

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
        title="Automation should make work faster, not harder to review."
        lead="Proof & State exists to make AI-assisted software work easier to inspect, challenge and hand back to a human decision point."
        crumbs={[{ label: "About", to: "/about" }]}
      />

      <Section id="why">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <Prose>
            <p>
              AI coding tools can prepare meaningful software changes very quickly. That speed is
              useful, but it also makes it easier for a team to lose track of what was actually
              changed, what was checked and what still needs human judgement.
            </p>
            <p>
              Proof &amp; State focuses on that handoff. DoneState prepares repository maintenance
              in a reviewable form. OpsTruth checks software evidence independently. AgentProof is
              being developed for a later problem: leaving durable evidence around consequential
              AI-assisted actions.
            </p>
            <p>
              The public website deliberately describes those outcomes rather than exposing the
              internal machinery used to implement them. Product users should not need backend
              terminology to understand what they are being asked to trust.
            </p>
          </Prose>
          <div>
            <Callout tone="info" title="Independent project">
              Proof &amp; State is developed in the open. The site does not claim customers,
              partnerships, certifications or funding as borrowed proof of product quality.
            </Callout>
            <Callout tone="verified" title="Reality before polish" className="mt-6">
              If a product is under external review or still in development, that status belongs in
              the main story rather than in fine print.
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
              Where this site describes behaviour that exists today, the corresponding repository or
              public release should provide something concrete to inspect.
            </p>
            <p>
              Where work is planned, the copy should say planned. Where distribution is under
              review, the copy should say under review. That distinction is part of the product
              discipline.
            </p>
          </Prose>
        </div>
      </Section>

      <RelatedLinks
        links={[
          { label: "Products", to: "/products", note: "What exists today and what comes next." },
          { label: "Trust", to: "/trust", note: "Public commitments and limits." },
          { label: "Open source", to: "/open-source", note: "Read the repositories." },
          { label: "Contact", to: "/contact", note: "Get in touch." },
        ]}
      />

      <CtaBand
        title="Move faster. Keep the evidence."
        body="The product story should stay as inspectable as the software."
        primary={{ label: "Explore products", to: "/products" }}
        secondary={{ label: "View source", href: GITHUB_URL }}
      />
    </>
  );
}
