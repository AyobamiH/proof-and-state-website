import { cn } from "@/lib/utils";

import { TONE_BG, TONE_TEXT, type Tone } from "./primitives";

export type RailNode = {
  label: string;
  caption?: string;
  tone?: Tone;
  hash?: string;
};

/**
 * Evidence Rail — the proprietary graphic language of Proof & State.
 * A measured rail of nodes carrying mono labels, state tone and hash fragments.
 * Used as hero pipeline, section spine, diagram rail and page-header ornament.
 */
export function EvidenceRail({
  nodes,
  orientation = "horizontal",
  animated = true,
  className,
}: {
  nodes: RailNode[];
  orientation?: "horizontal" | "vertical";
  animated?: boolean;
  className?: string;
}) {
  if (orientation === "vertical") {
    return (
      <ol className={cn("relative pl-7", className)}>
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-1 h-[calc(100%-0.5rem)] w-px bg-hairline"
        />
        {nodes.map((node, index) => {
          const tone = node.tone ?? "unproven";
          return (
            <li key={node.label} className="relative pb-6 last:pb-0">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-7 top-1 grid h-3.5 w-3.5 place-items-center rounded-[3px] border border-hairline-strong bg-card",
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-[1px]", TONE_BG[tone])} />
              </span>
              <p
                className={cn(
                  "font-mono text-[0.75rem] uppercase tracking-[0.12em]",
                  TONE_TEXT[tone],
                )}
              >
                {node.label}
              </p>
              {node.caption ? (
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{node.caption}</p>
              ) : null}
              {node.hash ? (
                <p className="mt-1 font-mono text-[0.6875rem] text-muted-foreground/80">
                  {node.hash}
                </p>
              ) : null}
              <span className="sr-only">{`Step ${index + 1} of ${nodes.length}`}</span>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol
      className={cn(
        "grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {nodes.map((node, index) => {
        const tone = node.tone ?? "unproven";
        return (
          <li key={node.label} className="relative bg-card p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  TONE_BG[tone],
                  animated && "animate-node-pulse",
                )}
                style={animated ? { animationDelay: `${index * 240}ms` } : undefined}
              />
            </div>
            <p
              className={cn(
                "mt-3 font-mono text-[0.8125rem] uppercase tracking-[0.1em]",
                TONE_TEXT[tone],
              )}
            >
              {node.label}
            </p>
            {node.caption ? (
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {node.caption}
              </p>
            ) : null}
            {node.hash ? (
              <p className="mt-2 font-mono text-[0.6875rem] text-muted-foreground/75">
                {node.hash}
              </p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/** Compact single-line rail used as a page-header ornament. */
export function RailStrip({ nodes, className }: { nodes: RailNode[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-2 gap-y-2", className)}>
      {nodes.map((node, index) => (
        <li key={node.label} className="flex items-center gap-2">
          {index > 0 ? <span aria-hidden="true" className="h-px w-5 bg-hairline-strong" /> : null}
          <span
            className={cn(
              "font-mono text-[0.6875rem] uppercase tracking-[0.12em]",
              TONE_TEXT[node.tone ?? "unproven"],
            )}
          >
            {node.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
