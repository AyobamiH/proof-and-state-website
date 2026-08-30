import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { DefinitionBlock, Section, SectionHeading } from "@/components/ps/primitives";
import { PRINCIPLES } from "@/content/principles";
import { GITHUB_URL, SITE_URL, SYSTEM_DEFINITION } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

const TITLE = "Principles — the positions behind the architecture";
const DESCRIPTION =
  "Three technical positions Proof & State is built on: independent verification, least authority, and evidence over claims. Long-form arguments, not slogans.";

export const Route = createFileRoute("/principles/")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/principles" }),
    scripts: [
      breadcrumbLd([{ name: "Principles", path: "/principles" }]),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Proof & State principles",
        itemListElement: PRINCIPLES.map((principle, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: principle.title,
          url: `${SITE_URL}/principles/${principle.slug}`,
          description: principle.statement,
        })),
      }),
    ],
  }),
  component: PrinciplesPage,
});

function PrinciplesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Principles"
        title="Arguments, not slogans."
        lead="Each principle below is a position we are prepared to defend in detail, and each one is enforced somewhere in the architecture rather than asserted in copy."
        crumbs={[{ label: "Principles", to: "/principles" }]}
        rail={PRINCIPLES.map((principle, index) => ({
          label: principle.title,
          tone: (["verified", "info", "exec"] as const)[index] ?? "info",
        }))}
      />

      <Section id="list">
        <ol className="space-y-px overflow-hidden rounded-[10px] border border-hairline bg-hairline">
          {PRINCIPLES.map((principle) => (
            <li key={principle.slug} className="bg-card">
              <Link
                to="/principles/$slug"
                params={{ slug: principle.slug }}
                className="grid gap-6 p-8 transition-colors hover:bg-secondary lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12"
              >
                <div>
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {principle.kicker}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-medium text-foreground">
                    {principle.title}
                  </h2>
                </div>
                <div>
                  <p className="text-pretty text-[1.0625rem] leading-relaxed text-foreground">
                    {principle.statement}
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {principle.summary}
                  </p>
                  <span className="mt-5 inline-block font-mono text-[0.75rem] text-info underline underline-offset-4">
                    Read in full
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="definition">
        <SectionHeading
          id="definition"
          eyebrow="What they add up to"
          title="One system, defined precisely"
        />
        <div className="mt-10">
          <DefinitionBlock term="Proof & State" definition={SYSTEM_DEFINITION} />
        </div>
      </Section>

      <RelatedLinks
        links={[
          { label: "Trust", to: "/trust", note: "Commitments derived from these positions." },
          { label: "Architecture", to: "/architecture", note: "Where each one is enforced." },
          { label: "Glossary", to: "/glossary", note: "Definitions used throughout." },
          { label: "About", to: "/about", note: "Why this system exists." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="If you disagree with a principle, the argument is on the page — take it apart."
        primary={{ label: "Read the architecture", to: "/architecture" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
