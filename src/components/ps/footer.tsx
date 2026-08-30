import { Link } from "@tanstack/react-router";

import { Container } from "@/components/ps/primitives";
import { FOOTER_COLUMNS, GITHUB_URL, LEGAL_LINKS } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-background">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)]">
          <div>
            <p className="font-display text-lg font-medium tracking-tight">
              Proof <span className="text-muted-foreground">&amp;</span> State
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI work accountability: durable authority, independent verification and evidence that
              survives the agent session.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-block font-mono text-[0.75rem] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              github.com/AyobamiH/proof-and-state-website
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {column.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] text-muted-foreground">
            © {new Date().getFullYear()} Proof &amp; State
          </p>
          <ul className="flex flex-wrap items-center gap-5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="font-mono text-[0.6875rem] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <span className="font-mono text-[0.6875rem] text-muted-foreground">
                Self-verification is not proof
              </span>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
