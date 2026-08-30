import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, Prose, Section, SectionHeading } from "@/components/ps/primitives";
import { Terminal } from "@/components/ps/specimens";
import { PRODUCTS } from "@/content/products";
import { GITHUB_URL, GOVERNANCE_REPO_URL } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Open source — read the implementation";
const DESCRIPTION =
  "The Proof & State repositories: DoneState, OpsTruth and AgentProof. Source-first, GitHub-first, and honest about what is published and what is not.";

export const Route = createFileRoute("/open-source")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/open-source" }),
    scripts: [breadcrumbLd([{ name: "Open source", path: "/open-source" }])],
  }),
  component: OpenSourcePage,
});

function OpenSourcePage() {
  return (
    <>
      <PageHeader
        eyebrow="Open source"
        title="Claims should be checkable."
        lead="A system whose entire argument is independent verification cannot ask you to take its own description on faith. The repositories are the evidence for everything written on this site."
        crumbs={[{ label: "Open source", to: "/open-source" }]}
        rail={[
          { label: "DoneState", tone: "exec" },
          { label: "OpsTruth", tone: "verified" },
          { label: "AgentProof", tone: "info" },
        ]}
        aside={
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-[8px] border border-hairline bg-card px-4 py-2.5 font-mono text-[0.75rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            github.com/AyobamiH
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        }
      />

      <Section id="repositories">
        <SectionHeading
          id="repositories"
          eyebrow="Repositories"
          title="Three repositories, three boundaries"
        />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li key={product.key} className="bg-card p-6">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                {product.layer}
              </p>
              <p className="mt-3 font-display text-xl font-medium text-foreground">
                {product.name}
              </p>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
                {product.definition}
              </p>
              <a
                href={product.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-info underline underline-offset-4"
              >
                {product.repo.replace("https://", "")}
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="distribution">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="distribution"
              eyebrow="Distribution"
              title="What is published, and what is not."
            />
            <Prose className="mt-8">
              <p>
                OpsTruth is invoked as <code>npx opstruth</code>. DoneState is installed as a global
                package. AgentProof is read and built from source; this site does not claim a
                package publication for it.
              </p>
              <p>
                Licensing, versioning and support expectations live in each repository. Where this
                page and a repository disagree, the repository is authoritative.
              </p>
              <p>
                The canonical governance repository for the Proof &amp; State system and this
                website is{" "}
                <a href={GOVERNANCE_REPO_URL} target="_blank" rel="noreferrer noopener">
                  github.com/AyobamiH/proof-and-state
                </a>
                .
              </p>
            </Prose>
            <Callout tone="risk" title="No maturity claims" className="mt-8">
              We do not publish adoption numbers, customer names, download counts or stability
              guarantees. Read the code and decide.
            </Callout>
          </div>
          <div className="space-y-6">
            <Terminal
              label="opstruth"
              lines={[
                { kind: "cmd", text: "npx opstruth" },
                { kind: "note", text: "# read-only verifier · no writes" },
              ]}
            />
            <Terminal
              label="donestate"
              lines={[
                { kind: "cmd", text: "npm install -g donestate" },
                { kind: "note", text: "# durable execution and control plane" },
              ]}
            />
            <Terminal
              label="agentproof"
              lines={[
                { kind: "cmd", text: "git clone https://github.com/AyobamiH/agentproof" },
                {
                  kind: "note",
                  text: "# source and release candidates; no npm publication claimed",
                },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section id="contributing">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading
            id="contributing"
            eyebrow="Contributing"
            title="Where a contribution helps most."
          />
          <Prose>
            <p>
              Verification surfaces are the highest-leverage area: each new surface turns something
              currently Unproven into something that can be classified.
            </p>
            <p>
              Adversarial reading of the boundary is equally valuable. If you find a path where
              execution can influence a verdict, that is a defect in the architecture, not a feature
              request.
            </p>
            <p>Open an issue or a pull request on the relevant repository.</p>
          </Prose>
        </div>
      </Section>

      <RelatedLinks
        links={[
          { label: "Developers", to: "/developers", note: "Commands and entry points." },
          { label: "Security", to: "/security", note: "Report a vulnerability privately." },
          { label: "Changelog", to: "/changelog", note: "Release record." },
          { label: "Architecture", to: "/architecture", note: "What the code implements." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Read the source before believing the site."
        primary={{ label: "Documentation", to: "/docs" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
