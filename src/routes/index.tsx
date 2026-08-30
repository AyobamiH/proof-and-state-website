import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { EvidenceRail } from "@/components/ps/evidence-rail";
import { CtaBand } from "@/components/ps/page-chrome";
import {
  Container,
  DefinitionBlock,
  Reveal,
  Section,
  SectionHeading,
  StateChip,
} from "@/components/ps/primitives";
import { ProductModules } from "@/components/ps/product-modules";
import {
  ReceiptSpecimen,
  StateTimeline,
  Terminal,
  VerificationMatrix,
} from "@/components/ps/specimens";
import { SystemDiagram } from "@/components/ps/system-diagram";
import { PRINCIPLES } from "@/content/principles";
import {
  GITHUB_URL,
  HARNESS_DISCLAIMER,
  HARNESS_TARGETS,
  SITE_URL,
  SYSTEM_DEFINITION,
  TRUST_STRIP,
} from "@/content/site";
import { PRODUCTS } from "@/content/products";
import { buildHead, jsonLd } from "@/lib/seo";

const TITLE = "Proof & State — Accountability infrastructure for autonomous engineering";
const DESCRIPTION =
  "Proof & State separates execution, verification and receipts so agent work can be proven: DoneState executes under declared authority, OpsTruth verifies read-only, AgentProof signs receipts.";

const PIPELINE = [
  { label: "Outcome", caption: "Prose objective from a human", tone: "unproven" as const },
  { label: "Authority", caption: "Scope, budget, expiry declared up front", tone: "info" as const },
  {
    label: "DoneState",
    caption: "Admission, lease, durable transitions",
    tone: "exec" as const,
    hash: "run/7c41",
  },
  {
    label: "AgentProof",
    caption: "Consequential action, signed receipt",
    tone: "info" as const,
    hash: "ap1:7c4e9d2b",
  },
  {
    label: "OpsTruth",
    caption: "Independent read-only inspection",
    tone: "verified" as const,
    hash: "report/2f19",
  },
  { label: "VERIFIED", caption: "Attestation closes the run state", tone: "verified" as const },
];

export const Route = createFileRoute("/")({
  head: () => ({
    ...buildHead({ title: TITLE, description: DESCRIPTION, path: "/" }),
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Proof & State layers",
        itemListElement: PRODUCTS.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: `${SITE_URL}${product.path}`,
          description: product.definition,
        })),
      }),
    ],
  }),
  component: HomePage,
});

