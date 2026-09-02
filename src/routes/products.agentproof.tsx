import { createFileRoute } from "@tanstack/react-router";

import { ProductDetail } from "@/components/ps/product-detail";
import { Callout, Section, SectionHeading, StateChip } from "@/components/ps/primitives";
import { PRODUCT_BY_KEY } from "@/content/products";
import { AGENTPROOF_STATUS, SITE_URL } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

const product = PRODUCT_BY_KEY.agentproof;
const PATH = "/products/agentproof";
const TITLE = "AgentProof | In development";

export const Route = createFileRoute("/products/agentproof")({
  head: () => ({
    ...buildHead({ title: TITLE, description: product.definition, path: PATH }),
    scripts: [
      breadcrumbLd([
        { name: "Products", path: "/products" },
        { name: "AgentProof", path: PATH },
      ]),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: "AgentProof",
        description: product.definition,
        url: `${SITE_URL}${PATH}`,
        codeRepository: product.repo,
        programmingLanguage: "TypeScript",
        isPartOf: { "@type": "SoftwareApplication", name: "Proof & State", url: SITE_URL },
      }),
    ],
  }),
  component: AgentProofPage,
});

function AgentProofPage() {
  return (
    <ProductDetail
      product={product}
      specimen={
        <div className="rounded-[10px] border border-hairline bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-eyebrow">Current status</p>
            <StateChip tone="info">In development</StateChip>
          </div>
          <p className="mt-4 text-[0.875rem] leading-relaxed text-muted-foreground">
            {AGENTPROOF_STATUS}
          </p>
        </div>
      }
      specimenNote="This page separates design goals from shipped behaviour."
    >
      <Section id="status">
        <SectionHeading
          id="status"
          eyebrow="Current status"
          title="A defined direction, not a released product"
          lead="AgentProof has a defined contract and purpose. Downstream release work remains, so the site does not present its design goals as production guarantees."
        />
        <Callout tone="unproven" title="In development" className="mt-8 max-w-3xl">
          No general-availability, marketplace or production-runtime claim is being made for
          AgentProof today. When that changes, the status page and release record should change with
          it.
        </Callout>
      </Section>
    </ProductDetail>
  );
}
