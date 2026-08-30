import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("border-t border-hairline py-20 sm:py-24 lg:py-28", className)}
      {...(id ? { "aria-labelledby": `${id}-heading` } : {})}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-eyebrow flex items-center gap-2.5", className)}>
      <span aria-hidden="true" className="inline-block h-px w-6 bg-hairline-strong" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        {...(id ? { id: `${id}-heading` } : {})}
        className="mt-5 text-balance text-3xl leading-[1.08] sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** Scroll reveal. Visible immediately when IntersectionObserver is unavailable (SSR, older browsers). */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-visible={visible ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}

export type Tone = "verified" | "risk" | "denied" | "info" | "exec" | "unproven";

export const TONE_CHIP: Record<Tone, string> = {
  verified: "border-verified/35 bg-verified-soft text-verified",
  risk: "border-risk/35 bg-risk-soft text-risk",
  denied: "border-denied/35 bg-denied-soft text-denied",
  info: "border-info/35 bg-info-soft text-info",
  exec: "border-exec/35 bg-exec-soft text-exec",
  unproven: "border-unproven/30 bg-unproven-soft text-unproven",
};

export const TONE_TEXT: Record<Tone, string> = {
  verified: "text-verified",
  risk: "text-risk",
  denied: "text-denied",
  info: "text-info",
  exec: "text-exec",
  unproven: "text-unproven",
};

export const TONE_BG: Record<Tone, string> = {
  verified: "bg-verified",
  risk: "bg-risk",
  denied: "bg-denied",
  info: "bg-info",
  exec: "bg-exec",
  unproven: "bg-unproven",
};

export function StateChip({
  tone,
  children,
  dot = true,
  className,
}: {
  tone: Tone;
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em]",
        TONE_CHIP[tone],
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}

export function MonoTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] border border-hairline bg-secondary px-2 py-0.5 font-mono text-[0.6875rem] tracking-[0.06em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("h-px w-full bg-hairline", className)} />;
}

/** Bordered technical panel with a mono caption bar — the base container of every specimen. */
export function SpecPanel({
  label,
  meta,
  children,
  className,
  bodyClassName,
}: {
  label: string;
  meta?: ReactNode | undefined;
  children: ReactNode;
  className?: string | undefined;
  bodyClassName?: string | undefined;
}) {
  return (
    <figure className={cn("panel overflow-hidden", className)}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-hairline bg-secondary/60 px-4 py-2.5">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        {meta ? (
          <span className="font-mono text-[0.6875rem] text-muted-foreground">{meta}</span>
        ) : null}
      </figcaption>
      <div className={cn("p-4 sm:p-5", bodyClassName)}>{children}</div>
    </figure>
  );
}

export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-[10px] border-l-2 border-y border-r border-hairline bg-card p-5",
        tone === "verified" && "border-l-verified",
        tone === "risk" && "border-l-risk",
        tone === "denied" && "border-l-denied",
        tone === "info" && "border-l-info",
        tone === "exec" && "border-l-exec",
        tone === "unproven" && "border-l-unproven",
        className,
      )}
    >
      <p className={cn("font-mono text-[0.6875rem] uppercase tracking-[0.14em]", TONE_TEXT[tone])}>
        {title}
      </p>
      <div className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </aside>
  );
}

/** Quotable entity definition. Deliberately plain markup so retrieval systems can lift it cleanly. */
export function DefinitionBlock({
  term,
  definition,
  className,
}: {
  term: string;
  definition: string;
  className?: string;
}) {
  return (
    <dl className={cn("border-l-2 border-hairline-strong pl-5", className)}>
      <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
        Definition — {term}
      </dt>
      <dd className="mt-3 text-lg leading-relaxed text-foreground sm:text-xl">{definition}</dd>
    </dl>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-[68ch] space-y-5 text-[1.0625rem] leading-[1.75] text-muted-foreground [&_a]:text-info [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function KeyValueRows({
  rows,
  className,
}: {
  rows: { key: string; value: ReactNode }[];
  className?: string;
}) {
  return (
    <dl className={cn("divide-y divide-hairline", className)}>
      {rows.map((row) => (
        <div
          key={row.key}
          className="grid gap-1 py-2.5 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-4"
        >
          <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
            {row.key}
          </dt>
          <dd className="break-all font-mono text-[0.8125rem] text-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
