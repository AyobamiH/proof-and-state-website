import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Section } from "@/components/ps/primitives";
import { GLOSSARY } from "@/content/glossary";
import { GITHUB_URL, SITE_URL } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

const TITLE = "Glossary — precise definitions";
const DESCRIPTION =
  "Definitions of the terms used across Proof & State: authority envelope, attestation, admission control, idempotency, lease, receipt, verification classification and more.";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/glossary" }),
    scripts: [
      breadcrumbLd([{ name: "Glossary", path: "/glossary" }]),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        name: "Proof & State glossary",
        url: `${SITE_URL}/glossary`,
        hasDefinedTerm: GLOSSARY.map((entry) => ({
          "@type": "DefinedTerm",
          name: entry.term,
          description: entry.definition,
        })),
      }),
    ],
  }),
  component: GlossaryPage,
});

function GlossaryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Glossary"
        title="Precise definitions"
        lead="Accountability arguments fall apart when terms drift. These definitions are used consistently across every page and every repository."
        crumbs={[{ label: "Glossary", to: "/glossary" }]}
      />

      <Section id="terms">
        <dl className="divide-y divide-hairline border-y border-hairline">
          {GLOSSARY.map((entry) => (
            <div
              key={entry.term}
              id={entry.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="grid gap-4 py-7 lg:grid-cols-[minmax(0,3fr)_minmax(0,8fr)] lg:gap-12"
            >
              <dt className="font-display text-lg font-medium text-foreground">{entry.term}</dt>
              <dd>
                <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {entry.definition}
                </p>
                {entry.related?.length ? (
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                    {entry.related.map((link) => (
                      <li key={link.to + link.label}>
                        <Link
                          to={link.to}
                          className="font-mono text-[0.75rem] text-info underline underline-offset-4"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <RelatedLinks
        links={[
          { label: "Architecture", to: "/architecture", note: "The terms in context." },
          { label: "Products", to: "/products", note: "Where each concept is implemented." },
          { label: "Principles", to: "/principles", note: "Why the distinctions matter." },
          { label: "Documentation", to: "/docs", note: "Reference index." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Shared vocabulary is the cheapest accountability control there is."
        primary={{ label: "Documentation", to: "/docs" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
