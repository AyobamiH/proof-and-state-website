import { createFileRoute } from "@tanstack/react-router";

import { ProductDetail } from "@/components/ps/product-detail";
import { Callout, KeyValueRows, Section, SectionHeading } from "@/components/ps/primitives";
import { Terminal, VerificationMatrix } from "@/components/ps/specimens";
import { PRODUCT_BY_KEY } from "@/content/products";
import { SERVICE_URLS, SITE_URL } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

const product = PRODUCT_BY_KEY.opstruth;
const PATH = "/products/opstruth";
const TITLE = "OpsTruth — independent read-only verifier";

const SURFACES = [
  {
    surface: "Repository",
    detail: "Tracked files, tree state and the exact commit under inspection.",
  },
  { surface: "Stack", detail: "Declared dependencies, lockfiles and runtime versions." },
  { surface: "Tests", detail: "Presence, execution and recorded outcome of the suite." },
  { surface: "Build", detail: "Whether the artefact reproduces from the source tree." },
  { surface: "CI", detail: "Pipeline configuration and recorded run evidence." },
  { surface: "Secrets", detail: "Credential material exposed in tracked files or config." },
  { surface: "Config", detail: "Environment expectations against what is actually declared." },
  { surface: "Routes", detail: "Whether declared routes exist and respond as claimed." },
  { surface: "Runtime", detail: "Observable behaviour of the running system." },
  { surface: "Deployment", detail: "Whether a deployed artefact corresponds to the commit." },
];

export const Route = createFileRoute("/products/opstruth")({
  head: () => ({
    ...buildHead({ title: TITLE, description: product.definition, path: PATH }),
    scripts: [
      breadcrumbLd([
        { name: "Products", path: "/products" },
        { name: "OpsTruth", path: PATH },
      ]),
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
      specimen={<VerificationMatrix />}
      specimenNote="Illustrative report rows. Every check resolves to Verified, Risky or Unproven — never to a summary judgement."
    >
      <Section id="surfaces">
        <SectionHeading
          id="surfaces"
          eyebrow="Evidence surfaces"
          title="What OpsTruth inspects"
          lead="Each surface is read at an exact commit or against the observable running system. Nothing is inferred from what the agent said it did."
        />
        <dl className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
          {SURFACES.map((item) => (
            <div key={item.surface} className="bg-card p-5">
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                {item.surface}
              </dt>
              <dd className="mt-2 text-[0.8125rem] leading-relaxed text-foreground">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="classification">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="classification"
              eyebrow="Classification"
              title="Verified, Risky, Unproven — and nothing else."
              lead="Absence of evidence is reported as absence of evidence. Unproven is a first-class result, not a soft pass."
            />
            <Callout tone="verified" title="Read-only by construction" className="mt-8">
              OpsTruth does not deploy, mutate databases, publish artefacts, restart services or
              perform any write action. It holds no credentials that would let it change the system
              it judges, which is precisely why its judgement carries weight.
            </Callout>
          </div>
          <Terminal
            label="opstruth report"
            lines={[
              { kind: "cmd", text: "npx opstruth" },
              { kind: "out", text: "commit 9f2c41a · read-only inspection" },
              { kind: "out", text: "VERIFIED  build reproduces at commit" },
              { kind: "out", text: "VERIFIED  test suite executed" },
              { kind: "out", text: "RISKY     declared route returns error status" },
              { kind: "out", text: "UNPROVEN  no deployment evidence available" },
              {
                kind: "note",
                text: "# no writes performed · no credentials required for mutation",
              },
            ]}
          />
        </div>
      </Section>

      <Section id="endpoints">
        <SectionHeading
          id="endpoints"
          eyebrow="Endpoints"
          title="Where OpsTruth lives"
          lead="Canonical addresses for the OpsTruth website and its MCP endpoint. Other hostnames you may have seen are historical and are not canonical."
        />
        <div className="mt-10 max-w-3xl">
          <KeyValueRows
            rows={[
              { key: "Website", value: SERVICE_URLS.opstruth },
              { key: "MCP endpoint", value: SERVICE_URLS.opstruthMcp },
              { key: "Source", value: product.repo },
              { key: "Command", value: "npx opstruth" },
            ]}
          />
        </div>
      </Section>
    </ProductDetail>
  );
}
