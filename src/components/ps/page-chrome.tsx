import { Link } from "@tanstack/react-router";

import { Container, StateChip, type Tone } from "@/components/ps/primitives";
import { RailStrip, type RailNode } from "@/components/ps/evidence-rail";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; to?: string };

/** Visual breadcrumb trail. BreadcrumbList JSON-LD is emitted by each route's head(). */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
        <li>
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.to && index < items.length - 1 ? (
              <Link to={item.to} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  rail,
  badge,
  aside,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  rail?: RailNode[];
  badge?: { tone: Tone; label: string };
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-b border-hairline bg-background", className)}>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-eyebrow">{eyebrow}</p>
              {badge ? <StateChip tone={badge.tone}>{badge.label}</StateChip> : null}
            </div>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-[3.25rem]">
              {title}
            </h1>
            {lead ? (
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {lead}
              </p>
            ) : null}
            {rail ? <RailStrip nodes={rail} className="mt-7" /> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </Container>
    </div>
  );
}

export function RelatedLinks({
  title = "Continue",
  links,
  className,
}: {
  title?: string;
  links: { label: string; to: string; note: string }[];
  className?: string;
}) {
  return (
    <nav aria-label={title} className={cn("border-t border-hairline py-14", className)}>
      <Container>
        <p className="text-eyebrow">{title}</p>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <li key={link.to + link.label} className="bg-card">
              <Link to={link.to} className="block h-full p-5 transition-colors hover:bg-secondary">
                <span className="block font-display text-[0.9375rem] font-medium text-foreground">
                  {link.label}
                </span>
                <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {link.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: { label: string; to: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="border-t border-hairline bg-background">
      <Container className="py-20 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <h2 className="text-balance text-3xl leading-[1.08] sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              to={primary.to}
              className="inline-flex h-11 items-center rounded-[8px] bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {primary.label}
            </Link>
            {secondary ? (
              <a
                href={secondary.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center rounded-[8px] border border-hairline bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {secondary.label}
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
