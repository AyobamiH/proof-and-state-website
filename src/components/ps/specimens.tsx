import { cn } from "@/lib/utils";

import { KeyValueRows, SpecPanel, StateChip, TONE_BG, TONE_TEXT, type Tone } from "./primitives";
import {
  AUTHORITY_ENVELOPE_SPECIMEN,
  RECEIPT_SPECIMEN,
  RUN_TIMELINE,
  VERIFICATION_ROWS,
  type RunState,
} from "@/content/products";

export function StateTimeline({
  states = RUN_TIMELINE,
  label = "DoneState workflow",
  meta = "reviewable change",
  className,
}: {
  states?: RunState[];
  label?: string;
  meta?: string;
  className?: string;
}) {
  return (
    <SpecPanel label={label} meta={meta} className={className}>
      <ol className="relative pl-6">
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-hairline"
        />
        {states.map((entry) => (
          <li key={entry.state} className="relative pb-4 last:pb-0">
            <span
              aria-hidden="true"
              className={cn(
                "absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-[2px]",
                TONE_BG[entry.tone],
              )}
            />
            <p className={cn("font-mono text-[0.75rem] tracking-[0.04em]", TONE_TEXT[entry.tone])}>
              {entry.state}
            </p>
            <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {entry.detail}
            </p>
          </li>
        ))}
      </ol>
    </SpecPanel>
  );
}

export function VerificationMatrix({ className }: { className?: string }) {
  const tone: Record<string, Tone> = {
    passed: "verified",
    attention: "risk",
    "not-confirmed": "unproven",
  };
  return (
    <SpecPanel
      label="OpsTruth example report"
      meta="inspection only"
      className={className}
      bodyClassName="p-0 sm:p-0"
    >
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Illustrative OpsTruth evidence report</caption>
        <thead>
          <tr className="border-b border-hairline">
            <th
              scope="col"
              className="px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground"
            >
              Check
            </th>
            <th
              scope="col"
              className="hidden px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground sm:table-cell"
            >
              Area
            </th>
            <th
              scope="col"
              className="px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground"
            >
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {VERIFICATION_ROWS.map((row) => (
            <tr key={row.check} className="border-b border-hairline last:border-0 align-top">
              <td className="px-4 py-3">
                <p className="text-[0.8125rem] text-foreground">{row.check}</p>
                <p className="mt-0.5 text-[0.75rem] text-muted-foreground">{row.note}</p>
              </td>
              <td className="hidden px-4 py-3 font-mono text-[0.75rem] text-muted-foreground sm:table-cell">
                {row.surface}
              </td>
              <td className="px-4 py-3">
                <StateChip tone={tone[row.state]!}>{row.state.replace("-", " ")}</StateChip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SpecPanel>
  );
}

export function ReceiptSpecimen({ className }: { className?: string }) {
  const r = RECEIPT_SPECIMEN;
  return (
    <SpecPanel label="AgentProof design preview" meta="in development" className={className}>
      <KeyValueRows
        rows={[
          { key: "status", value: r.status },
          { key: "purpose", value: r.purpose },
          { key: "would record", value: r.includes },
          { key: "checking", value: r.verification },
          { key: "availability", value: r.availability },
        ]}
      />
      <p className="mt-4 border-t border-hairline pt-3 text-[0.75rem] leading-relaxed text-muted-foreground">
        Design preview only. This is not a record from a released AgentProof runtime.
      </p>
    </SpecPanel>
  );
}

export function AuthorityEnvelope({ className }: { className?: string }) {
  const e = AUTHORITY_ENVELOPE_SPECIMEN;
  return (
    <SpecPanel label="Example safeguards" meta="operator controlled" className={className}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-verified">
            Allowed
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {e.allowed.map((item) => (
              <li key={item} className="font-mono text-[0.75rem] text-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-denied">
            Kept with owner
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {e.ownerOnly.map((item) => (
              <li key={item} className="font-mono text-[0.75rem] text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-5 grid gap-2 border-t border-hairline pt-4 sm:grid-cols-2">
        <p className="text-[0.8125rem] text-muted-foreground">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-foreground">
            Limits{" "}
          </span>
          {e.limits}
        </p>
        <p className="text-[0.8125rem] text-muted-foreground">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-foreground">
            Control{" "}
          </span>
          {e.control}
        </p>
      </div>
    </SpecPanel>
  );
}

export function Terminal({
  label,
  lines,
  className,
}: {
  label: string;
  lines: { kind: "cmd" | "out" | "note"; text: string }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] border border-terminal-border bg-terminal",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-terminal-border px-4 py-2.5">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-terminal-muted">
          {label}
        </span>
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-verified" />
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.8125rem] leading-relaxed">
        <code>
          {lines.map((line, index) => (
            <span key={`${line.text}-${index}`} className="block">
              {line.kind === "cmd" ? (
                <>
                  <span className="text-terminal-muted">$ </span>
                  <span className="text-terminal-foreground">{line.text}</span>
                </>
              ) : (
                <span className="text-terminal-muted">{line.text}</span>
              )}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function ComparisonMatrix({
  columns,
  rows,
  label,
  className,
}: {
  label: string;
  columns: string[];
  rows: { dimension: string; values: string[] }[];
  className?: string;
}) {
  return (
    <SpecPanel label={label} className={className} bodyClassName="p-0 sm:p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-left">
          <caption className="sr-only">{label}</caption>
          <thead>
            <tr className="border-b border-hairline">
              <th
                scope="col"
                className="px-4 py-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground"
              >
                Dimension
              </th>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-3 font-display text-[0.8125rem] font-medium text-foreground"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.dimension} className="border-b border-hairline last:border-0 align-top">
                <th
                  scope="row"
                  className="px-4 py-3 text-left font-mono text-[0.75rem] font-normal text-muted-foreground"
                >
                  {row.dimension}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={`${row.dimension}-${index}`}
                    className="px-4 py-3 text-[0.8125rem] text-foreground"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SpecPanel>
  );
}
