import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageHeader, RelatedLinks, type Crumb } from "@/components/ps/page-chrome";
import {
  Callout,
  Container,
  DefinitionBlock,
  Section,
  SectionHeading,
} from "@/components/ps/primitives";
import { PRODUCTS, type Product } from "@/content/products";

export function ProductDetail({
  product,
  specimen,
  specimenNote,
  children,
}: {
  product: Product;
  specimen: React.ReactNode;
  specimenNote: string;
  /** Optional layer-specific section rendered after the capability grid. */
  children?: React.ReactNode;
}) {
  const crumbs: Crumb[] = [
    { label: "Products", to: "/products" },
    { label: product.name, to: product.path },
  ];
  const others = PRODUCTS.filter((entry) => entry.key !== product.key);

  return (
    <>
      <PageHeader
        eyebrow={product.role}
        title={product.name}
        lead={product.tagline}
        crumbs={crumbs}
        badge={{ tone: product.accent, label: product.stateBadge }}
        rail={[
          { label: "Outcome", tone: "unproven" },
          { label: "Authority", tone: "info" },
          { label: product.name, tone: product.accent },
          { label: "Evidence", tone: "verified" },
        ]}
        aside={
          <a
            href={product.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-[8px] border border-hairline bg-card px-4 py-2.5 font-mono text-[0.75rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            {product.repo.replace("https://", "")}
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        }
      />

      <Section id="definition">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <DefinitionBlock term={product.name} definition={product.definition} />
            <p className="mt-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {product.summary}
            </p>
            <Callout tone={product.accent} title="Boundary" className="mt-8 max-w-2xl">
              {product.boundary}
            </Callout>
          </div>
          <div>
            {specimen}
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {specimenNote}
            </p>
          </div>
        </div>
      </Section>

      <Section id="capabilities">
        <SectionHeading
          id="capabilities"
          eyebrow="Capabilities"
          title={`What ${product.name} does`}
          lead="Each capability exists to make one class of failure impossible to hide."
        />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {product.capabilities.map((capability) => (
            <div key={capability.title} className="bg-card p-5">
              <dt className="font-display text-[0.9375rem] font-medium text-foreground">
                {capability.title}
              </dt>
              <dd className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {capability.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="limits">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading
            id="limits"
            eyebrow="Explicit limits"
            title={`What ${product.name} does not do`}
            lead="Stated limits are part of the design. A component that could do everything could not be trusted to judge anything."
          />
          <ul className="space-y-px overflow-hidden rounded-[10px] border border-hairline bg-hairline">
            {product.nonCapabilities.map((item) => (
              <li key={item} className="flex items-center gap-3 bg-card px-5 py-4">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 shrink-0 rounded-[2px] border border-denied/60"
                />
                <span className="font-mono text-[0.8125rem] text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {children}

      <Section id="relationships">
        <SectionHeading
          id="relationships"
          eyebrow="Relationships"
          title="How this layer relates to the others"
          lead="Proof & State is one system of three independent layers. Each holds authority the others do not."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2">
          {others.map((other) => (
            <Link
              key={other.key}
              to={other.path}
              className="bg-card p-6 transition-colors hover:bg-secondary"
            >
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                {other.layer}
              </p>
              <p className="mt-3 font-display text-lg font-medium text-foreground">{other.name}</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {other.tagline}
              </p>
            </Link>
          ))}
        </div>
        <Container className="px-0">
          <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
            DoneState executes; it cannot verify itself. OpsTruth verifies read-only and never
            writes. AgentProof authorises consequential actions and signs receipts. The separation
            is the product.
          </p>
        </Container>
      </Section>

      <RelatedLinks
        links={[
          {
            label: "System topology",
            to: "/architecture",
            note: "Where this layer sits in the whole system.",
          },
          {
            label: "Trust by architecture",
            to: "/trust",
            note: "The commitments this layer implements.",
          },
          {
            label: "Quickstart",
            to: "/developers/quickstart",
            note: "Run the tooling against a real repository.",
          },
          { label: "Glossary", to: "/glossary", note: "Definitions for every term used here." },
        ]}
      />
    </>
  );
}
