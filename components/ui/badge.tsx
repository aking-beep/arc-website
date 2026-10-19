import * as React from "react";
import { cn } from "@/lib/utils";
import { type State, stateLabel } from "@/lib/content";

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

/**
 * Five states, five appearances.
 *
 * Shape carries the meaning alongside colour — filled vs hollow dot, solid vs
 * dashed border — so the scale still reads in greyscale and for the common
 * colour-vision deficiencies. The same vocabulary drives the chain diagram,
 * which is why a node's border is literally the same language as a badge.
 */
const chrome: Record<State, { wrap: string; dot: string }> = {
  available: {
    wrap: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    dot: "bg-current",
  },
  beta: {
    wrap: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400",
    dot: "bg-current",
  },
  labs: {
    wrap: "border-border bg-muted text-muted-foreground",
    dot: "border border-current bg-transparent",
  },
  research: {
    wrap: "border-dashed border-border bg-transparent text-muted-foreground",
    dot: "border border-current bg-transparent opacity-60",
  },
  soon: {
    wrap: "border-dashed border-border bg-transparent text-muted-foreground/70",
    dot: "border border-current bg-transparent opacity-40",
  },
};

export function StateBadge({
  state,
  className,
}: {
  state: State;
  className?: string;
}) {
  const style = chrome[state];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider",
        style.wrap,
        className,
      )}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
      {stateLabel[state]}
    </span>
  );
}
