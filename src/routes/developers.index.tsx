import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Section, SectionHeading } from "@/components/ps/primitives";
import { Terminal } from "@/components/ps/specimens";
import { PRODUCTS } from "@/content/products";
import { GITHUB_URL, HARNESS_DISCLAIMER } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Developers — install, run and inspect the tooling";
const DESCRIPTION =
  "Developer gateway for Proof & State: run the OpsTruth read-only verifier, install DoneState, read the AgentProof source, and understand how the layers fit into an existing agent workflow.";

const PATHS = [
  {
    to: "/developers/quickstart" as const,
    label: "Quickstart",
    note: "Run the read-only verifier against a repository you already trust and read the report.",
  },
  {
    to: "/developers/integrations" as const,
    label: "Integrations",
    note: "How the layers sit alongside an existing coding harness and CI setup.",
  },
  {
    to: "/docs" as const,
    label: "Documentation",
    note: "Reference index: concepts, models and where each detail is authoritative.",
  },
  {
    to: "/open-source" as const,
    label: "Open source",
    note: "Repositories, licensing and how to read the implementation.",
  },
];

export const Route = createFileRoute("/developers/")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/developers" }),
    scripts: [breadcrumbLd([{ name: "Developers", path: "/developers" }])],
  }),
  component: DevelopersPage,
});

function DevelopersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Developers"
        title="Start with the verifier."
        lead="The fastest way to understand Proof & State is to point a read-only verifier at a codebase you already have opinions about, and see which of those opinions it can actually evidence."
        crumbs={[{ label: "Developers", to: "/developers" }]}
        rail={[
          { label: "Install", tone: "info" },
          { label: "Verify", tone: "verified" },
          { label: "Read report", tone: "exec" },
        ]}
        aside={
          <Terminal
            label="first run"
            lines={[
              { kind: "cmd", text: "npx opstruth" },
              { kind: "out", text: "read-only inspection · no writes performed" },
            ]}
          />
        }
      />

      <Section id="paths">
        <SectionHeading id="paths" eyebrow="Where to go" title="Four entry points" />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2">
          {PATHS.map((path) => (
            <li key={path.to} className="bg-card">
              <Link to={path.to} className="block h-full p-6 transition-colors hover:bg-secondary">
                <p className="font-display text-xl font-medium text-foreground">{path.label}</p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
                  {path.note}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="commands">
        <SectionHeading
          id="commands"
          eyebrow="Commands"
          title="What each layer looks like from a terminal"
          lead="Distribution differs per layer. Where a package is not published, the repository is the source of truth."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Terminal
            label="opstruth · verify"
            lines={[
              { kind: "cmd", text: "npx opstruth" },
              { kind: "out", text: "verified / risky / unproven report" },
              { kind: "note", text: "# read-only — never writes" },
            ]}
          />
          <Terminal
            label="donestate · execute"
            lines={[
              { kind: "cmd", text: "npm install -g donestate" },
              { kind: "cmd", text: "donestate run --outcome ./outcome.md" },
              { kind: "note", text: "# halts at AWAITING_VERIFICATION" },
            ]}
          />
          <Terminal
            label="agentproof · source"
            lines={[
              { kind: "cmd", text: "git clone https://github.com/AyobamiH/agentproof" },
              { kind: "note", text: "# read from source; no package publication is claimed" },
            ]}
          />
        </div>
      </Section>

      <Section id="repos">
        <SectionHeading id="repos" eyebrow="Source" title="Repositories" />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li key={product.key} className="bg-card p-6">
              <p className="font-display text-lg font-medium text-foreground">{product.name}</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {product.role}
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
        <p className="mt-6 max-w-2xl text-[0.8125rem] leading-relaxed text-muted-foreground">
          {HARNESS_DISCLAIMER}
        </p>
      </Section>

      <RelatedLinks
        links={[
          {
            label: "Quickstart",
            to: "/developers/quickstart",
            note: "First verified run, step by step.",
          },
          {
            label: "Integrations",
            to: "/developers/integrations",
            note: "Fit into an existing workflow.",
          },
          { label: "Architecture", to: "/architecture", note: "Why the layers are separate." },
          { label: "Glossary", to: "/glossary", note: "Terms used across the docs." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Run the verifier before you trust anything written on this site."
        primary={{ label: "Quickstart", to: "/developers/quickstart" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
