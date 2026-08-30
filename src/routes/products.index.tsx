import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, RelatedLinks, CtaBand } from "@/components/ps/page-chrome";
import { DefinitionBlock, Section, SectionHeading, StateChip } from "@/components/ps/primitives";
import { ComparisonMatrix } from "@/components/ps/specimens";
import { ProductModules } from "@/components/ps/product-modules";
import { SystemDiagram } from "@/components/ps/system-diagram";
import { LAYER_MATRIX, PRODUCTS } from "@/content/products";
import { GITHUB_URL, SITE_URL, SYSTEM_DEFINITION } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

const TITLE = "Products — three independent accountability layers";
const DESCRIPTION =
  "How DoneState, OpsTruth and AgentProof relate: durable execution under declared authority, independent read-only verification, and signed receipts for consequential actions.";

export const Route = createFileRoute("/products/")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/products" }),
    scripts: [
      breadcrumbLd([{ name: "Products", path: "/products" }]),
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
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="One system. Independent layers."
        lead="Proof & State is not three tools that happen to ship together. Each layer holds authority the others deliberately lack, and that asymmetry is what makes the evidence worth anything."
        crumbs={[{ label: "Products", to: "/products" }]}
        rail={[
          { label: "Execution", tone: "exec" },
          { label: "Authorisation", tone: "info" },
          { label: "Verification", tone: "verified" },
        ]}
      />

      <Section id="definition">
        <DefinitionBlock term="Proof & State" definition={SYSTEM_DEFINITION} />
        <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <Link
              key={product.key}
              to={product.path}
              className="bg-card p-6 transition-colors hover:bg-secondary"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {product.layer}
                </span>
                <StateChip tone={product.accent} dot={false}>
                  {product.stateBadge}
                </StateChip>
              </div>
              <p className="mt-4 font-display text-xl font-medium text-foreground">
                {product.name}
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
                {product.tagline}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="comparison">
        <SectionHeading
          id="comparison"
          eyebrow="Comparison"
          title="What each layer may and may not do"
          lead="Read this table as a permissions model. The empty cells are the point."
        />
        <div className="mt-10">
          <ComparisonMatrix
            label="Layer comparison"
            columns={["DoneState", "OpsTruth", "AgentProof"]}
            rows={LAYER_MATRIX.map((row) => ({
              dimension: row.dimension,
              values: [row.donestate, row.opstruth, row.agentproof],
            }))}
          />
        </div>
      </Section>

      <Section id="detail">
        <SectionHeading
          id="detail"
          eyebrow="In detail"
          title="Each layer, with the artefact it produces."
          lead="The specimens below show the shape of a run state, a verification report and a signed receipt."
        />
        <div className="mt-12">
          <ProductModules />
        </div>
      </Section>

      <Section id="topology">
        <SectionHeading
          id="topology"
          eyebrow="Topology"
          title="Where the boundary sits"
          lead="Execution may act. Verification may only observe. Nothing crosses the boundary in both directions."
        />
        <div className="mt-12">
          <SystemDiagram />
        </div>
      </Section>

      <RelatedLinks
        links={[
          {
            label: "Architecture",
            to: "/architecture",
            note: "The full topology and independence boundary.",
          },
          { label: "Trust", to: "/trust", note: "The commitments each layer enforces." },
          { label: "Developers", to: "/developers", note: "Install, run and inspect the tooling." },
          { label: "Glossary", to: "/glossary", note: "Precise definitions for every term." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Every claim on this site maps to something you can read in the source."
        primary={{ label: "Developer quickstart", to: "/developers/quickstart" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
