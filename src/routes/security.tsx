import { createFileRoute } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, KeyValueRows, Prose, Section, SectionHeading } from "@/components/ps/primitives";
import { GITHUB_URL, SECURITY_EMAIL } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Security | Posture and disclosure";
const DESCRIPTION =
  "Public security posture for Proof & State, including repository-owner review, inspection-only verification, credential control and vulnerability disclosure.";

const POSTURE = [
  {
    key: "Repository-owner review",
    value:
      "DoneState prepares reviewable repository changes and does not claim the final merge decision for itself.",
  },
  {
    key: "Inspection without mutation",
    value:
      "OpsTruth is designed to inspect software evidence without deploying, merging, publishing or restarting the system it checks.",
  },
  {
    key: "Credential control",
    value:
      "Operators remain responsible for repository access, secret storage and the credentials used in their own environments.",
  },
  {
    key: "Product maturity",
    value:
      "Security-relevant behaviour that is still planned, including AgentProof design goals, is not presented as already shipped.",
  },
  {
    key: "Public source",
    value:
      "Repositories and published releases can be inspected directly instead of relying only on security marketing copy.",
  },
  {
    key: "Private disclosure",
    value: `Vulnerability reports can be sent privately to ${SECURITY_EMAIL}.`,
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
        lead="This page describes public design and disclosure expectations. It does not claim a certification, audit or compliance attestation."
        crumbs={[{ label: "Security", to: "/security" }]}
      />

      <Section id="posture">
        <SectionHeading
          id="posture"
          eyebrow="Posture"
          title="Security properties users can understand"
          lead="Implementation detail stays in the source. The public site describes the practical consequence for the operator."
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
                You remain responsible for repository access, secret storage, network policy,
                dependency choices and the security of the systems the tools interact with.
              </p>
              <p>
                Reviewable automation reduces some operational risk; it does not remove the need to
                review access and changes in the context of your own environment.
              </p>
            </Prose>
            <Callout tone="risk" title="No compliance claims" className="mt-8">
              Proof &amp; State makes no SOC 2, ISO, HIPAA, PCI or GDPR compliance claim on this
              site. Nothing here should be treated as an audit result or certification.
            </Callout>
          </div>
        </div>
      </Section>

      <Section id="disclosure">
        <SectionHeading
          id="disclosure"
          eyebrow="Disclosure"
          title="Reporting a vulnerability"
          lead="Report privately first and include enough information to reproduce the issue."
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
            with the affected repository or component, the issue and reproduction steps.
          </p>
          <p>
            A private security advisory on the relevant GitHub repository is also appropriate where
            available.
          </p>
          <p>Proof &amp; State does not currently claim a paid bug bounty programme.</p>
        </div>
      </Section>

      <RelatedLinks
        links={[
          { label: "Trust", to: "/trust", note: "Public commitments and limits." },
          {
            label: "OpsTruth",
            to: "/products/opstruth",
            note: "Independent software evidence checks.",
          },
          { label: "Open source", to: "/open-source", note: "Repositories and releases." },
          { label: "Contact", to: "/contact", note: "Non-security enquiries." },
        ]}
      />

      <CtaBand
        title="Move faster. Keep the evidence."
        body="Security claims should be as bounded as the products they describe."
        primary={{ label: "Read the trust page", to: "/trust" }}
        secondary={{ label: "View source", href: GITHUB_URL }}
      />
    </>
  );
}
