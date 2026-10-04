import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PhotoCard, PhotoChip, PhotoHero } from "@/components/ui/photo";
import { Icon } from "@/components/icon";
import { CTA } from "@/components/cta";
import { caseStudies, site } from "@/lib/content";
import { homeHero, homeSymptoms, serviceAreas } from "@/lib/services";
import { playbookProduct } from "@/lib/playbook";

export default function HomePage() {
  return (
    <>
      <PhotoHero
        src={homeHero.image.src}
        alt={homeHero.image.alt}
        eyebrow={<PhotoChip>{homeHero.kicker}</PhotoChip>}
        title={homeHero.title}
        lead={homeHero.lead}
        actions={
          <>
            <Button href={homeHero.primary.href} variant="light" size="lg">
              {homeHero.primary.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={homeHero.secondary.href} variant="glass" size="lg">
              {homeHero.secondary.label}
            </Button>
          </>
        }
      />

      {/* Before anything about ARC. A visitor should find their own week in
          this list, which is the only reason they will read the next section. */}
      <Section className="bg-brand-subtle/60">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
          <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-display text-balance sm:text-[2.75rem]">
            {homeSymptoms.title}
          </h2>
          <div>
            <Card className="divide-y divide-border/60 overflow-hidden shadow-md">
              {homeSymptoms.items.map((item) => (
                <p
                  key={item}
                  className="px-6 py-4 text-base leading-relaxed text-muted-foreground"
                >
                  {item}
                </p>
              ))}
            </Card>
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
        {/* Each area is a picture of the kind of place the work happens in.
            The detail lives on the area's own page; a visitor choosing between
            four things needs to recognise one, not read all four. */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {serviceAreas.map((area, index) => (
            <Link
              key={area.slug}
              href={`/services/${area.slug}`}
              className="group block"
            >
              <PhotoCard
                src={area.image.src}
                alt={area.image.alt}
                sizes="(min-width: 640px) 50vw, 100vw"
                chips={
                  <PhotoChip>
                    <Icon name={area.icon} className="h-3.5 w-3.5" />
                    <span className="font-mono tracking-[0.14em]">
                      {String(index + 1).padStart(2, "0")} · {area.verb}
                    </span>
                  </PhotoChip>
                }
              >
                <h3 className="text-2xl font-semibold leading-tight tracking-display text-balance sm:text-[1.75rem]">
                  {area.heading}
                </h3>
                <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-on-image/75">
                  {area.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-3">
                  {area.linkLabel}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </PhotoCard>
            </Link>
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
              <Card className="flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <p className="font-mono text-[11px] uppercase tracking-wider text-brand">
                  {study.industry}
                </p>
                <h3 className="mt-3 flex items-start gap-1.5 text-xl font-semibold leading-snug tracking-tight">
                  {study.title}
                  <ArrowUpRight className="mt-1 h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <dl className="mt-6 flex flex-1 flex-wrap items-end gap-x-8 gap-y-4 border-t border-border/60 pt-6">
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
          <Card className="p-7 shadow-md">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
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
