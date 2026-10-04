import { Container } from "@/components/ui/section";
import { Kicker } from "@/components/ui/section";

/**
 * The opening of an interior page. No photograph here: the homepage and the
 * four service pages carry the imagery, and an inside page that borrows a
 * picture it has no claim to looks like stock.
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
    <section className="relative isolate overflow-hidden bg-brand-subtle/50">
      <div className="pointer-events-none absolute inset-0 bloom opacity-70" aria-hidden />
      <Container className="relative py-20 sm:py-28">
        <div className="max-w-3xl animate-fade-up">
          <Kicker>{kicker}</Kicker>
          <h1 className="text-[2.5rem] font-semibold leading-[1.04] tracking-display text-balance sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {lead}
          </p>
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
