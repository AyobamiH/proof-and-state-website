import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, KeyValueRows, Section, SectionHeading } from "@/components/ps/primitives";
import { DONESTATE_REVIEW_STATUS, GITHUB_URL, SERVICE_URLS } from "@/content/site";
import { PRODUCTS } from "@/content/products";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Status — what is actually known";
const DESCRIPTION =
  "Honest status for Proof & State: this page explains system and release status rather than reporting live uptime, because no monitored hosted service is operated on your behalf.";

const FACTS = [
  {
    key: "DoneState live service",
    value: `${SERVICE_URLS.donestate} with an MCP endpoint at ${SERVICE_URLS.donestateMcp}. No availability figures are published for it.`,
  },
  {
    key: "OpsTruth",
    value: `${SERVICE_URLS.opstruth} with an MCP endpoint at ${SERVICE_URLS.opstruthMcp}. The verifier itself runs in your environment via npx opstruth.`,
  },
  {
    key: "DoneState 0.2.0",
    value: `${DONESTATE_REVIEW_STATUS} Review status is not an approval, a listing or an availability commitment.`,
  },
  {
    key: "Maintenance canary",
    value:
      "The current PR-only maintenance canary is AWAITING_VERIFICATION. The independent result is uncertain, so it is not reported as verified.",
  },
  {
    key: "Managed operation",
    value:
      "None. The tooling runs in your environment, against your repositories, under your credentials.",
  },
  {
    key: "Uptime reporting",
    value:
      "Not applicable. There is no monitored service endpoint to report availability for, so no figures are published.",
  },
  {
    key: "Release status",
    value:
      "No releases have been recorded on the changelog. The repositories are the authoritative record of current state.",
  },
  {
    key: "This website",
    value: "A static site. If you can read this page, it is serving.",
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
        title="What is actually known"
        lead="A status page that invents green ticks is exactly the failure mode this project exists to argue against. Here is what can honestly be said."
        crumbs={[{ label: "Status", to: "/status" }]}
        badge={{ tone: "unproven", label: "no live telemetry" }}
      />

      <Section id="facts">
        <Callout tone="unproven" title="This is not a live uptime dashboard" className="max-w-3xl">
          No metrics on this page are collected from monitoring. Nothing here should be read as an
          availability commitment or a service-level statement.
        </Callout>
        <div className="mt-10 max-w-3xl">
          <KeyValueRows rows={FACTS} />
        </div>
      </Section>

      <Section id="layers">
        <SectionHeading
          id="layers"
          eyebrow="Layers"
          title="Where to check each layer"
          lead="Commits, issues and tags in each repository describe real state better than any summary here could."
        />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li key={product.key} className="bg-card p-6">
              <p className="font-display text-lg font-medium text-foreground">{product.name}</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {product.role}
              </p>
              <a
                href={product.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-block font-mono text-[0.75rem] text-info underline underline-offset-4"
              >
                {product.repo.replace("https://", "")}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-[0.875rem] leading-relaxed text-muted-foreground">
          If a hosted component is ever operated, this page will carry real monitoring data and say
          where it comes from. Until then see the{" "}
          <Link to="/changelog" className="text-info underline underline-offset-4">
            changelog
          </Link>
          .
        </p>
      </Section>

      <RelatedLinks
        links={[
          { label: "Changelog", to: "/changelog", note: "Release record." },
          { label: "Open source", to: "/open-source", note: "Repositories and distribution." },
          { label: "Security", to: "/security", note: "Posture and disclosure." },
          { label: "Contact", to: "/contact", note: "Ask about current state." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="An honest unknown is more useful than a confident green tick."
        primary={{ label: "Read the principles", to: "/principles" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
