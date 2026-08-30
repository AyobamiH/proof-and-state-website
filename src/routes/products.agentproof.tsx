import { createFileRoute } from "@tanstack/react-router";

import { ProductDetail } from "@/components/ps/product-detail";
import { Callout, Section, SectionHeading } from "@/components/ps/primitives";
import { AuthorityEnvelope, ReceiptSpecimen } from "@/components/ps/specimens";
import { PRODUCT_BY_KEY } from "@/content/products";
import { SITE_URL } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

const product = PRODUCT_BY_KEY.agentproof;
const PATH = "/products/agentproof";
const TITLE = "AgentProof — authorised transactions and signed receipts";

const DUTIES = [
  {
    role: "Proposer",
    detail:
      "Prepares the action and the exact state it would apply to. Holds no authority to execute.",
  },
  {
    role: "Authority",
    detail:
      "Grants a scoped, expiring envelope bound to that prepared state. Does not perform work.",
  },
  {
    role: "Executor",
    detail: "Applies the action exactly once, with idempotent recovery after interruption.",
  },
  {
    role: "Signer",
    detail: "Signs the receipt over the action, prepared state and authority reference.",
  },
  {
    role: "Verifier",
    detail: "Checks the receipt independently, without trusting the executor's account of events.",
  },
];

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
      specimen={<ReceiptSpecimen />}
      specimenNote="Illustrative receipt fields. The digest covers the action, the exact prepared state and the authority it was executed under."
    >
      <Section id="duties">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="duties"
              eyebrow="Separation of duties"
              title="Five roles that must not collapse into one."
              lead="A receipt is only meaningful if the party that proposed the action is not the party that authorised, executed, signed and verified it."
            />
            <Callout tone="info" title="Exactly once, or not at all" className="mt-8">
              Execution is bound to an idempotency key over the prepared state. An interrupted
              transaction resumes to a known outcome instead of repeating a consequential side
              effect.
            </Callout>
          </div>
          <ol className="space-y-px overflow-hidden rounded-[10px] border border-hairline bg-hairline">
            {DUTIES.map((duty, index) => (
              <li key={duty.role} className="flex gap-4 bg-card px-5 py-4">
                <span className="font-mono text-[0.6875rem] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-medium text-foreground">
                    {duty.role}
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {duty.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="authority">
        <SectionHeading
          id="authority"
          eyebrow="Authority"
          title="Approval is bound to exact prepared state."
          lead="An envelope that approves a category of action approves whatever is later placed in that category. AgentProof binds approval to the specific state it was granted against."
        />
        <div className="mt-10 max-w-2xl">
          <AuthorityEnvelope />
        </div>
      </Section>
    </ProductDetail>
  );
}
