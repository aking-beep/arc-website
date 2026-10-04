import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PhotoChip, PhotoHero } from "@/components/ui/photo";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Panel, PanelLabel } from "@/components/diagram";
import { CTA } from "@/components/cta";
import { getServiceArea, serviceAreas } from "@/lib/services";
import { advisoryEngagements } from "@/lib/content";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const area = getServiceArea(params.slug);
  if (!area) return {};
  return {
    title: `${area.heading.replace(/\.$/, "")} · ARC`,
    description: area.body,
  };
}

export default function ServiceAreaPage({ params }: Params) {
  const area = getServiceArea(params.slug);
  if (!area) notFound();

  const engagements = area.engagements
    .map((slug) => advisoryEngagements.find((e) => e.slug === slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const others = serviceAreas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <PhotoHero
        src={area.image.src}
        alt={area.image.alt}
        eyebrow={<PhotoChip>{area.verb}</PhotoChip>}
        title={area.heading}
        lead={area.summary}
        height="short"
      />

      {/* The symptoms come before the offer, so a visitor can confirm this is
          their page before reading what we sell. */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              kicker="Sound familiar?"
              title="You are probably here because of one of these."
              lead={area.body}
            />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              If more than two apply, the problem is usually further upstream
              than it looks, and the first conversation is about finding where.
            </p>
          </div>
          <Card className="divide-y divide-border/60 self-start overflow-hidden shadow-md">
            {area.symptoms.map((symptom) => (
              <p
                key={symptom}
                className="px-6 py-4 text-base leading-relaxed text-muted-foreground"
              >
                {symptom}
              </p>
            ))}
          </Card>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading kicker="What you get" title="What arrives." />
            <ul className="mt-8 grid gap-4">
              {area.youGet.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-none text-brand" aria-hidden />
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid content-start gap-5">
            <Panel className="p-6">
              <PanelLabel>Who this is for</PanelLabel>
              <p className="mt-3 text-base leading-relaxed">{area.whoFor}</p>
            </Panel>
            <Panel className="p-6">
              <PanelLabel>When to look elsewhere</PanelLabel>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {area.notFor}
              </p>
            </Panel>
          </div>
        </div>
      </Section>

      {engagements.length ? (
        <Section>
          <SectionHeading
            kicker="Engagements"
            title="How this usually starts."
            lead="These are the scoped reviews that sit behind this work. Each one ends in a plan with owners rather than a document."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {engagements.map((engagement) => (
              <Link
                key={engagement.slug}
                href={`/advisory/${engagement.slug}`}
                className="group block h-full"
              >
                <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {engagement.focus}
                    </span>
                    <span className="font-mono text-xs">{engagement.duration}</span>
                  </div>
                  <h3 className="mt-4 flex items-start gap-1.5 text-lg font-semibold leading-snug tracking-tight">
                    {engagement.name}
                    <ArrowUpRight className="mt-1 h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-2 text-sm font-medium">{engagement.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {engagement.youLeaveWith}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="The other three"
          title="Not quite your problem?"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/services/${other.slug}`}
              className="group block h-full"
            >
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {other.verb}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight">
                  {other.heading}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {other.summary}
                </p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all group-hover:gap-2.5">
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <CTA
        title="Tell us what's happening."
        lead="Thirty minutes is enough to work out whether this needs a small fix, a focused project, or nothing from us at all."
        topic={area.slug}
      />
    </>
  );
}
