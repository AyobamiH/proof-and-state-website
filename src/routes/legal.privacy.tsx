import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, Prose, Section } from "@/components/ps/primitives";
import { CONTACT_EMAIL } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const PATH = "/legal/privacy";
const TITLE = "Privacy";
const DESCRIPTION =
  "Privacy notice for the Proof & State website: what this site collects, what the tooling does with your data, and how to contact the project about privacy.";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: PATH }),
    scripts: [
      breadcrumbLd([
        { name: "Legal", path: PATH },
        { name: "Privacy", path: PATH },
      ]),
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        lead="A short notice covering this website and the open-source tooling it describes."
        crumbs={[{ label: "Privacy", to: PATH }]}
      />

      <Section id="notice">
        <div className="max-w-2xl">
          <Callout tone="info" title="Scope">
            This notice covers the proofandstate.com website and the publicly available Proof &amp;
            State repositories. It is not legal advice, and it does not describe any hosted service,
            because none is operated.
          </Callout>

          <Prose className="mt-10">
            <h2>This website</h2>
            <p>
              The site is static content. It does not ask you to create an account, does not host a
              contact form, and does not sell or share personal data.
            </p>
            <p>
              If you visit the site, the hosting provider processes standard technical request
              information such as IP address and user agent in order to serve the page and to
              protect the service. This is ordinary web-server processing rather than a profile
              built about you.
            </p>

            <h2>The tooling</h2>
            <p>
              DoneState, OpsTruth and AgentProof run in your own environment, against your own
              repositories, with credentials you control. They do not transmit your source code or
              verification results to the project.
            </p>
            <p>
              Any data those tools read stays under your control and your organisation&rsquo;s own
              policies.
            </p>

            <h2>Email and GitHub</h2>
            <p>
              If you email the project, the message and address are processed to reply to you. If
              you open an issue or pull request, that activity is public on GitHub and governed by
              GitHub&rsquo;s own terms and privacy policy.
            </p>

            <h2>Changes and contact</h2>
            <p>
              If this notice changes materially, the updated version will replace this page. For
              privacy questions, email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-info underline underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Prose>

          <Callout tone="risk" title="Owner review required" className="mt-10">
            No legal entity name, registered address or jurisdiction is stated here because none has
            been supplied. Those details should be added by the project owner before relying on this
            page for compliance purposes.
          </Callout>
        </div>
      </Section>

      <RelatedLinks
        links={[
          { label: "Terms", to: "/legal/terms", note: "Terms of use for this site." },
          { label: "Security", to: "/security", note: "Posture and disclosure." },
          { label: "Trust", to: "/trust", note: "What we do and do not claim." },
          { label: "Contact", to: "/contact", note: "Reach the project." },
        ]}
      />
    </>
  );
}
