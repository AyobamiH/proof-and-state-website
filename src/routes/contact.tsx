import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Section, SectionHeading } from "@/components/ps/primitives";
import { CONTACT_EMAIL, GITHUB_URL, SECURITY_EMAIL } from "@/content/site";
import { breadcrumbLd, buildHead } from "@/lib/seo";

const TITLE = "Contact | Reach Proof & State";
const DESCRIPTION =
  "How to reach Proof & State for general enquiries, technical discussion and private vulnerability reports.";

const CHANNELS = [
  {
    label: "General enquiries",
    detail:
      "Questions about the products, current availability or where a Proof & State tool fits your workflow.",
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
    detail:
      "Bugs, feature discussion and implementation questions belong on the relevant repositories.",
    href: GITHUB_URL,
    value: "GitHub repositories",
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
        lead="Choose the channel that matches the question."
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
      </Section>

      <RelatedLinks
        links={[
          { label: "Products", to: "/products", note: "Current product overview." },
          { label: "Status", to: "/status", note: "Current availability and review state." },
          { label: "Security", to: "/security", note: "Disclosure process." },
          { label: "Open source", to: "/open-source", note: "Repositories and releases." },
        ]}
      />

      <CtaBand
        title="Move faster. Keep the evidence."
        body="Technical detail belongs in the repository. Product questions belong here."
        primary={{ label: "Explore products", to: "/products" }}
        secondary={{ label: "View source", href: GITHUB_URL }}
      />
    </>
  );
}
