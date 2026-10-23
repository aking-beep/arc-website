import * as React from "react";
import { cn } from "@/lib/utils";
import { type Maturity, type Status, statusLabel } from "@/lib/content";
import { maturityStyle } from "@/lib/arc/status";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-paper px-2.5 py-0.5 text-xs font-medium text-ink-2",
        className,
      )}
      {...props}
    />
  );
}

const statusStyles: Record<Status, string> = {
  live: "border-ok/25 bg-ok-subtle text-ok",
  building: "border-warn/25 bg-warn-subtle text-warn",
  planned: "border-line-strong bg-paper text-ink-2",
};

/**
 * Maturity now reads from the single taxonomy in lib/arc/status.ts, which is
 * also what the redesigned routes render. A tool therefore cannot show one
 * label on /labs and a different one on /labs/[slug].
 */
export function MaturityBadge({
  maturity,
  className,
}: {
  maturity: Maturity;
  className?: string;
}) {
  const s = maturityStyle(maturity);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11.5px] font-medium",
        s.light,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabel[status]}
    </span>
  );
}
