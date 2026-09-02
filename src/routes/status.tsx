import { createFileRoute } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, KeyValueRows, Section, SectionHeading } from "@/components/ps/primitives";
import { PRODUCTS } from "@/content/products";
import {
  AGENTPROOF_STATUS,
  DONESTATE_REVIEW_STATUS,
  GITHUB_URL,
  OPSTRUTH_MARKETPLACE_URL,
  OPSTRUTH_STATUS,
  SERVICE_URLS,
  SITE_URL,
} from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Status | Current Proof & State product reality";
const DESCRIPTION =
  "Current public status for Proof & State, DoneState, OpsTruth and AgentProof. This is a product and distribution status page, not an uptime dashboard.";

const FACTS = [
  {
    key: "Proof & State website",
    value: `${SITE_URL} is the live public website. This page does not claim an uptime percentage or service-level commitment.`,
  },
  {
    key: "DoneState",
    value: `${SERVICE_URLS.donestate} and ${SERVICE_URLS.donestateMcp} are the owned public service addresses. ${DONESTATE_REVIEW_STATUS}`,
  },
  {
    key: "OpsTruth",
    value: `${SERVICE_URLS.opstruth} and ${SERVICE_URLS.opstruthMcp} are live public addresses. ${OPSTRUTH_STATUS} Marketplace: ${OPSTRUTH_MARKETPLACE_URL}`,
  },
  {
    key: "AgentProof",
    value: AGENTPROOF_STATUS,
  },
  {
    key: "Public release record",
    value: "OpsTruth GitHub Action v1.0.0 was published on 30 August 2026, with a stable v1 reference for compatible v1 updates.",
  },
  {
    key: "Availability reporting",
    value: "No uptime percentage or SLA is published here because this page is not backed by a public monitoring feed.",
  },
];

export const Route = createFileRoute("/status")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/status" }),
    scripts: [breadcrumbLd([{ name: "Status", path: "/status" }])],
  }),
  component: StatusPage,
});

function StatusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Status"
        title="Current product reality"
        lead="This page separates live services, public marketplace availability, external review and in-development work."
        crumbs={[{ label: "Status", to: "/status" }]}
        badge={{ tone: "verified", label: "source checked" }}
      />

      <Section id="facts">
        <Callout tone="info" title="Product status, not uptime telemetry" className="max-w-3xl">
          The entries below describe public product and distribution state. They should not be read as availability guarantees.
        </Callout>
        <div className="mt-10 max-w-4xl"><KeyValueRows rows={FACTS} /></div>
      </Section>

      <Section id="repositories">
        <SectionHeading
          id="repositories"
          eyebrow="Source"
          title="Check each product at its repository"
          lead="Repository releases and current source remain the best place to verify implementation details."
        />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li key={product.key} className="bg-card p-6">
              <p className="font-display text-lg font-medium text-foreground">{product.name}</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">{product.role}</p>
              <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">{product.stateBadge}</p>
              <a href={product.repo} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block font-mono text-[0.75rem] text-info underline underline-offset-4">View repository</a>
            </li>
          ))}
        </ul>
      </Section>

      <RelatedLinks
        links={[
          { label: "Changelog", to: "/changelog", note: "Verified public release entries." },
          { label: "Open source", to: "/open-source", note: "Repositories and distribution." },
          { label: "Security", to: "/security", note: "Security posture and disclosure." },
          { label: "Contact", to: "/contact", note: "Ask about current state." },
        ]}
      />

      <CtaBand
        title="Move faster. Keep the evidence."
        body="If the status changes, this page should change with it."
        primary={{ label: "View the changelog", to: "/changelog" }}
        secondary={{ label: "View source", href: GITHUB_URL }}
      />
    </>
  );
}
