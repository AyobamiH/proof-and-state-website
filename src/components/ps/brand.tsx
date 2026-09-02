import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type BrandMarkProps = ComponentProps<"svg"> & {
  title?: string;
};

/**
 * Proof & State's canonical website mark.
 *
 * The geometry mirrors the product architecture:
 * - carbon / graphite rails = separated system boundaries
 * - info blue = AgentProof receipt / information layer
 * - verified green = independent verification
 * - execution orange = DoneState execution
 *
 * Material colours inherit the active site theme. Semantic colours use the
 * same evidence-state tokens as the rest of the UI.
 */
export function BrandMark({ className, title, ...props }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}

      <rect
        x="2"
        y="2"
        width="92"
        height="92"
        rx="18"
        fill="var(--background)"
        stroke="var(--hairline-strong)"
      />

      <path
        d="M24 56V29L47 15L72 30V42L53 53"
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70 51L79 57V70L50 86L25 72"
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path d="M27 50L36 44L44 50L35 57Z" fill="var(--info)" />
      <circle
        cx="45"
        cy="55"
        r="7.2"
        fill="var(--verified)"
        stroke="var(--background)"
        strokeWidth="2.5"
      />
      <path d="M52 58L61 52L70 59L61 66Z" fill="var(--exec)" />
    </svg>
  );
}
