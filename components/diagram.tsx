import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A dark technical panel. The `dark` class re-scopes the theme variables, so
 * these read as product UI regardless of the page theme.
 */
export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "dark relative overflow-hidden rounded-xl border border-border bg-panel text-foreground",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 diagram-bg opacity-40" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </p>
  );
}

/**
 * A left-to-right chain of stages that wraps to a vertical stack on small
 * screens. Used for the lifecycle, the loop, and the evidence chain.
 */
export function FlowChain({
  steps,
  className,
  highlightLast,
}: {
  steps: readonly string[];
  className?: string;
  /** Mark the final node as the outcome of the chain. */
  highlightLast?: boolean;
}) {
  return (
    <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-3", className)}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={step} className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-wider",
                highlightLast && last
                  ? "border-brand/40 bg-brand/10 text-brand"
                  : "border-border bg-card text-muted-foreground",
              )}
            >
              {step}
            </span>
            {last ? null : (
              <span aria-hidden className="h-px w-6 rail-x sm:w-8" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * A numbered vertical pipeline. Reads top-to-bottom on every screen size,
 * which is what the lifecycle diagrams need.
 */
export function FlowStack({
  steps,
  className,
}: {
  steps: { name: string; text?: string }[];
  className?: string;
}) {
  return (
    <ol className={cn("relative grid gap-0", className)}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={step.name} className="relative grid grid-cols-[auto_1fr] gap-4">
            <div className="flex flex-col items-center">
              <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-md border border-border bg-card font-mono text-[11px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              {last ? null : (
                <span aria-hidden className="w-px flex-1 rail-y" />
              )}
            </div>
            <div className={cn("pb-6", last && "pb-0")}>
              <p className="font-mono text-xs uppercase tracking-[0.16em]">
                {step.name}
              </p>
              {step.text ? (
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Two-column contrast block. Left is what the system reported, right is what
 * was verified — the core ARK Control argument.
 */
export function SplitClaim({
  leftLabel,
  rightLabel,
  left,
  right,
  className,
}: {
  leftLabel: string;
  rightLabel: string;
  left: { label: string; value: string }[];
  right: string[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2", className)}>
      <div className="bg-card p-6 sm:p-8">
        <PanelLabel>{leftLabel}</PanelLabel>
        <dl className="mt-6 grid gap-4">
          {left.map((row) => (
            <div key={row.label} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <dt className="min-w-[7.5rem] text-sm text-muted-foreground">
                {row.label}
              </dt>
              <dd className="font-mono text-sm">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="bg-card p-6 sm:p-8">
        <PanelLabel>{rightLabel}</PanelLabel>
        <ul className="mt-6 grid gap-4">
          {right.map((q) => (
            <li key={q} className="flex items-start gap-3 text-sm leading-relaxed">
              <span
                aria-hidden
                className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand"
              />
              {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** A single emphasised statement, used sparingly to land an argument. */
export function Takeaway({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "border-l-2 border-brand pl-5 text-xl font-medium leading-relaxed text-balance sm:text-2xl",
        className,
      )}
    >
      {children}
    </p>
  );
}
