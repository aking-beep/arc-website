import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";
import { StartHere } from "@/components/start-here";
import { AlternativesTable } from "@/components/alternatives-table";
import { MarketSignals } from "@/components/market-signals";
import { CTA } from "@/components/cta";
import {
  labs,
  labsProof,
  studioOfferings,
  caseStudies,
  bestFit,
  notAFit,
  site,
} from "@/lib/content";

export default function HomePage() {
  const featuredLabs = labs.filter((p) => p.featured);
  // Four focused reviews fill the two-column grid evenly; the flagship spans it.
  const featuredOffers = studioOfferings.filter(
    (o) =>
      o.flagship ||
      [
        "ai-readiness-audit",
        "data-health-analytics",
        "security-compliance-posture",
        "agent-control-review",
      ].includes(o.slug),
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
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={site.calendly} size="lg">
                Book a 30-min call
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/labs" variant="outline" size="lg">
                Try a free tool first
              </Button>
            </div>
            <p className="mx-auto mt-6 text-sm text-muted-foreground">
              No sales team. No deck. Senior people only.
            </p>
          </div>
        </Container>
      </section>

      <StartHere className="bg-muted/30" />

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="What we do"
            title="Pick the problem you actually have."
            lead="Every engagement starts as a scoped review of two to seven weeks and ends in a plan with named owners. Open any one to see what it covers and what you receive."
          />
          <Link
            href="/studio#offers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All {studioOfferings.length} reviews
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {featuredOffers.map((o) => (
            <Link
              key={o.slug}
              href={`/studio/${o.slug}`}
              className={o.flagship ? "group block h-full md:col-span-2" : "group block h-full"}
            >
              <Card
                className={
                  o.flagship
                    ? "flex h-full flex-col p-6 ring-1 ring-foreground/15 transition-all hover:border-foreground/20 hover:shadow-sm"
                    : "flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm"
                }
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs font-medium">
                    {o.focus}
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
                  {o.tagline}
                </p>
                <p className="mt-4 border-t border-border/60 pt-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">You leave with: </span>
                  {o.youLeaveWith}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Track record"
          title="The standard comes from somewhere."
          lead="Our team spent twenty years delivering technology programs inside Fortune 100 and Fortune 500 environments. ARC exists so mid-size organizations get that standard without a consulting army."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.team.scope.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-card px-5 py-4"
            >
              <div className="text-xl font-semibold tracking-tight">{item.metric}</div>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {caseStudies.slice(0, 2).map((study) => (
            <Link key={study.slug} href={`/work/${study.slug}`} className="group block h-full">
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
        <div className="mt-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            See all the work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <AlternativesTable />

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Free tools"
            title="Try the thinking before you buy it."
            lead={`${labsProof.tools} free tools built from the same method as the paid work. Most need no account and store nothing.`}
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

      <MarketSignals
        limit={3}
        footer={
          <Link
            href="/labs#signals"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            See everything that changed
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <Section className="bg-muted/30">
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

      <CTA />
    </>
  );
}
