import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, Section, SectionHeading } from "@/components/ps/primitives";
import { GITHUB_URL } from "@/content/site";
import { PRODUCTS } from "@/content/products";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Documentation — reference index";
const DESCRIPTION =
  "Index of authoritative references for Proof & State: concepts, run state model, authority model, product layers, developer guides and the repositories that remain the source of truth.";

const SECTIONS = [
  {
    heading: "Concepts",
    items: [
      {
        label: "System topology",
        to: "/architecture" as const,
        note: "The independence boundary and how a run flows through it.",
      },
      {
        label: "Run state model",
        to: "/architecture/state-model" as const,
        note: "Transitions, leases, idempotency, recovery.",
      },
      {
        label: "Authority model",
        to: "/architecture/authority-model" as const,
        note: "Envelopes, denials, budgets, separation of duties.",
      },
      {
        label: "Glossary",
        to: "/glossary" as const,
        note: "Precise definitions of every term used across the docs.",
      },
    ],
  },
  {
    heading: "Layers",
    items: [
      {
        label: "DoneState",
        to: "/donestate" as const,
        note: "Durable execution and control plane.",
      },
      {
        label: "OpsTruth",
        to: "/products/opstruth" as const,
        note: "Independent read-only verifier.",
      },
      {
        label: "AgentProof",
        to: "/products/agentproof" as const,
        note: "Authorised transactions and signed receipts.",
      },
      {
        label: "Layer comparison",
        to: "/products" as const,
        note: "What each layer may and may not do.",
      },
    ],
  },
  {
    heading: "Guides",
    items: [
      {
        label: "Quickstart",
        to: "/developers/quickstart" as const,
        note: "From unverified repository to attested run.",
      },
      {
        label: "Integrations",
        to: "/developers/integrations" as const,
        note: "Fitting the layers into an existing workflow.",
      },
      {
        label: "Developer gateway",
        to: "/developers" as const,
        note: "Commands and repositories per layer.",
      },
      {
        label: "Open source",
        to: "/open-source" as const,
        note: "Licensing and how to read the implementation.",
      },
    ],
  },
  {
    heading: "Positions",
    items: [
      {
        label: "Principles",
        to: "/principles" as const,
        note: "Long-form technical arguments behind the design.",
      },
      { label: "Trust", to: "/trust" as const, note: "Commitments enforced by structure." },
      {
        label: "Security",
        to: "/security" as const,
        note: "Posture and vulnerability disclosure.",
      },
      {
        label: "Changelog",
        to: "/changelog" as const,
        note: "Release record, kept empty until releases exist.",
      },
    ],
  },
];

export const Route = createFileRoute("/docs")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/docs" }),
    scripts: [breadcrumbLd([{ name: "Documentation", path: "/docs" }])],
  }),
  component: DocsPage,
});

function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="Reference index"
        lead="This is a gateway, not a wiki. Each entry points at the page that is authoritative for that topic, and every one of them is server-rendered text you can quote."
        crumbs={[{ label: "Documentation", to: "/docs" }]}
        rail={[
          { label: "Concepts", tone: "info" },
          { label: "Layers", tone: "exec" },
          { label: "Guides", tone: "verified" },
        ]}
      />

      <Section id="index">
        <div className="grid gap-12 lg:grid-cols-2">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl font-medium text-foreground">
                {section.heading}
              </h2>
              <ul className="mt-5 divide-y divide-hairline border-y border-hairline">
                {section.items.map((item) => (
                  <li key={item.to + item.label}>
                    <Link to={item.to} className="group flex flex-col gap-1 py-4 transition-colors">
                      <span className="font-display text-[0.9375rem] font-medium text-foreground group-hover:underline group-hover:underline-offset-4">
                        {item.label}
                      </span>
                      <span className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                        {item.note}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Callout
          tone="info"
          title="The repository is authoritative for implementation detail"
          className="mt-12 max-w-3xl"
        >
          Where this documentation and a repository README disagree about a command, flag or file
          format, the repository wins. Source links are listed below.
        </Callout>
      </Section>

      <Section id="source">
        <SectionHeading id="source" eyebrow="Source" title="Implementation references" />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li key={product.key} className="bg-card p-6">
              <p className="font-display text-lg font-medium text-foreground">{product.name}</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {product.definition}
              </p>
              <a
                href={product.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-block font-mono text-[0.75rem] text-info underline underline-offset-4"
              >
                {product.repo.replace("https://", "")}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <RelatedLinks
        links={[
          {
            label: "Quickstart",
            to: "/developers/quickstart",
            note: "Start here if you want to run something.",
          },
          {
            label: "Architecture",
            to: "/architecture",
            note: "Start here if you want to understand it.",
          },
          { label: "Glossary", to: "/glossary", note: "Start here if a term is unclear." },
          { label: "Contact", to: "/contact", note: "Start here if something is missing." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Documentation should be checkable against source. Both are linked from this page."
        primary={{ label: "Open source", to: "/open-source" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
