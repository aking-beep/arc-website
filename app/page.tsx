import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";
import { CTA } from "@/components/cta";
import {
  pillars,
  labs,
  offers,
  caseStudies,
  bestFit,
  notAFit,
  site,
} from "@/lib/content";

export default function HomePage() {
  const featuredLabs = labs.filter((p) => p.featured);
  const featuredOffers = offers.filter(
    (o) => o.flagship || ["01", "03", "05"].includes(o.number),
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
        <Container className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-muted-foreground">
              ARC TRANSFORMATION GROUP
            </p>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {site.audience.badge}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              Digital transformation that ships.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {site.audience.line}
            </p>
            <p className="mx-auto mt-8 max-w-md text-sm text-muted-foreground">
              Have something to fix, or just looking around?
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/studio#offers" size="lg">
                See Studio
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/labs" variant="outline" size="lg">
                Try a free tool
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading
            kicker="Who you'll work with"
            title={site.founder.name}
            lead="Founder. Twenty years inside Fortune 100 and Fortune 500 programs. You talk to him, not a bench that appears after the pitch."
          />
          <div>
            <div className="grid gap-3 sm:grid-cols-3">
              {site.founder.scope.slice(0, 6).map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border bg-card px-4 py-3"
                >
                  <div className="text-lg font-semibold tracking-tight">
                    {item.metric}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
            >
              More about Andrew
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Studio"
            title="How an engagement usually starts."
            lead="A scoped review, two to seven weeks. You leave with a plan, owners, and a next step. If you still need us after that, we stay and build."
          />
          <Link
            href="/studio#offers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All six starts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {featuredOffers.map((o) => (
            <Link
              key={o.number}
              href="/studio#offers"
              className={o.flagship ? "group block h-full md:col-span-2" : "group block h-full"}
            >
              <Card
                className={
                  o.flagship
                    ? "flex h-full flex-col p-6 ring-1 ring-foreground/15"
                    : "flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm"
                }
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm text-muted-foreground">
                    {o.number}
                  </span>
                  <span className="text-xs text-muted-foreground">{o.duration}</span>
                  {o.flagship ? (
                    <span className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Flagship
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                  {o.name}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {o.promise}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Work"
            title="What that looks like in practice."
            lead="Fortune 100/500 programs Andrew ran, plus ARC Studio. Where we cannot name the client, we name the scale."
          />
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {caseStudies.slice(0, 4).map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group block h-full"
            >
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
                    {study.kind === "career" ? "Prior delivery" : "ARC Studio"}
                  </span>
                  <span>{study.industry}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {study.title}
                </h3>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/60 pt-4">
                  {study.outcomes.map((o) => (
                    <div key={o.label}>
                      <div className="text-lg font-semibold tracking-tight">
                        {o.metric}
                      </div>
                      <p className="text-xs text-muted-foreground">{o.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Labs"
            title="Or run a tool first."
            lead="Free scanners and catalogs. Same point of view as the paid work, without a call."
          />
          <Link
            href="/labs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featuredLabs.map((p) => (
            <ProductCard key={p.slug} product={p} basePath="/labs" />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading kicker="Fit" title="Who we work best with" />
            <ul className="mt-8 grid gap-4">
              {bestFit.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-none text-emerald-500" />
                  <span className="text-base leading-relaxed text-muted-foreground">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading kicker="Not a fit" title="When to look elsewhere" />
            <ul className="mt-8 grid gap-4">
              {notAFit.map((b) => (
                <li
                  key={b}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="rounded-lg border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {p.kicker}
              </p>
              <h3 className="mt-3 text-base font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.summary}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}

