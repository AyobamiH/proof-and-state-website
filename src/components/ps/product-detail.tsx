import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageHeader, RelatedLinks, type Crumb } from "@/components/ps/page-chrome";
import { Callout, Section, SectionHeading } from "@/components/ps/primitives";
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
  children?: React.ReactNode;
}) {
  const crumbs: Crumb[] = [
    { label: "Products", to: "/products" },
    { label: product.name, to: product.path },
  ];
  const others = PRODUCTS.filter((entry) => entry.key !== product.key);
  const capabilityTitle =
    product.key === "agentproof" ? "What AgentProof is designed to offer" : `What ${product.name} offers`;

  return (
    <>
      <PageHeader
        eyebrow={product.role}
        title={product.name}
        lead={product.tagline}
        crumbs={crumbs}
        badge={{ tone: product.accent, label: product.stateBadge }}
        aside={
          <a
            href={product.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-[8px] border border-hairline bg-card px-4 py-2.5 font-mono text-[0.75rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            View source
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        }
      />

      <Section id="definition">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-foreground">{product.definition}</p>
            <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{product.summary}</p>
            <Callout tone={product.accent} title="What to expect" className="mt-8 max-w-2xl">
              {product.boundary}
            </Callout>
          </div>
          <div>
            {specimen}
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">{specimenNote}</p>
          </div>
        </div>
      </Section>

      <Section id="capabilities">
        <SectionHeading
          id="capabilities"
          eyebrow={product.key === "agentproof" ? "Design goals" : "Capabilities"}
          title={capabilityTitle}
          lead={
            product.key === "agentproof"
              ? "These are current design goals, not claims about a generally available runtime."
              : "Publicly described behaviour is kept separate from implementation details."
          }
        />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {product.capabilities.map((capability) => (
            <div key={capability.title} className="bg-card p-5">
              <dt className="font-display text-[0.9375rem] font-medium text-foreground">{capability.title}</dt>
              <dd className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">{capability.detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="limits">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading
            id="limits"
            eyebrow="Current limits"
            title={`What ${product.name} is not claiming`}
            lead="Product limits and maturity are part of the public description, not footnotes."
          />
          <ul className="space-y-px overflow-hidden rounded-[10px] border border-hairline bg-hairline">
            {product.nonCapabilities.map((item) => (
              <li key={item} className="flex items-center gap-3 bg-card px-5 py-4">
                <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-[2px] border border-hairline-strong" />
                <span className="text-[0.875rem] text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {children}

      <Section id="relationships">
        <SectionHeading
          id="relationships"
          eyebrow="Product family"
          title="How the products fit together"
          lead="Each product has a distinct job, and their maturity is stated independently."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2">
          {others.map((other) => (
            <Link key={other.key} to={other.path} className="bg-card p-6 transition-colors hover:bg-secondary">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">{other.stateBadge}</p>
              <p className="mt-3 font-display text-lg font-medium text-foreground">{other.name}</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">{other.tagline}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
          DoneState prepares reviewable repository maintenance. OpsTruth checks software evidence independently. AgentProof is the future signed-evidence component and remains in development.
        </p>
      </Section>

      <RelatedLinks
        links={[
          { label: "Products", to: "/products", note: "Current product family and availability." },
          { label: "Trust", to: "/trust", note: "Public commitments and limits." },
          { label: "Open source", to: "/open-source", note: "Repositories and releases." },
          { label: "Status", to: "/status", note: "Current product status." },
        ]}
      />
    </>
  );
}
