import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container", className)} {...props} />;
}

/*
 * Sections are separated by space and surface colour. The hairline rule that
 * used to sit on top of every one of them, on top of the alternating
 * background, is what made the page read as a wireframe.
 */
export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-20 sm:py-28", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
      <span className="h-1 w-1 rounded-full bg-brand" />
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
      <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-display text-balance sm:text-[2.75rem]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lead}</p>
      ) : null}
    </div>
  );
}
