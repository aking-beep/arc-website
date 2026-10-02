import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PanelLabel, Takeaway } from "@/components/diagram";
import { FaqList } from "@/components/faq-list";
import { CTA } from "@/components/cta";
import { ark } from "@/lib/ark";
import { digitalTransformation, faqs, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About · Who does the work",
  description:
    "ARC Transformation Group is a senior-led technology practice. Twenty years of Fortune 100 and 500 delivery, and the person on your first call stays on the work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="The person on your first call stays on the work."
        lead="ARC is a senior-led technology practice. Twenty years of Fortune 100 and Fortune 500 programme delivery, applied to companies that cannot afford a consulting army or a year of discovery."
      />

      {/*
        Who does the work, and what they have done, comes before anything about
        how ARC is organised. It is the only part a buyer cannot get elsewhere.
      */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="Who we are"
              title={site.team.title}
              lead={site.team.lead}
            />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <p className="text-base leading-relaxed text-muted-foreground">
                {site.team.bio}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {site.team.scope.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-border bg-background/60 px-4 py-3"
                  >
                    <div className="text-lg font-semibold tracking-tight">
                      {item.metric}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/work" size="sm">
                  See the work
                </Button>
                <Button href="/contact" variant="outline" size="sm">
                  Get in touch
                </Button>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {site.team.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-lg border border-border bg-background/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="How we think about it"
          title="A migration that ignores the people running it is not a migration."
          lead="Most technology work fails somewhere other than the technology. These are the parts we expect to move together, because a change to one of them usually breaks another."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {digitalTransformation.map((item) => (
            <div key={item.name} className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="ARC and ARK"
          title="ARC is the company. ARK is what ARC builds."
          lead="Two names, because they answer two different questions and conflating them makes both harder to trust."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Card className="p-6 sm:p-8">
            <PanelLabel>ARC Transformation Group</PanelLabel>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-balance">
              {site.question}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The company and the commercial relationship. Architecture, data,
              cloud, security, software, delivery and AI — reviewed, designed,
              built and operated.
            </p>
            <Link
              href="/services"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
            >
              What we help with
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
          <Card className="border-brand/30 bg-brand-subtle/50 p-6 sm:p-8">
            <PanelLabel>ARK</PanelLabel>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-balance">
              {ark.question}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The technology we build for the layer where software starts acting
              on its own: agent readiness, outcome assurance, and the fit
              assessments that decide where AI belongs in the first place.
            </p>
            <Link
              href="/platform"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
            >
              Agent infrastructure
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </div>
        <Takeaway className="mt-12 max-w-3xl">{ark.principle}</Takeaway>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="FAQ"
          title="The questions that come up on almost every call."
        />
        <div className="mt-10 max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </Section>

      <CTA
        title="Thirty minutes. No deck."
        lead="We will listen, ask the hard questions, and tell you whether ARC is the right next step — including when it is not."
      />
    </>
  );
}
