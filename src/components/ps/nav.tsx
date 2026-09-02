import { Link } from "@tanstack/react-router";
import { Github, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/ps/brand";
import { Container } from "@/components/ps/primitives";
import { ThemeToggle } from "@/components/ps/theme-toggle";
import { GITHUB_URL, NAV_GROUPS } from "@/content/site";
import { cn } from "@/lib/utils";

function Wordmark() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Proof and State — home">
      <BrandMark className="h-8 w-8" />
      <span className="font-display text-[0.95rem] font-medium tracking-tight">
        Proof <span className="text-muted-foreground">&amp;</span> State
      </span>
    </Link>
  );
}

export function StatusBar() {
  return (
    <div className="border-b border-hairline bg-background">
      <Container className="flex h-9 items-center justify-between gap-4 overflow-hidden">
        <p className="truncate font-mono text-[0.6875rem] tracking-[0.06em] text-muted-foreground">
          <span
            aria-hidden="true"
            className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-verified align-middle"
          />
          Accountability infrastructure for autonomous engineering
        </p>
        <p className="hidden shrink-0 font-mono text-[0.6875rem] tracking-[0.06em] text-muted-foreground sm:block">
          execution ⟂ verification ⟂ receipts
        </p>
      </Container>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-hairline bg-background/90 backdrop-blur-xl"
          : "border-transparent bg-background/70 backdrop-blur-sm",
      )}
    >
      <Container>
        <nav aria-label="Primary" className="flex h-16 items-center justify-between gap-6">
          <Wordmark />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_GROUPS.map((group) => (
              <li key={group.label} className="group relative">
                <Link
                  to={group.to}
                  activeProps={{ className: "text-foreground" }}
                  className="inline-flex items-center rounded-[6px] px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {group.label}
                </Link>
                <div className="invisible absolute left-0 top-full z-50 w-72 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="panel-raised overflow-hidden p-1.5">
                    {group.items.map((item) => (
                      <li key={item.to + item.label}>
                        <Link
                          to={item.to}
                          className="block rounded-[6px] px-3 py-2 transition-colors hover:bg-secondary"
                        >
                          <span className="block text-sm text-foreground">{item.label}</span>
                          <span className="mt-0.5 block text-[0.75rem] leading-snug text-muted-foreground">
                            {item.note}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Proof and State on GitHub"
              className="hidden h-9 w-9 place-items-center rounded-[6px] border border-hairline bg-card text-muted-foreground transition-colors hover:text-foreground sm:grid"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
            </a>
            <Link
              to="/products"
              className="hidden h-9 items-center rounded-[6px] bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Explore the system
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-9 w-9 place-items-center rounded-[6px] border border-hairline bg-card text-muted-foreground lg:hidden"
            >
              {open ? (
                <X aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Menu aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[75vh] overflow-y-auto border-t border-hairline bg-background lg:hidden"
        >
          <Container className="py-4">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="border-b border-hairline py-3 last:border-0">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {group.label}
                </p>
                <ul className="mt-2 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.to + item.label}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-sm text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="block py-3 text-sm text-muted-foreground"
            >
              GitHub
            </a>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
