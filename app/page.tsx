import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PillarCard } from "@/components/pillar-card";
import { ProductCard } from "@/components/product-card";
import { CTA } from "@/components/cta";
import {
  pillars,
  stages,
  principles,
  labs,
  labsProof,
  research,
  offers,
  caseStudies,
  whyArc,
  notAFit,
  site,
} from "@/lib/content";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function HomePage() {
  const featuredLabs = labs.filter((p) => p.featured);
  const featuredOffers = offers.filter((o) => o.flagship || ["01", "03", "05"].includes(o.number));
  const featuredResearch = research.slice(0, 2);

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
              {site.audience.line} No buzzwords. No eighteen-month journeys. Clear
              stages, named owners, work you can measure.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="rounded-xl border border-border bg-card/60 p-4 text-left">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Need help with a real problem?
                </p>
                <Button href="/studio#offers" size="lg" className="mt-3 w-full">
                  Find the right engagement
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-4 text-left">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Want to evaluate ARC first?
                </p>
                <Button href="/labs" variant="outline" size="lg" className="mt-3 w-full">
                  Try a free tool
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading
            kicker="Who does the work"
            title={site.founder.name}
            lead={`${site.founder.role}. Twenty years of Fortune 100/500 delivery — then ARC, so 10–500 person organizations can get that same standard.`}
          />
          <div>
            <div className="grid gap-3 sm:grid-cols-3">
              {site.founder.scope.slice(0, 6).map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border bg-card px-4 py-3"
                >
                  <div className="text-lg font-semibold tracking-tight">{item.metric}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
            >
              Founder background
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="The ecosystem"
          title="Four ways in. One standard of work."
          lead="Start with a free tool, a named engagement, a research brief, or a workshop. Each path uses the same method: name the stage, score the work, ship something real."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <PillarCard key={p.id} pillar={p} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="ARC Studio"
            title="Buyable first engagements."
            lead="Not a capability list. Six named offers with a promise, a duration, and what you leave with."
          />
          <Link
            href="/studio#offers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All offers
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
                  <span className="font-mono text-sm text-muted-foreground">{o.number}</span>
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
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.promise}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="ARC Labs"
            title="Evaluate us by running something."
            lead={`${labsProof.tools} free tools, grouped by job on the Labs page. ${labsProof.note}`}
          />
          <Link
            href="/labs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            Tools by job
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
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Work"
            title="Outcomes over narratives."
            lead="Verifiable scope from Fortune 100/500 delivery and ARC Studio. Where we cannot name the client, we name the scale."
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
            <Link key={study.slug} href={`/work/${study.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
                    {study.kind === "career" ? "Prior delivery" : "ARC Studio"}
                  </span>
                  <span>{study.industry}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{study.title}</h3>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/60 pt-4">
                  {study.outcomes.map((o) => (
                    <div key={o.label}>
                      <div className="text-lg font-semibold tracking-tight">{o.metric}</div>
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
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              kicker="Why ARC"
              title="What you are actually buying."
              lead="A founder who has shipped at Fortune 100/500 scale, a method with teeth, and free tools that show how we think before you hire us."
            />
            <ul className="mt-8 space-y-6">
              {whyArc.map((item) => (
                <li key={item.title}>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              kicker="Not a fit"
              title="When we will say no."
              lead="Consistent with the rest of the site: an honest no is cheaper than a bad yes."
            />
            <ul className="mt-8 space-y-3">
              {notAFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="How ARC works"
          title="Five stages. One honest system."
          lead="Every engagement names where you are, so the work matches the moment instead of the pitch deck."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((s) => (
            <li key={s.number} className="bg-card p-6">
              <span className="font-mono text-sm text-muted-foreground">{s.number}</span>
              <h3 className="mt-3 text-base font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="ARC Research"
            title="Research you can verify."
            lead="Cited briefs across AI, security, operations, cloud, transformation, and product. If we cannot source a claim, we say so."
          />
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All research
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5">
          {featuredResearch.map((a) => (
            <Link key={a.slug} href={`/research/${a.slug}`} className="group block">
              <Card className="flex flex-col gap-3 p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
                    {a.kind}
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-0.5 font-medium text-foreground/80">
                    {a.topic}
                  </span>
                  <span>{formatDate(a.date)}</span>
                </div>
                <h3 className="mt-1 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                  {a.title}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{a.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading
            kicker="How we think"
            title="The rules we hold ourselves to."
            lead="Every recommendation has to pass these. If a piece of work does not, we do not ship it."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {principles.slice(0, 4).map((p) => (
              <div key={p.number} className="rounded-lg border border-border bg-card p-5">
                <span className="font-mono text-xs text-muted-foreground">{p.number}</span>
                <h3 className="mt-2 text-sm font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            See all eight principles and how we work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CTA
        title="Find the right engagement."
        lead="A 30-minute call to name the problem and the offer that fits — Digital Readiness, diligence, security, data, AI, or the full diagnostic. If none of those fit, we will say so."
      />
    </>
  );
}
