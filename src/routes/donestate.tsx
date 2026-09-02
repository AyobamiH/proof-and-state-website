import { createFileRoute } from "@tanstack/react-router";

import { ProductDetail } from "@/components/ps/product-detail";
import {
  Callout,
  KeyValueRows,
  Section,
  SectionHeading,
  StateChip,
} from "@/components/ps/primitives";
import { PRODUCT_BY_KEY } from "@/content/products";
import { DONESTATE_REVIEW_STATUS, SERVICE_URLS, SITE_URL } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

const product = PRODUCT_BY_KEY.donestate;
const PATH = "/donestate";
const TITLE = "DoneState | Reviewable repository maintenance";

const WORKFLOW = [
  "Choose a maintenance goal for a selected repository",
  "Prepare changes on a reviewable branch",
  "Run the project checks that fit the repository",
  "Open a pull request with the proposed change",
  "Leave the final merge decision with the repository owner",
] as const;

export const Route = createFileRoute("/donestate")({
  head: () => ({
    ...buildHead({ title: TITLE, description: product.definition, path: PATH }),
    scripts: [
      breadcrumbLd([
        { name: "Products", path: "/products" },
        { name: "DoneState", path: PATH },
      ]),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: "DoneState",
        description: product.definition,
        url: `${SITE_URL}${PATH}`,
        codeRepository: product.repo,
        programmingLanguage: "TypeScript",
        isPartOf: { "@type": "SoftwareApplication", name: "Proof & State", url: SITE_URL },
      }),
    ],
  }),
  component: DoneStatePage,
});

function DoneStatePage() {
  return (
    <ProductDetail
      product={product}
      specimen={
        <div className="rounded-[10px] border border-hairline bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-eyebrow">Public workflow</p>
            <StateChip tone="exec">Live</StateChip>
          </div>
          <ol className="mt-5 space-y-3">
            {WORKFLOW.map((step, index) => (
              <li
                key={step}
                className="flex gap-3 text-[0.8125rem] leading-relaxed text-muted-foreground"
              >
                <span className="font-mono text-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      }
      specimenNote="This is the public workflow, not an internal runtime state diagram."
    >
      <Section id="availability">
        <SectionHeading
          id="availability"
          eyebrow="Availability"
          title="Live service, external listings still in review"
          lead="The live service and external marketplace review states are separate facts."
        />
        <div className="mt-10 max-w-3xl">
          <KeyValueRows
            rows={[
              { key: "Live service", value: SERVICE_URLS.donestate },
              { key: "MCP endpoint", value: SERVICE_URLS.donestateMcp },
              { key: "Source", value: product.repo },
              { key: "Distribution status", value: DONESTATE_REVIEW_STATUS },
            ]}
          />
        </div>
        <Callout
          tone="unproven"
          title="External review is not publication"
          className="mt-8 max-w-3xl"
        >
          DoneState 0.2.0 remains in OpenAI review and the GitHub Marketplace listing is also under
          review. The site does not describe either review as approval or public listing.
        </Callout>
      </Section>
    </ProductDetail>
  );
}
