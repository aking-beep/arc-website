import { Container } from "@/components/ui/section";

/**
 * Page hero for the routes that have not been rebuilt on the new layouts.
 * Matches the redesigned page headers: mono eyebrow, serif title, hairline
 * rule at the bottom. The decorative masked grid the previous version used is
 * gone — the design direction calls for fewer gradients, not more.
 */
export function PageHero({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[820px]">
          <p className="font-mono text-[13px] text-brand">{kicker}</p>
          <h1 className="mt-5 font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-balance text-ink sm:text-[56px]">
            {title}
          </h1>
          <p className="mt-6 max-w-[620px] text-[18px] leading-relaxed text-pretty text-ink-2">
            {lead}
          </p>
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