function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-hairline bg-background">
      <div aria-hidden="true" className="rule-grid rule-fade absolute inset-0" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-eyebrow">AI work accountability</p>
              <StateChip tone="verified">independent verification</StateChip>
            </div>
            <h1 className="mt-6 text-balance text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
              Make agent work provable.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Give agents room to work without giving up control. Proof &amp; State separates
              execution, verification and receipts so done means something you can inspect.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex h-11 items-center rounded-[8px] bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore the system
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-1.5 rounded-[8px] border border-hairline bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                View on GitHub
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-9 max-w-xl border-l-2 border-hairline-strong pl-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {SYSTEM_DEFINITION}
            </p>
          </div>

          <div>
            <p className="text-eyebrow">Evidence rail</p>
            <EvidenceRail nodes={PIPELINE} className="mt-4 lg:grid-cols-2" />
            <p className="mt-3 font-mono text-[0.6875rem] text-muted-foreground">
              A run only reaches VERIFIED through a component that could not have caused it.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />

      <div className="border-b border-hairline bg-canvas">
        <Container>
          <ul className="grid divide-y divide-hairline sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {TRUST_STRIP.map((item) => (
              <li
                key={item.label}
                className="border-hairline py-6 sm:border-r sm:px-6 sm:first:pl-0 lg:last:border-r-0"
              >
                <Link to={item.to} className="group block">
                  <p className="font-display text-[0.9375rem] font-medium text-foreground group-hover:underline group-hover:underline-offset-4">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Section id="layers">
        <SectionHeading
          id="layers"
          eyebrow="One system. Independent layers."
          title="Three layers that refuse to vouch for each other."
          lead="DoneState executes under declared authority. AgentProof authorises consequential actions and signs receipts. OpsTruth verifies from outside the execution path. The separation is the product."
        />
        <div className="mt-12">
          <ProductModules />
        </div>
      </Section>

      <Section id="architecture">
        <SectionHeading
          id="architecture"
          eyebrow="Architecture"
          title="Execution on one side. Verification on the other."
          lead="A human objective and an authority envelope enter DoneState. Consequential effects emit AgentProof receipts. OpsTruth observes repository, CI and runtime evidence independently, and verification is what closes the state."
        />
        <div className="mt-12">
          <SystemDiagram />
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/architecture" className="text-sm text-info underline underline-offset-4">
            Full system topology
          </Link>
          <Link
            to="/architecture/state-model"
            className="text-sm text-info underline underline-offset-4"
          >
            Run state model
          </Link>
          <Link
            to="/architecture/authority-model"
            className="text-sm text-info underline underline-offset-4"
          >
            Authority model
          </Link>
        </div>
      </Section>

      <Section id="evidence">
        <SectionHeading
          id="evidence"
          eyebrow="Evidence"
          title="The agent can say it is done. Your system should prove it."
          lead="Every run produces inspectable artefacts: a classified verification report, a signed receipt digest and a durable state timeline you can read after the session is gone."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <VerificationMatrix />
          </Reveal>
          <Reveal delay={80}>
            <ReceiptSpecimen />
          </Reveal>
          <Reveal delay={160}>
            <StateTimeline />
          </Reveal>
        </div>
        <p className="mt-4 text-[0.8125rem] text-muted-foreground">
          Specimens show the shape of each artefact. They are illustrative, not records of real
          runs.
        </p>
      </Section>

      <Section id="ecosystem">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading
            id="ecosystem"
            eyebrow="Ecosystem"
            title="Built for coding agents. Not tied to one."
            lead="Accountability belongs to the run, not the harness. The coding agent is a replaceable component."
          />
          <div>
            <ul className="grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
              {HARNESS_TARGETS.map((harness) => (
                <li key={harness.name} className="bg-card p-4">
                  <p className="font-display text-[0.9375rem] font-medium text-foreground">
                    {harness.name}
                  </p>
                  <p className="mt-1 font-mono text-[0.6875rem] text-muted-foreground">
                    {harness.note}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {HARNESS_DISCLAIMER}
            </p>
          </div>
        </div>
      </Section>

      <Section id="principles">
        <SectionHeading
          id="principles"
          eyebrow="Principles"
          title="Trust earned by structure, not by assurance."
          lead="Three positions the whole system is built on. Each one is enforced by architecture rather than by policy."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline lg:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <li key={principle.slug} className="bg-card">
              <Link
                to="/principles/$slug"
                params={{ slug: principle.slug }}
                className="block h-full p-6 transition-colors hover:bg-secondary"
              >
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {principle.kicker}
                </p>
                <p className="mt-3 font-display text-xl font-medium text-foreground">
                  {principle.title}
                </p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
                  {principle.statement}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="developers">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="developers"
              eyebrow="Developers"
              title="Start with the verifier."
              lead="Point the read-only verifier at a repository you already trust and see what it can and cannot evidence."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/developers/quickstart"
                className="inline-flex h-11 items-center rounded-[8px] bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Quickstart
              </Link>
              <Link
                to="/open-source"
                className="inline-flex h-11 items-center rounded-[8px] border border-hairline bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Open source
              </Link>
            </div>
          </div>
          <Terminal
            label="verify a repository"
            lines={[
              { kind: "cmd", text: "npx opstruth" },
              { kind: "out", text: "scanning repository, stack, tests, build, CI, config, routes" },
              { kind: "out", text: "verified 3 · risky 1 · unproven 1" },
              { kind: "note", text: "# read-only: no deploys, no writes, no restarts" },
            ]}
          />
        </div>
      </Section>

      <Section id="thesis">
        <DefinitionBlock term="Proof & State" definition={SYSTEM_DEFINITION} />
      </Section>

      <CtaBand
        title="Give agents authority. Keep the proof."
        body="Read the architecture, inspect the source, and decide for yourself whether the separation holds."
        primary={{ label: "Read the architecture", to: "/architecture" }}
        secondary={{ label: "View on GitHub", href: GITHUB_URL }}
      />
    </>
  );
}
