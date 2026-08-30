import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, Prose, Section } from "@/components/ps/primitives";
import { CONTACT_EMAIL, GITHUB_URL } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const PATH = "/legal/terms";
const TITLE = "Terms";
const DESCRIPTION =
  "Terms of use for the Proof & State website, including the status of information published here and where software licensing actually lives.";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: PATH }),
    scripts: [
      breadcrumbLd([
        { name: "Legal", path: PATH },
        { name: "Terms", path: PATH },
      ]),
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms"
        lead="Terms of use for this website. Software licensing is governed by each repository, not by this page."
        crumbs={[{ label: "Terms", to: PATH }]}
      />

      <Section id="terms">
        <div className="max-w-2xl">
          <Callout tone="info" title="Scope">
            These terms cover use of the proofandstate.com website only. They do not grant or limit
            any software licence.
          </Callout>

          <Prose className="mt-10">
            <h2>Information on this site</h2>
            <p>
              Content here describes the design and intended behaviour of the Proof &amp; State
              layers. It is provided for information, without warranty of any kind, and may change
              as the software changes.
            </p>
            <p>
              Where this site and a repository disagree about behaviour, commands or file formats,
              the repository is authoritative.
            </p>

            <h2>Software licensing</h2>
            <p>
              DoneState, OpsTruth and AgentProof are distributed through their repositories at{" "}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="text-info underline underline-offset-4"
              >
                github.com/AyobamiH
              </a>
              . The licence file in each repository governs your use of that software. Nothing on
              this website modifies those terms.
            </p>

            <h2>No warranty and no service commitment</h2>
            <p>
              The software is provided as-is. No availability, fitness, certification or compliance
              commitment is made, and no hosted service is operated on your behalf. You remain
              responsible for the systems you point the tooling at and for the authority envelopes
              you declare.
            </p>

            <h2>Acceptable use</h2>
            <p>
              Do not use this website to attempt unauthorised access, to disrupt its availability,
              or to misrepresent the project&rsquo;s claims — in particular by asserting
              partnerships, certifications or endorsements that are not stated here.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms:{" "}
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
            Governing law, jurisdiction, legal entity name and registered address are deliberately
            omitted because none has been supplied. The project owner should add them, ideally with
            legal review, before treating this page as a binding agreement.
          </Callout>
        </div>
      </Section>

      <RelatedLinks
        links={[
          { label: "Privacy", to: "/legal/privacy", note: "How data is handled." },
          { label: "Open source", to: "/open-source", note: "Repositories and licensing." },
          { label: "Security", to: "/security", note: "Posture and disclosure." },
          { label: "Contact", to: "/contact", note: "Reach the project." },
        ]}
      />
    </>
  );
}
