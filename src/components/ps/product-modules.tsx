import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { Reveal, StateChip } from "@/components/ps/primitives";
import { PRODUCTS, type ProductKey } from "@/content/products";

const TONE: Record<ProductKey, "exec" | "verified" | "info"> = {
  donestate: "exec",
  opstruth: "verified",
  agentproof: "info",
};

export function ProductModules() {
  return (
    <div className="space-y-px overflow-hidden rounded-[10px] border border-hairline bg-hairline">
      {PRODUCTS.map((product, index) => (
        <Reveal
          key={product.key}
          as="article"
          delay={index * 60}
          className="grid gap-8 bg-card p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                Product {String(index + 1).padStart(2, "0")} · {product.layer}
              </span>
              <StateChip tone={TONE[product.key]}>{product.stateBadge}</StateChip>
            </div>
            <h3 className="mt-4 font-display text-2xl font-medium tracking-tight sm:text-[1.75rem]">
              {product.name}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{product.role}</p>
            <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              {product.summary}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                to={product.path}
                className="inline-flex h-10 items-center rounded-[8px] border border-hairline bg-secondary px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                {product.name} in detail
              </Link>
              <a
                href={product.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Source
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="rounded-[10px] border border-hairline bg-secondary/40 p-5 sm:p-6">
            <p className="text-eyebrow">What it is for</p>
            <ul className="mt-5 space-y-4">
              {product.capabilities.slice(0, 4).map((capability) => (
                <li key={capability.title}>
                  <p className="font-display text-[0.9375rem] font-medium text-foreground">
                    {capability.title}
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {capability.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
