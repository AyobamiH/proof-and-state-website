import { createFileRoute } from "@tanstack/react-router";

import { ProductDetail } from "@/components/ps/product-detail";
import { Callout, KeyValueRows, Section, SectionHeading, StateChip } from "@/components/ps/primitives";
import { PRODUCT_BY_KEY } from "@/content/products";
import { OPSTRUTH_MARKETPLACE_URL, OPSTRUTH_STATUS, SERVICE_URLS, SITE_URL } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

const product = PRODUCT_BY_KEY.opstruth;
const PATH = "/products/opstruth";
const TITLE = "OpsTruth | Independent software evidence checks";

const SURFACES = [
  { surface: "Repository", detail: "Source and repository evidence for the version being reviewed." },
  { surface: "Tests", detail: "Available evidence that project tests were run and what they reported." },
  { surface: "Build", detail: "Evidence that the project can be built from the reviewed source." },
  { surface: "CI", detail: "Available continuous-integration configuration and results." },
  { surface: "Runtime", detail: "Observable behaviour when a running surface is available to inspect." },
  { surface: "Deployment", detail: "Available evidence connecting a deployed surface to the software claim." },
];

export const Route = createFileRoute("/products/opstruth")({
  head: () => ({
    ...buildHead({ title: TITLE, description: product.definition, path: PATH }),
    scripts: [
      breadcrumbLd([{ name: "Products", path: "/products" }, { name: "OpsTruth", path: PATH }]),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: "OpsTruth",
        description: product.definition,
        url: `${SITE_URL}${PATH}`,
        codeRepository: product.repo,
        programmingLanguage: "TypeScript",
        isPartOf: { "@type": "SoftwareApplication", name: "Proof & State", url: SITE_URL },
      }),
    ],
  }),
  component: OpsTruthPage,
});

function OpsTruthPage() {
  return (
    <ProductDetail
      product={product}
      specimen={
        <div className="rounded-[10px] border border-hairline bg-card p-5">
          <div className="flex items-center justify-between gap-4"><p className="text-eyebrow">Public availability</p><StateChip tone="verified">Available</StateChip></div>
          <p className="mt-4 text-[0.875rem] leading-relaxed text-muted-foreground">{OPSTRUTH_STATUS}</p>
        </div>
      }
      specimenNote="Public distribution status, not an internal checker status."
    >
      <Section id="checks">
        <SectionHeading
          id="checks"
          eyebrow="Evidence checks"
          title="What OpsTruth can inspect"
          lead="OpsTruth reads available software evidence and reports what it can support without repairing or deploying the system being checked."
        />
        <dl className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {SURFACES.map((item) => (
            <div key={item.surface} className="bg-card p-5">
              <dt className="font-display text-[0.9375rem] font-medium text-foreground">{item.surface}</dt>
              <dd className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">{item.detail}</dd>
            </div>
          ))}
        </dl>
        <Callout tone="verified" title="Inspection without mutation" className="mt-8 max-w-3xl">
          OpsTruth is designed to inspect and report. It does not deploy, merge, publish or restart the system it is checking.
        </Callout>
      </Section>

      <Section id="availability">
        <SectionHeading
          id="availability"
          eyebrow="Availability"
          title="Publicly listed on GitHub Marketplace"
          lead="The GitHub Action is public, and the owned website and MCP endpoint are live."
        />
        <div className="mt-10 max-w-3xl">
          <KeyValueRows
            rows={[
              { key: "Website", value: SERVICE_URLS.opstruth },
              { key: "MCP endpoint", value: SERVICE_URLS.opstruthMcp },
              { key: "GitHub Marketplace", value: OPSTRUTH_MARKETPLACE_URL },
              { key: "Source", value: product.repo },
              { key: "Action release", value: "v1.0.0 with stable v1 reference" },
            ]}
          />
        </div>
      </Section>
    </ProductDetail>
  );
}
