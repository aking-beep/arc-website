import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container", className)} {...props} />;
}

export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("border-t border-border/60 py-20 sm:py-28", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

/**
 * The one eyebrow. Mono, 11px, wide tracking — the same treatment as
 * PanelLabel, so a reader learns it once.
 */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lead}</p>
      ) : null}
    </div>
  );
}
