import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/ps/page-chrome";
import {
  Container,
  DefinitionBlock,
  Section,
  SectionHeading,
  StateChip,
} from "@/components/ps/primitives";
import { ProductModules } from "@/components/ps/product-modules";
import { PRODUCTS } from "@/content/products";
import {
  AGENTPROOF_STATUS,
  DONESTATE_REVIEW_STATUS,
  GITHUB_URL,
  OPSTRUTH_STATUS,
  SITE_URL,
  SYSTEM_DEFINITION,
  TRUST_STRIP,
} from "@/content/site";
import { buildHead, jsonLd } from "@/lib/seo";

const TITLE = "Proof & State | Evidence for AI-assisted software delivery";
const DESCRIPTION =
  "Proof & State builds tools for reviewable AI-assisted repository maintenance, independent software evidence checks and future signed evidence for consequential actions.";

export const Route = createFileRoute("/")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/" }),
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Proof & State products",
        itemListElement: PRODUCTS.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: `${SITE_URL}${product.path}`,
          description: product.definition,
        })),
      }),
    ],
  }),
  component: HomePage,
});

function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-hairline bg-background">
      <div aria-hidden="true" className="rule-grid rule-fade absolute inset-0" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-eyebrow">AI-assisted software delivery</p>
              <StateChip tone="verified">reality first</StateChip>
            </div>
            <h1 className="mt-6 text-balance text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
              Let AI move faster without losing review.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Proof &amp; State helps teams prepare changes, inspect software evidence and keep
              product maturity visible instead of hiding it behind automation language.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex h-11 items-center rounded-[8px] bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore products
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-1.5 rounded-[8px] border border-hairline bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                View source
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-9 max-w-xl border-l-2 border-hairline-strong pl-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {SYSTEM_DEFINITION}
            </p>
          </div>

          <div className="space-y-px overflow-hidden rounded-[10px] border border-hairline bg-hairline">
            <div className="bg-card p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display font-medium">OpsTruth</p>
                <StateChip tone="verified">Available</StateChip>
              </div>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                Public GitHub Marketplace Action for independent software evidence checks.
              </p>
            </div>
            <div className="bg-card p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display font-medium">DoneState</p>
                <StateChip tone="exec">Live</StateChip>
              </div>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                Live owned service for reviewable repository maintenance. External listings remain
                in review.
              </p>
            </div>
            <div className="bg-card p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display font-medium">AgentProof</p>
                <StateChip tone="info">In development</StateChip>
              </div>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                Contract defined. Downstream release work remains.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />

      <div className="border-b border-hairline bg-canvas">
        <Container>
          <ul className="grid divide-y divide-hairline sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {TRUST_STRIP.map((item) => (
              <li
                key={item.label}
                className="border-hairline py-6 sm:border-r sm:px-6 sm:first:pl-0 lg:last:border-r-0"
              >
                <Link to={item.to} className="group block">
                  <p className="font-display text-[0.9375rem] font-medium text-foreground group-hover:underline group-hover:underline-offset-4">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Section id="products">
        <SectionHeading
          id="products"
          eyebrow="Products"
          title="Three products, three different jobs."
          lead="DoneState prepares reviewable maintenance. OpsTruth checks software evidence. AgentProof is the future signed-evidence component and is still in development."
        />
        <div className="mt-12">
          <ProductModules />
        </div>
      </Section>

      <Section id="how-it-helps">
        <SectionHeading
          id="how-it-helps"
          eyebrow="What changes for the team"
          title="Keep the workflow understandable."
          lead="The public story is deliberately simple: prepare work, check evidence, keep the human decision visible."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          <div className="bg-card p-6">
            <p className="font-display text-lg font-medium">Prepare changes</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
              DoneState turns selected maintenance goals into branches and pull requests that fit
              normal repository review.
            </p>
          </div>
          <div className="bg-card p-6">
            <p className="font-display text-lg font-medium">Check the evidence</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
              OpsTruth inspects software evidence independently instead of changing the system it is
              checking.
            </p>
          </div>
          <div className="bg-card p-6">
            <p className="font-display text-lg font-medium">Record important actions</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
              AgentProof is being developed to leave checkable evidence around consequential
              AI-assisted actions.
            </p>
          </div>
        </div>
      </Section>

      <Section id="status">
        <SectionHeading
          id="status"
          eyebrow="Current status"
          title="Available, under review and in development are different states."
        />
        <div className="mt-10 space-y-px overflow-hidden rounded-[10px] border border-hairline bg-hairline">
          <div className="bg-card p-5">
            <p className="font-display font-medium">OpsTruth</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
              {OPSTRUTH_STATUS}
            </p>
          </div>
          <div className="bg-card p-5">
            <p className="font-display font-medium">DoneState</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
              {DONESTATE_REVIEW_STATUS}
            </p>
          </div>
          <div className="bg-card p-5">
            <p className="font-display font-medium">AgentProof</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
              {AGENTPROOF_STATUS}
            </p>
          </div>
        </div>
      </Section>

      <Section id="definition">
        <DefinitionBlock term="Proof & State" definition={SYSTEM_DEFINITION} />
      </Section>

      <CtaBand
        title="Move faster. Keep the evidence."
        body="See what is available today, what is still under review and what is still being built."
        primary={{ label: "View product status", to: "/status" }}
        secondary={{ label: "View source", href: GITHUB_URL }}
      />
    </>
  );
}
