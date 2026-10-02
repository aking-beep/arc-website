import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { CTA } from "@/components/cta";
import { caseStudies, site } from "@/lib/content";
import { homeHero, homeSymptoms, serviceAreas } from "@/lib/services";
import { playbookProduct } from "@/lib/playbook";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
        <Container className="relative py-24 sm:py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {homeHero.kicker}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              {homeHero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {homeHero.lead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={homeHero.primary.href} size="lg">
                {homeHero.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={homeHero.secondary.href} variant="outline" size="lg">
                {homeHero.secondary.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Before anything about ARC. A visitor should find their own week in
          this list, which is the only reason they will read the next section. */}
      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {homeSymptoms.title}
          </h2>
          <div>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border">
              {homeSymptoms.items.map((item) => (
                <li
                  key={item}
                  className="bg-card px-5 py-4 text-base leading-relaxed text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg font-medium">{homeSymptoms.close}</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="What we do"
          title="We help with four things."
          lead="Each one starts from a situation rather than a discipline, because the discipline is our problem to work out, not yours."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
          {serviceAreas.map((area, index) => (
            <div
              key={area.slug}
              className="grid gap-6 bg-card p-6 sm:p-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-foreground">
                    <Icon name={area.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} · {area.verb}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-balance">
                  {area.heading}
                </h3>
              </div>
              <div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {area.body}
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {area.symptoms.slice(0, 4).map((symptom) => (
                    <li
                      key={symptom}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand/60"
                      />
                      {symptom}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${area.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
                >
                  {area.linkLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Proof sits directly after the offer, because the next question a
          buyer has is whether we have done this before. */}
      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Work"
            title="Programs we have delivered."
            lead="Three from Fortune 100 and Fortune 500 environments, one from ARC Advisory. Where the client cannot be named, the industry and the scale are."
          />
          <Link
            href="/work"
            className="inline-flex flex-none items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            See the work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {caseStudies.slice(0, 4).map((study) => (
            <Link key={study.slug} href={`/work/${study.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {study.industry}
                </p>
                <h3 className="mt-3 flex items-start gap-1.5 text-lg font-semibold leading-snug tracking-tight">
                  {study.title}
                  <ArrowUpRight className="mt-1 h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <dl className="mt-5 flex flex-1 flex-wrap items-end gap-x-8 gap-y-4 border-t border-border/60 pt-5">
                  {study.outcomes.slice(0, 3).map((outcome) => (
                    <div key={outcome.label}>
                      <dt className="sr-only">{outcome.label}</dt>
                      <dd className="text-xl font-semibold tracking-tight">
                        {outcome.metric}
                      </dd>
                      <p className="mt-0.5 max-w-[12rem] text-xs leading-relaxed text-muted-foreground">
                        {outcome.label}
                      </p>
                    </div>
                  ))}
                </dl>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              kicker="Resources"
              title="Use our methods without hiring us."
              lead="The assessments and scanners are free and run in your browser. The Playbook is the whole method as a book, for teams who would rather run it themselves."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/playbook">
                Get the {playbookProduct.name.replace("The ", "")}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/labs" variant="outline">
                Browse the free tools
              </Button>
            </div>
          </div>
          <Card className="p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Where we have come from
            </p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {site.team.scope.slice(0, 3).map((item) => (
                <div key={item.label} className="border-t border-border/60 pt-3 first:border-0 first:pt-0">
                  <dd className="text-xl font-semibold tracking-tight">{item.metric}</dd>
                  <dt className="mt-0.5 text-sm text-muted-foreground">{item.label}</dt>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </Section>

      <CTA
        title="Not sure which one you need?"
        lead="You shouldn't have to diagnose your own technology problem before talking to someone who does this for a living. Tell us what's happening and we'll help work out whether you need a small fix, a focused project, a larger programme — or nothing from us at all."
      />
    </>
  );
}
