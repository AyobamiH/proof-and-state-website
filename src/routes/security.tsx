import { createFileRoute } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, KeyValueRows, Prose, Section, SectionHeading } from "@/components/ps/primitives";
import { GITHUB_URL, SECURITY_EMAIL } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Security — posture, boundaries and disclosure";
const DESCRIPTION =
  "The security posture of Proof & State: read-only verification, least-authority envelopes, PR-first remote mutation, exactly-once execution, and how to report a vulnerability.";

const POSTURE = [
  {
    key: "Read-only verification",
    value:
      "OpsTruth holds no write authority over the systems it inspects. It does not deploy, mutate databases, publish, or restart services.",
  },
  {
    key: "Least authority",
    value:
      "Every component is granted the narrowest scope that lets it do its job, with explicit denials declared before admission.",
  },
  {
    key: "PR-first remote mutation",
    value:
      "Changes to remote systems are proposed as reviewable artefacts rather than applied directly wherever the workflow allows it.",
  },
  {
    key: "Exactly-once execution",
    value:
      "Consequential actions are keyed for idempotency so an interrupted transaction does not repeat a side effect on recovery.",
  },
  {
    key: "Signed receipts",
    value:
      "Consequential actions produce a receipt bound to the exact prepared state and the authority it was executed under.",
  },
  {
    key: "Secret handling",
    value:
      "Credentials are supplied by the operator through their own environment. The tooling does not require credentials for capabilities it does not have.",
  },
];

export const Route = createFileRoute("/security")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/security" }),
    scripts: [breadcrumbLd([{ name: "Security", path: "/security" }])],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Security"
        title="Security posture"
        lead="This page describes how the system is designed and how to reach us about a vulnerability. It does not claim certifications, audits or compliance attestations, because none have been performed."
        crumbs={[{ label: "Security", to: "/security" }]}
        rail={[
          { label: "Least authority", tone: "info" },
          { label: "No write path", tone: "verified" },
          { label: "Signed effects", tone: "exec" },
        ]}
      />

      <Section id="posture">
        <SectionHeading
          id="posture"
          eyebrow="Posture"
          title="Design properties relevant to security"
          lead="These are architectural facts about how the layers are built, not guarantees about your deployment of them."
        />
        <div className="mt-10 max-w-3xl">
          <KeyValueRows rows={POSTURE} />
        </div>
      </Section>

      <Section id="scope">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading
            id="scope"
            eyebrow="Operator responsibilities"
            title="What remains yours"
          />
          <div>
            <Prose>
              <p>
                The tooling runs in your environment, against your repositories, with credentials
                you control. Access management, secret storage, network policy and the security of
                the systems being inspected remain your responsibility.
              </p>
              <p>
                Authority envelopes are only as narrow as you declare them. The system enforces the
                envelope you write; it cannot infer a safer one on your behalf.
              </p>
            </Prose>
            <Callout tone="risk" title="No compliance claims" className="mt-8">
              Proof &amp; State makes no SOC 2, ISO, HIPAA, PCI or GDPR compliance claims. Nothing
              on this site should be treated as an audit result or a certification.
            </Callout>
          </div>
        </div>
      </Section>

      <Section id="disclosure">
        <SectionHeading
          id="disclosure"
          eyebrow="Disclosure"
          title="Reporting a vulnerability"
          lead="Report privately first. Please give us a reasonable window to respond before publishing details."
        />
        <div className="mt-8 max-w-2xl space-y-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
          <p>
            Email{" "}
            <a
              href={`mailto:${SECURITY_EMAIL}`}
              className="font-mono text-info underline underline-offset-4"
            >
              {SECURITY_EMAIL}
            </a>{" "}
            with a description of the issue, the affected repository or component, and steps to
            reproduce it.
          </p>
          <p>
            Alternatively, open a private security advisory on the relevant repository under{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-info underline underline-offset-4"
            >
              github.com/AyobamiH
            </a>
            .
          </p>
          <p>
            We do not currently operate a paid bug bounty programme. We will acknowledge reports and
            credit reporters who want credit.
          </p>
        </div>
      </Section>

      <RelatedLinks
        links={[
          { label: "Trust", to: "/trust", note: "Commitments enforced by architecture." },
          {
            label: "Authority model",
            to: "/architecture/authority-model",
            note: "Envelopes and denials.",
          },
          { label: "OpsTruth", to: "/products/opstruth", note: "The read-only verifier." },
          { label: "Contact", to: "/contact", note: "Non-security enquiries." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Narrow authority is the security control that survives autonomy."
        primary={{ label: "Read the architecture", to: "/architecture" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
