import { Container, Kicker } from "@/components/ui/section";

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
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <Container className="relative py-20 sm:py-24">
        <div className="max-w-3xl animate-fade-up">
          <Kicker>{kicker}</Kicker>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {lead}
          </p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
