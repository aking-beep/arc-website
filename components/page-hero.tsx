import { Container, Kicker } from "@/components/ui/section";

/**
 * The opening of an interior page. No photograph here: the homepage and the
 * four service pages carry the imagery, and an inside page that borrows a
 * picture it has no claim to looks like stock.
 *
 * The tint is a gradient that resolves into the page background, because a
 * flat band of colour ending on a hard line is the thing that reads as a
 * section wrapper rather than a designed opening.
 */
export function PageHero({
  kicker,
  title,
  lead,
  children,
  aside,
}: {
  kicker: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  children?: React.ReactNode;
  /** Optional right-hand content. Without it the column stays empty on purpose. */
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-subtle/80 via-brand-subtle/30 to-background">
      <div
        className="pointer-events-none absolute inset-0 bloom opacity-60"
        aria-hidden
      />
      {/* Almost no bottom padding: the gradient resolving into the page is the
          separation, and the following section brings its own top padding. */}
      <Container className="relative pb-6 pt-16 sm:pb-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-end lg:gap-16">
          <div className="max-w-3xl animate-fade-up">
            <Kicker>{kicker}</Kicker>
            <h1 className="text-[2.5rem] font-semibold leading-[1.04] tracking-display text-balance sm:text-[3.5rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {lead}
            </p>
            {children ? <div className="mt-9">{children}</div> : null}
          </div>
          {aside ? <div className="lg:pb-2">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
