import { createFileRoute } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, Section, SectionHeading } from "@/components/ps/primitives";
import { CHANGELOG, CHANGELOG_POLICY } from "@/content/changelog";
import { GITHUB_URL } from "@/content/site";
import { PRODUCTS } from "@/content/products";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Changelog — release record";
const DESCRIPTION =
  "The Proof & State release record. No versions or dates are listed until a release is actually cut; until then the repositories are the authoritative record of what exists.";

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
        title="Release record"
        lead="This page lists releases that have actually happened. Right now that list is empty, and saying so is more useful than filling it."
        crumbs={[{ label: "Changelog", to: "/changelog" }]}
        badge={{ tone: "unproven", label: "no releases recorded" }}
      />

      <Section id="entries">
        {CHANGELOG.length === 0 ? (
          <div className="max-w-3xl">
            <Callout tone="unproven" title="No releases recorded">
              No tagged release has been published to this changelog. Inventing versions, dates or
              release notes would be a fabricated maturity claim, so nothing is listed. Follow the
              repositories for current state.
            </Callout>
            <SectionHeading
              id="entries"
              eyebrow="Policy"
              title="How this page will be maintained"
              className="mt-14"
            />
            <ul className="mt-8 space-y-px overflow-hidden rounded-[10px] border border-hairline bg-hairline">
              {CHANGELOG_POLICY.map((rule) => (
                <li
                  key={rule}
                  className="bg-card px-5 py-4 text-[0.9375rem] leading-relaxed text-foreground"
                >
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        ) : (
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
                  <h2 className="font-display text-lg font-medium text-foreground">
                    {entry.title}
                  </h2>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {entry.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Section>

      <Section id="source">
        <SectionHeading
          id="source"
          eyebrow="Authoritative source"
          title="Follow the repositories"
          lead="Commits, tags and issues in the repositories describe the real state of each layer."
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
                {product.repo.replace("https://", "")}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <RelatedLinks
        links={[
          { label: "Status", to: "/status", note: "What is known about system state." },
          { label: "Open source", to: "/open-source", note: "Repositories and distribution." },
          { label: "Documentation", to: "/docs", note: "Reference index." },
          { label: "Contact", to: "/contact", note: "Ask about a release." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="An empty changelog is evidence too."
        primary={{ label: "Open source", to: "/open-source" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
