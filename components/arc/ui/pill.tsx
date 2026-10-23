import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PillTone = "ok" | "warn" | "danger" | "neutral" | "brand";

/** Inline state marker inside the dark console panels. */
const tones: Record<PillTone, string> = {
  ok: "border-ok-on-dark/30 text-ok-on-dark",
  warn: "border-warn-on-dark/35 text-warn-on-dark",
  danger: "border-danger-on-dark/40 text-danger-on-dark",
  neutral: "border-night-line text-mist-2",
  brand: "border-brand-on-dark/35 text-brand-on-dark",
};

export function Pill({
  tone,
  children,
  className,
}: {
  tone: PillTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded border px-1.5 py-px font-mono text-[11.5px] capitalize",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
