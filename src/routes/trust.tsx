import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, DefinitionBlock, Section, SectionHeading } from "@/components/ps/primitives";
import { GITHUB_URL, SYSTEM_DEFINITION } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Trust | Public commitments and limits";
const DESCRIPTION =
  "How Proof & State earns trust publicly: reviewable changes, independent evidence checks, clear product maturity, inspectable source and explicit limits.";

const COMMITMENTS = [
  {
    title: "Review stays visible",
    body: "AI-assisted repository maintenance should return to a normal review point instead of making the final decision disappear inside automation.",
  },
  {
    title: "Independent inspection",
    body: "OpsTruth is designed to inspect software evidence without repairing, deploying or publishing the system it checks.",
  },
  {
    title: "Product maturity is explicit",
    body: "Available, live, under external review and in development are described as different states.",
  },
  {
    title: "Claims point to evidence",
    body: "Where a public release or repository can support a claim, the site links back to it instead of asking visitors to trust a summary.",
  },
  {
    title: "Limits are part of the product story",
    body: "What a product does not do is stated alongside what it offers, especially where human review remains necessary.",
  },
  {
    title: "No borrowed credibility",
    body: "The site does not invent customers, partnerships, certifications, audits, adoption numbers or availability guarantees.",
  },
] as const;

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
        title="Make the limits as visible as the promise."
        lead="Proof & State should be understandable without knowing its internal implementation vocabulary. The public contract is what the products do, what they do not do and how mature they actually are."
        crumbs={[{ label: "Trust", to: "/trust" }]}
      />

      <Section id="commitments">
        <SectionHeading
          id="commitments"
          eyebrow="Public commitments"
          title="What visitors should be able to rely on"
          lead="These commitments are written at the level a product user can evaluate."
        />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {COMMITMENTS.map((commitment) => (
            <div key={commitment.title} className="bg-card p-6">
              <dt className="font-display text-[1.0625rem] font-medium text-foreground">{commitment.title}</dt>
              <dd className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">{commitment.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="status-honesty">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading
            id="status-honesty"
            eyebrow="Status honesty"
            title="External review is not approval. In development is not available."
            lead="Distribution labels are kept literal so the website cannot create maturity that the product has not earned."
          />
          <div>
            <Callout tone="verified" title="Available now">
              OpsTruth has a publicly listed GitHub Marketplace Action. Its public release is part of the evidence for that claim.
            </Callout>
            <Callout tone="exec" title="Live, with listings under review" className="mt-5">
              DoneState is live on its owned service domain. Its OpenAI and GitHub Marketplace review states remain external review states, not publication claims.
            </Callout>
            <Callout tone="unproven" title="In development" className="mt-5">
              AgentProof has a defined contract and purpose, but downstream release work remains. Planned behaviour is not presented as shipped behaviour.
            </Callout>
          </div>
        </div>
      </Section>

      <Section id="claims">
        <SectionHeading id="claims" eyebrow="What we do not claim" title="Credibility does not come from decorative badges." />
        <ul className="mt-8 max-w-3xl space-y-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
          <li>No customer, partnership, funding or adoption claim is made unless it is deliberately published and supportable.</li>
          <li>No certification, audit or compliance attestation is claimed on this site.</li>
          <li>No uptime percentage or service-level commitment is published without real monitoring evidence behind it.</li>
          <li>Planned product behaviour is labelled as planned rather than written in the present tense.</li>
        </ul>
        <p className="mt-8 text-[0.875rem] text-muted-foreground">
          See the <Link to="/status" className="text-info underline underline-offset-4">status page</Link> for current distribution state.
        </p>
      </Section>

      <Section id="definition"><DefinitionBlock term="Proof & State" definition={SYSTEM_DEFINITION} /></Section>

      <RelatedLinks
        links={[
          { label: "Security", to: "/security", note: "Security posture and disclosure." },
          { label: "Open source", to: "/open-source", note: "Repositories and public releases." },
          { label: "Status", to: "/status", note: "Current product and distribution status." },
          { label: "About", to: "/about", note: "Why the project exists." },
        ]}
      />

      <CtaBand
        title="Move faster. Keep the evidence."
        body="Trust starts with saying clearly what is real today."
        primary={{ label: "View current status", to: "/status" }}
        secondary={{ label: "View source", href: GITHUB_URL }}
      />
    </>
  );
}
