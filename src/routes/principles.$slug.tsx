import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, Prose, Section, SectionHeading } from "@/components/ps/primitives";
import { PRINCIPLES, PRINCIPLE_BY_SLUG } from "@/content/principles";
import { GITHUB_URL, SITE_URL } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/principles/$slug")({
  loader: ({ params }) => {
    const principle = PRINCIPLE_BY_SLUG.get(params.slug);
    if (!principle) throw notFound();
    return { principle };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { principle } = loaderData;
    const path = `/principles/${params.slug}`;
    return {
      ...buildHead({
        title: `${principle.title} — principle`,
        description: principle.statement,
        path,
        type: "article",
      }),
      scripts: [
        breadcrumbLd([
          { name: "Principles", path: "/principles" },
          { name: principle.title, path },
        ]),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: principle.title,
          description: principle.statement,
          url: `${SITE_URL}${path}`,
          articleSection: "Principles",
        }),
      ],
    };
  },
  notFoundComponent: PrincipleNotFound,
  component: PrinciplePage,
});

function PrincipleNotFound() {
  return (
    <Section id="notfound">
      <SectionHeading
        id="notfound"
        eyebrow="Principles"
        title="No principle at this address"
        lead="The three principles are independent verification, least authority and evidence over claims."
      />
      <Link to="/principles" className="mt-8 inline-block text-info underline underline-offset-4">
        Back to principles
      </Link>
    </Section>
  );
}

function PrinciplePage() {
  const { principle } = Route.useLoaderData();
  const others = PRINCIPLES.filter((entry) => entry.slug !== principle.slug);

  return (
    <>
      <PageHeader
        eyebrow={principle.kicker}
        title={principle.title}
        lead={principle.statement}
        crumbs={[
          { label: "Principles", to: "/principles" },
          { label: principle.title, to: `/principles/${principle.slug}` },
        ]}
      />

      <Section id="argument">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <article>
            <Prose>
              <p className="text-[1.125rem] leading-relaxed text-foreground">{principle.summary}</p>
            </Prose>
            {principle.sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="font-display text-2xl font-medium text-foreground">
                  {section.heading}
                </h2>
                <Prose className="mt-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Prose>
              </section>
            ))}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-eyebrow">Implemented by</p>
            <ul className="mt-4 space-y-px overflow-hidden rounded-[10px] border border-hairline bg-hairline">
              {principle.implementedBy.map((item) => (
                <li key={item.name + item.path} className="bg-card">
                  <Link to={item.path} className="block p-4 transition-colors hover:bg-secondary">
                    <span className="block font-display text-[0.9375rem] font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-relaxed text-muted-foreground">
                      {item.how}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Callout tone="info" title="Position, not promise" className="mt-6">
              This page argues for a structural property. It does not claim a certification, an
              audit or a guarantee about your deployment.
            </Callout>
          </aside>
        </div>
      </Section>

      <Section id="others">
        <SectionHeading id="others" eyebrow="Continue" title="The other principles" />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2">
          {others.map((other) => (
            <li key={other.slug} className="bg-card">
              <Link
                to="/principles/$slug"
                params={{ slug: other.slug }}
                className="block h-full p-6 transition-colors hover:bg-secondary"
              >
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {other.kicker}
                </p>
                <p className="mt-3 font-display text-xl font-medium text-foreground">
                  {other.title}
                </p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
                  {other.statement}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <RelatedLinks
        links={[
          { label: "Principles", to: "/principles", note: "All three positions." },
          { label: "Trust", to: "/trust", note: "Commitments derived from them." },
          { label: "Architecture", to: "/architecture", note: "Where they are enforced." },
          { label: "Glossary", to: "/glossary", note: "Definitions used here." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Principles are only credible when the architecture makes them expensive to violate."
        primary={{ label: "Read the architecture", to: "/architecture" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
