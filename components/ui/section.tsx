import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Layout primitives for the routes that have not been rebuilt on the new
 * page layouts. Restyled onto the Magic Patterns design language — serif
 * headings, a mono brand eyebrow, hairline rules — so those routes read as
 * the same site rather than as a second visual system.
 *
 * The widths and gutters match `components/arc/ui/container.tsx`.
 */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-shell px-5 sm:px-8", className)} {...props} />
  );
}

export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("border-t border-line py-20 sm:py-24", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-mono text-[12.5px] font-medium text-brand">{children}</p>;
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
    <div className={cn("max-w-[720px]", className)}>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <h2 className="font-serif text-[32px] leading-[1.12] tracking-[-0.015em] text-balance text-ink sm:text-[40px]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 text-[17px] leading-relaxed text-pretty text-ink-2">{lead}</p>
      ) : null}
    </div>
  );
}
