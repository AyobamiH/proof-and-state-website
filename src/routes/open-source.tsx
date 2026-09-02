import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, Prose, Section, SectionHeading, StateChip } from "@/components/ps/primitives";
import { PRODUCTS } from "@/content/products";
import {
  AGENTPROOF_STATUS,
  DONESTATE_REVIEW_STATUS,
  GITHUB_URL,
  GOVERNANCE_REPO_URL,
  OPSTRUTH_MARKETPLACE_URL,
  OPSTRUTH_STATUS,
} from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Open source | Repositories and public releases";
const DESCRIPTION =
  "Public repositories and distribution status for DoneState, OpsTruth, AgentProof and the Proof & State website.";

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
        title="Read the source behind the claim."
        lead="The repositories are where implementation detail belongs. The website keeps the public product story readable and links back when deeper inspection is useful."
        crumbs={[{ label: "Open source", to: "/open-source" }]}
        aside={
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-[8px] border border-hairline bg-card px-4 py-2.5 font-mono text-[0.75rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            Website repository <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        }
      />

      <Section id="repositories">
        <SectionHeading
          id="repositories"
          eyebrow="Repositories"
          title="Public source for each product"
        />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li key={product.key} className="bg-card p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-xl font-medium text-foreground">{product.name}</p>
                <StateChip tone={product.accent}>{product.stateBadge}</StateChip>
              </div>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
                {product.definition}
              </p>
              <a
                href={product.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-info underline underline-offset-4"
              >
                View repository <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="distribution">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading id="distribution" eyebrow="Distribution" title="What is public today" />
          <div className="space-y-5">
            <Callout tone="verified" title="OpsTruth">
              {OPSTRUTH_STATUS}{" "}
              <a
                href={OPSTRUTH_MARKETPLACE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="underline underline-offset-4"
              >
                Open the Marketplace listing.
              </a>
            </Callout>
            <Callout tone="exec" title="DoneState">
              {DONESTATE_REVIEW_STATUS}
            </Callout>
            <Callout tone="unproven" title="AgentProof">
              {AGENTPROOF_STATUS}
            </Callout>
          </div>
        </div>
      </Section>

      <Section id="project-record">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading
            id="project-record"
            eyebrow="Project record"
            title="Portfolio decisions are documented separately"
          />
          <Prose>
            <p>
              The Proof &amp; State project record is maintained in a separate public repository so
              product and website source do not have to double as the public marketing narrative.
            </p>
            <p>
              <a href={GOVERNANCE_REPO_URL} target="_blank" rel="noreferrer noopener">
                Open the Proof &amp; State project record on GitHub.
              </a>
            </p>
            <p>
              When this site and a product repository disagree about implementation detail, prefer
              the current product repository and verified release record.
            </p>
          </Prose>
        </div>
      </Section>

      <RelatedLinks
        links={[
          { label: "Status", to: "/status", note: "Current product and distribution state." },
          { label: "Changelog", to: "/changelog", note: "Verified public release entries." },
          { label: "Security", to: "/security", note: "Report a vulnerability privately." },
          { label: "Products", to: "/products", note: "Public product overview." },
        ]}
      />

      <CtaBand
        title="Move faster. Keep the evidence."
        body="Read the public story here, then inspect the source when you need implementation detail."
        primary={{ label: "View product status", to: "/status" }}
        secondary={{ label: "View website source", href: GITHUB_URL }}
      />
    </>
  );
}
