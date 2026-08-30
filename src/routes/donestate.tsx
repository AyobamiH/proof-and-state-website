import { createFileRoute } from "@tanstack/react-router";

import { ProductDetail } from "@/components/ps/product-detail";
import { Callout, KeyValueRows, Section, SectionHeading } from "@/components/ps/primitives";
import { StateTimeline, Terminal } from "@/components/ps/specimens";
import { PRODUCT_BY_KEY } from "@/content/products";
import { DONESTATE_REVIEW_STATUS, SERVICE_URLS, SITE_URL } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

const product = PRODUCT_BY_KEY.donestate;
const PATH = "/donestate";
const TITLE = "DoneState — durable execution and control plane";

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
      specimen={<StateTimeline />}
      specimenNote="Illustrative run states. A run halts at AWAITING_VERIFICATION because DoneState has no authority to close itself."
    >
      <Section id="lifecycle">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="lifecycle"
              eyebrow="Lifecycle"
              title="A run is a durable object, not a session."
              lead="Admission, lease, budget and state transitions are recorded before, during and after the agent does anything. If the process dies, the record survives it."
            />
            <Callout tone="risk" title="The halt is deliberate" className="mt-8">
              DoneState stops at AWAITING_VERIFICATION and waits. There is no code path that lets a
              run mark itself complete, because a component cannot supply independent evidence about
              its own work.
            </Callout>
          </div>
          <Terminal
            label="run lifecycle"
            lines={[
              {
                kind: "cmd",
                text: "donestate run --outcome ./outcome.md --envelope ./authority.json",
              },
              { kind: "out", text: "ADMITTED       outcome fits declared envelope" },
              { kind: "out", text: "EXECUTING      lease held · budget 12/40 tool calls" },
              { kind: "out", text: "VALIDATING     local checks and build evidence gathered" },
              {
                kind: "out",
                text: "AWAITING_VERIFICATION  halted — independent attestation required",
              },
              { kind: "note", text: "# DoneState will not transition to VERIFIED on its own." },
            ]}
          />
        </div>
      </Section>

      <Section id="endpoints">
        <SectionHeading
          id="endpoints"
          eyebrow="Endpoints"
          title="Where DoneState runs"
          lead="These are the canonical addresses for the live service and its MCP endpoint. Any other hostname you may have seen is historical and is not canonical."
        />
        <div className="mt-10 max-w-3xl">
          <KeyValueRows
            rows={[
              { key: "Live service", value: SERVICE_URLS.donestate },
              { key: "MCP endpoint", value: SERVICE_URLS.donestateMcp },
              { key: "Source", value: product.repo },
              { key: "Distribution", value: DONESTATE_REVIEW_STATUS },
            ]}
          />
        </div>
        <Callout tone="unproven" title="Review is not approval" className="mt-8 max-w-3xl">
          {DONESTATE_REVIEW_STATUS} The current PR-only maintenance canary remains at
          AWAITING_VERIFICATION: the independent result is not yet in, so it is not described as
          verified.
        </Callout>
      </Section>
    </ProductDetail>
  );
}
