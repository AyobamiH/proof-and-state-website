import { createFileRoute } from "@tanstack/react-router";

import { CtaBand, PageHeader, RelatedLinks } from "@/components/ps/page-chrome";
import { Callout, Prose, Section, SectionHeading } from "@/components/ps/primitives";
import { Terminal, VerificationMatrix } from "@/components/ps/specimens";
import { GITHUB_URL, SITE_URL } from "@/content/site";
import { breadcrumbLd, buildHead, jsonLd } from "@/lib/seo";

const PATH = "/developers/quickstart";
const TITLE = "Quickstart — your first independently verified run";
const DESCRIPTION =
  "Run the OpsTruth read-only verifier against a repository, read a Verified / Risky / Unproven report, then add DoneState so runs halt for independent attestation instead of self-completing.";

const STEPS = [
  {
    n: "01",
    title: "Verify something you already trust",
    body: "Start with a repository whose state you believe you understand. The useful signal is the gap between what you assume is proven and what can actually be evidenced.",
    terminal: {
      label: "step 01",
      lines: [
        { kind: "cmd" as const, text: "cd your-repository" },
        { kind: "cmd" as const, text: "npx opstruth" },
        {
          kind: "out" as const,
          text: "inspecting repo, stack, tests, build, CI, secrets, config, routes",
        },
      ],
    },
  },
  {
    n: "02",
    title: "Read the classification, not the score",
    body: "Every check resolves to Verified, Risky or Unproven. Unproven is not a failure — it means no evidence was available, which is a different problem from evidence of a fault.",
    terminal: {
      label: "step 02",
      lines: [
        { kind: "out" as const, text: "VERIFIED  build reproduces at commit" },
        { kind: "out" as const, text: "RISKY     declared route returns error status" },
        { kind: "out" as const, text: "UNPROVEN  no deployment evidence available" },
      ],
    },
  },
  {
    n: "03",
    title: "Put a run under durable control",
    body: "Install DoneState and give it an outcome plus an authority envelope. The run records durable transitions and halts at AWAITING_VERIFICATION rather than declaring itself complete.",
    terminal: {
      label: "step 03",
      lines: [
        { kind: "cmd" as const, text: "npm install -g donestate" },
        {
          kind: "cmd" as const,
          text: "donestate run --outcome ./outcome.md --envelope ./authority.json",
        },
        { kind: "out" as const, text: "AWAITING_VERIFICATION" },
      ],
    },
  },
  {
    n: "04",
    title: "Close the run with an attestation",
    body: "Verification is what moves a run to VERIFIED. Feed the verifier's report back as the attestation, and confirm that nothing inside the execution path could have produced it.",
    terminal: {
      label: "step 04",
      lines: [
        { kind: "cmd" as const, text: "npx opstruth --report ./report.json" },
        { kind: "cmd" as const, text: "donestate attest run/7c41 --report ./report.json" },
        { kind: "out" as const, text: "VERIFIED" },
      ],
    },
  },
];

export const Route = createFileRoute("/developers/quickstart")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: PATH, type: "article" }),
    scripts: [
      breadcrumbLd([
        { name: "Developers", path: "/developers" },
        { name: "Quickstart", path: PATH },
      ]),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}${PATH}`,
        articleSection: "Developers",
      }),
    ],
  }),
  component: QuickstartPage,
});

function QuickstartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Developers"
        title="Quickstart"
        lead="Four steps from an unverified repository to a run that cannot close itself. Nothing here requires a deployment, an account or write credentials."
        crumbs={[
          { label: "Developers", to: "/developers" },
          { label: "Quickstart", to: PATH },
        ]}
        rail={[
          { label: "Verify", tone: "verified" },
          { label: "Classify", tone: "info" },
          { label: "Execute", tone: "exec" },
          { label: "Attest", tone: "verified" },
        ]}
      />

      <Section id="prerequisites">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading id="prerequisites" eyebrow="Before you start" title="What you need" />
          <div>
            <Prose>
              <p>
                A local Node.js toolchain and a repository you can read. The verifier runs
                read-only, so it needs no write credentials and performs no deployment, database or
                restart actions.
              </p>
              <p>
                Exact command surfaces evolve with the repositories. Where this page and a
                repository&rsquo;s README disagree, the repository is authoritative.
              </p>
            </Prose>
            <Callout
              tone="info"
              title="Nothing is published that is not published"
              className="mt-8"
            >
              AgentProof is read from source. No npm publication is claimed for it on this site.
            </Callout>
          </div>
        </div>
      </Section>

      <Section id="steps">
        <SectionHeading id="steps" eyebrow="Steps" title="From unverified to attested" />
        <ol className="mt-12 space-y-10">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16"
            >
              <div>
                <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground">
                  {step.n}
                </p>
                <h3 className="mt-3 font-display text-xl font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
              <Terminal label={step.terminal.label} lines={step.terminal.lines} />
            </li>
          ))}
        </ol>
      </Section>

      <Section id="report">
        <SectionHeading
          id="report"
          eyebrow="What you get"
          title="A report you can argue with"
          lead="Rows, surfaces and classifications — not a confidence score."
        />
        <div className="mt-10 max-w-2xl">
          <VerificationMatrix />
        </div>
      </Section>

      <RelatedLinks
        links={[
          {
            label: "Integrations",
            to: "/developers/integrations",
            note: "Fit this into an existing workflow.",
          },
          { label: "State model", to: "/architecture/state-model", note: "Why the run halts." },
          { label: "OpsTruth", to: "/products/opstruth", note: "What the verifier can evidence." },
          { label: "Documentation", to: "/docs", note: "Reference index." },
        ]}
      />

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="If the report surprises you, that is the point of running it."
        primary={{ label: "Read the architecture", to: "/architecture" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
