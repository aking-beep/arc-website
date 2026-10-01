import * as React from "react";
import { cn } from "@/lib/utils";
import {
  type Maturity,
  type Status,
  maturityLabel,
  statusLabel,
} from "@/lib/content";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

const statusStyles: Record<Status, string> = {
  live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  building: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  planned: "border-border bg-muted text-muted-foreground",
};

const maturityStyles: Record<Maturity, string> = {
  available:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  "design-partners": "border-brand/30 bg-brand/10 text-brand",
  "in-development":
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "open-source": "border-border bg-muted text-muted-foreground",
  experiment: "border-border bg-muted text-muted-foreground",
  alpha: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  research: "border-border bg-muted text-muted-foreground",
};

export function MaturityBadge({
  maturity,
  className,
}: {
  maturity: Maturity;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider",
        maturityStyles[maturity],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {maturityLabel[maturity]}
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
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabel[status]}
    </span>
  );
}
