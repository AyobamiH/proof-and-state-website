import { createFileRoute } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Section, SectionHeading } from "@/components/ps/primitives";
import { CHANGELOG, CHANGELOG_POLICY } from "@/content/changelog";
import { GITHUB_URL } from "@/content/site";
import { PRODUCTS } from "@/content/products";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Changelog | Verified public releases";
const DESCRIPTION =
  "Verified public release entries relevant to the current Proof & State product story, including the OpsTruth GitHub Marketplace Action.";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/changelog" }),
    scripts: [breadcrumbLd([{ name: "Changelog", path: "/changelog" }])],
  }),
  component: ChangelogPage,
});

function ChangelogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Changelog"
        title="Verified public releases"
        lead="Release entries are added when there is a public release record to point to."
        crumbs={[{ label: "Changelog", to: "/changelog" }]}
        badge={{ tone: "verified", label: `${CHANGELOG.length} verified entry` }}
      />

      <Section id="entries">
        <ol className="space-y-10">
          {CHANGELOG.map((entry) => (
            <li
              key={`${entry.layer}-${entry.version}`}
              className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,8fr)]"
            >
              <div>
                <p className="font-mono text-[0.75rem] text-muted-foreground">{entry.date}</p>
                <p className="mt-1 font-mono text-[0.8125rem] text-foreground">
                  {entry.layer} {entry.version}
                </p>
              </div>
              <div>
                <h2 className="font-display text-lg font-medium text-foreground">{entry.title}</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {entry.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="policy">
        <SectionHeading id="policy" eyebrow="Policy" title="How this page is maintained" />
        <ul className="mt-8 max-w-3xl space-y-px overflow-hidden rounded-[10px] border border-hairline bg-hairline">
          {CHANGELOG_POLICY.map((rule) => (
            <li
              key={rule}
              className="bg-card px-5 py-4 text-[0.9375rem] leading-relaxed text-foreground"
            >
              {rule}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="source">
        <SectionHeading
          id="source"
          eyebrow="Source"
          title="Follow the repositories"
          lead="Repositories remain the authoritative record for implementation detail and older release history."
        />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li key={product.key} className="bg-card p-6">
              <p className="font-display text-lg font-medium text-foreground">{product.name}</p>
              <a
                href={product.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-block font-mono text-[0.75rem] text-info underline underline-offset-4"
              >
                View repository
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <RelatedLinks
        links={[
          { label: "Status", to: "/status", note: "Current product and review state." },
          { label: "Open source", to: "/open-source", note: "Repositories and distribution." },
          { label: "Products", to: "/products", note: "Public product overview." },
          { label: "Contact", to: "/contact", note: "Ask about a release." },
        ]}
      />

      <CtaBand
        title="Move faster. Keep the evidence."
        body="Release claims should have a release record behind them."
        primary={{ label: "View current status", to: "/status" }}
        secondary={{ label: "View source", href: GITHUB_URL }}
      />
    </>
  );
}
