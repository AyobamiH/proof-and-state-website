import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Section, SectionHeading } from "@/components/ps/primitives";
import { CONTACT_EMAIL, GITHUB_URL, SECURITY_EMAIL } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Contact — reach the project";
const DESCRIPTION =
  "How to reach Proof & State: general enquiries by email, technical discussion through GitHub issues, and private vulnerability reports through the security address.";

const CHANNELS = [
  {
    label: "General enquiries",
    detail: "Questions about the system, the roadmap or how the layers fit a specific workflow.",
    href: `mailto:${CONTACT_EMAIL}`,
    value: CONTACT_EMAIL,
  },
  {
    label: "Security reports",
    detail: "Vulnerabilities and disclosure. Please report privately before publishing details.",
    href: `mailto:${SECURITY_EMAIL}`,
    value: SECURITY_EMAIL,
  },
  {
    label: "Technical discussion",
    detail: "Bugs, feature discussion and design disagreement belong on the repositories.",
    href: GITHUB_URL,
    value: "github.com/AyobamiH",
    external: true,
  },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/contact" }),
    scripts: [breadcrumbLd([{ name: "Contact", path: "/contact" }])],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Reach the project"
        lead="No contact form, no lead capture. Three addresses, each for a different kind of message."
        crumbs={[{ label: "Contact", to: "/contact" }]}
      />

      <Section id="channels">
        <SectionHeading id="channels" eyebrow="Channels" title="Where to send what" />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          {CHANNELS.map((channel) => (
            <li key={channel.label} className="bg-card p-6">
              <p className="font-display text-lg font-medium text-foreground">{channel.label}</p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
                {channel.detail}
              </p>
              <a
                href={channel.href}
                {...(channel.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.8125rem] text-info underline underline-offset-4"
              >
                {channel.value}
                {channel.external ? (
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                ) : null}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-[0.875rem] leading-relaxed text-muted-foreground">
          Response times are not guaranteed. This is an independently developed project rather than
          a commercially supported service, and pretending otherwise would be its own kind of
          unverified claim.
        </p>
      </Section>

      <RelatedLinks
        links={[
          { label: "Security", to: "/security", note: "Disclosure process in full." },
          { label: "Open source", to: "/open-source", note: "Issues and pull requests." },
          { label: "About", to: "/about", note: "What this project is." },
          { label: "Documentation", to: "/docs", note: "Answers before you email." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Design disagreement is welcome, ideally in public on a repository."
        primary={{ label: "Open source", to: "/open-source" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
