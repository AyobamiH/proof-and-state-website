import { createFileRoute } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Section, SectionHeading } from "@/components/ps/primitives";
import { ProductModules } from "@/components/ps/product-modules";
import { ComparisonMatrix } from "@/components/ps/specimens";
import { LAYER_MATRIX, PRODUCTS } from "@/content/products";
import { GITHUB_URL, SITE_URL, SYSTEM_DEFINITION } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

const TITLE = "Products | Proof & State";
const DESCRIPTION =
  "Current Proof & State products: DoneState for reviewable repository maintenance, OpsTruth for independent software evidence checks, and AgentProof in development.";

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
        title="What exists today, and what comes next."
        lead={SYSTEM_DEFINITION}
        crumbs={[{ label: "Products", to: "/products" }]}
      />

      <Section id="overview">
        <SectionHeading
          id="overview"
          eyebrow="Overview"
          title="Different jobs, different maturity."
          lead="The site does not flatten live, publicly listed and in-development products into one generic availability claim."
        />
        <div className="mt-12">
          <ProductModules />
        </div>
      </Section>

      <Section id="comparison">
        <SectionHeading
          id="comparison"
          eyebrow="Comparison"
          title="Choose by the job you need done."
          lead="This table describes public use and current availability, not internal implementation roles."
        />
        <div className="mt-10">
          <ComparisonMatrix
            label="Product comparison"
            columns={["DoneState", "OpsTruth", "AgentProof"]}
            rows={LAYER_MATRIX.map((row) => ({
              dimension: row.dimension,
              values: [row.donestate, row.opstruth, row.agentproof],
            }))}
          />
        </div>
      </Section>

      <RelatedLinks
        links={[
          { label: "Trust", to: "/trust", note: "Public commitments and limits." },
          {
            label: "Open source",
            to: "/open-source",
            note: "Repositories and published releases.",
          },
          { label: "Status", to: "/status", note: "Current distribution status." },
          { label: "About", to: "/about", note: "Why Proof & State exists." },
        ]}
      />

      <CtaBand
        title="Move faster. Keep the evidence."
        body="Start with the product that matches the job you have today."
        primary={{ label: "View current status", to: "/status" }}
        secondary={{ label: "View source", href: GITHUB_URL }}
      />
    </>
  );
}
