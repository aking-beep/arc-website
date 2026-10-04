import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Photo, PhotoChip } from "@/components/ui/photo";
import { Icon } from "@/components/icon";
import { CTA } from "@/components/cta";
import { serviceAreas } from "@/lib/services";
import { howWeEngage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services · Four things we help with",
  description:
    "Modernize what is slowing the business down, automate the work worth automating, build what you need, and make automated systems reliable enough to run on.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Four things we help with."
        lead="Find the one that sounds like your situation. If none of them quite fit, that is normal — most problems arrive as a symptom rather than a category, and working out which one it is is part of the first conversation."
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          {serviceAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/services/${area.slug}`}
              className="group block h-full"
            >
              {/* The picture leads, the detail follows underneath it. The
                  homepage uses full-bleed photo tiles; this page has more to
                  say per card, so the image takes the top third instead. */}
              <Card className="flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[16/9]">
                  <Photo
                    src={area.image.src}
                    alt={area.image.alt}
                    scrim="even"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute bottom-4 left-5">
                    <PhotoChip>
                      <Icon name={area.icon} className="h-3.5 w-3.5" />
                      <span className="font-mono tracking-[0.14em]">
                        {area.verb.toUpperCase()}
                      </span>
                    </PhotoChip>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <h2 className="text-2xl font-semibold leading-tight tracking-display text-balance">
                    {area.heading}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {area.body}
                  </p>
                  <ul className="mt-6 grid flex-1 gap-2 border-t border-border/60 pt-5">
                    {area.symptoms.slice(0, 3).map((symptom) => (
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
                  <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all group-hover:gap-2.5">
                    {area.linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="How we engage"
          title="Three sizes, and we will tell you which one you need."
          lead="Most work starts with a scoped review because it is the cheapest way to find out whether the expensive thing is worth doing."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {howWeEngage.map((mode, index) => (
            <Card key={mode.name} className="flex h-full flex-col p-6 sm:p-7">
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {mode.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {mode.text}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/advisory"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            See the engagements and what each one costs you in time
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CTA
        title="Tell us what's happening."
        lead="Thirty minutes is enough to work out which of the four this is, and whether it needs a small fix, a focused project or nothing from us at all."
      />
    </>
  );
}
