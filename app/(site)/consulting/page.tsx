import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { PanelLabel } from "@/components/diagram";
import { CTA } from "@/components/cta";
import { serviceAreas } from "@/lib/services";
import { academy, advisoryEngagements, howWeEngage, retainers } from "@/lib/content";
import { playbookTiers } from "@/lib/playbook";

export const metadata: Metadata = {
  title: "Consulting · Cloud, data, security, delivery and AI readiness",
  description:
    "The engagements that are not about agents: modernization, automation, build and delivery work, scoped reviews, retainers and workshops.",
};

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        kicker="Consulting"
        title="The rest of the work."
        lead="Most of the value in a technology estate is in the systems already running the business. This is the cloud, data, security and delivery work, plus the AI readiness audit. It is not the first thing on this site any more, and it is still the thing a lot of clients buy."
      />

      <Section>
        <SectionHeading
          kicker="Four areas"
          title="Named the way you would describe your own situation."
          lead="Find the one that sounds like your week. If none of them quite fits, that is normal — working out which it is is part of the first conversation."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {serviceAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/services/${area.slug}`}
              className="group block h-full"
            >
              <Card className="flex h-full flex-col p-7 transition-all hover:border-foreground/20 hover:shadow-sm sm:p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-foreground">
                  <Icon name={area.icon} className="h-5 w-5" />
                </span>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {area.verb}
                </p>
                <h3 className="mt-2 flex items-start gap-1.5 text-2xl font-semibold tracking-tight text-balance">
                  {area.heading}
                  <ArrowUpRight className="mt-1.5 h-5 w-5 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
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
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="How we engage"
          title="Three sizes, and we will tell you which one you need."
          lead="Most work starts with a scoped review, because it is the cheapest way to find out whether the expensive thing is worth doing."
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
      </Section>

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Scoped reviews"
            title="The engagements."
            lead="Each one has a duration and something concrete at the end. Open any of them to see what it starts with, what you receive, and what we can build afterwards."
          />
          <Link
            href="/advisory"
            className="inline-flex flex-none items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            How engagements are shaped
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {advisoryEngagements.map((engagement) => (
            <Link
              key={engagement.slug}
              href={`/advisory/${engagement.slug}`}
              className="group block h-full"
            >
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs font-medium">
                    {engagement.focus}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {engagement.duration}
                  </span>
                </div>
                <h3 className="mt-3 flex items-start gap-1.5 text-lg font-semibold leading-snug tracking-tight">
                  {engagement.name}
                  <ArrowUpRight className="mt-1 h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {engagement.blurb}
                </p>
                <div className="mt-4 border-t border-border/60 pt-4">
                  <PanelLabel>You leave with</PanelLabel>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {engagement.youLeaveWith}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Ongoing"
          title="When a review turns into standing work."
          lead="Three-month minimum, then month to month with 30 days' notice."
        />

        <ul className="mt-12 grid gap-4 lg:hidden">
          {retainers.map((r) => (
            <li key={r.slug} className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-base font-semibold">{r.name}</h3>
              <dl className="mt-3 grid gap-3">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Best fit
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {r.bestFit}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Typical commitment
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {r.commitment}
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-12 hidden overflow-x-auto lg:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th scope="col" className="pb-3 pr-4 font-medium">Engagement</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Best fit</th>
                <th scope="col" className="pb-3 font-medium">Typical commitment</th>
              </tr>
            </thead>
            <tbody>
              {retainers.map((r) => (
                <tr key={r.slug} className="border-b border-border/60">
                  <td className="py-4 pr-4 align-top font-medium">{r.name}</td>
                  <td className="py-4 pr-4 align-top text-muted-foreground">
                    {r.bestFit}
                  </td>
                  <td className="py-4 align-top text-muted-foreground">
                    {r.commitment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Workshops"
            title="When the room is the problem."
            lead="Sometimes the blocker is not the technology, it is that leadership and operators describe the same problem in different words. That is a session rather than a six-week diagnostic."
          />
          <Link
            href="/academy"
            className="inline-flex flex-none items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All workshops
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {academy.map((w) => (
            <Link key={w.slug} href={`/academy/${w.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <h3 className="flex items-center gap-1.5 text-base font-semibold">
                  {w.name}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {w.text}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center lg:gap-16">
          <SectionHeading
            kicker="Side door"
            title="The product playbooks."
            lead={`Written for a founder deciding whether a first AI product should exist — a different reader from the rest of this page. ${playbookTiers
              .map((tier) => `${tier.name} is ${tier.price}`)
              .join(", ")}.`}
          />
          <Card className="p-6 sm:p-8">
            <PanelLabel>Three separate files</PanelLabel>
            <ul className="mt-5 grid gap-3">
              {playbookTiers.map((tier) => (
                <li key={tier.slug}>
                  <Link
                    href={`/playbook/${tier.slug}`}
                    className="flex items-baseline justify-between gap-3 text-sm font-medium hover:underline hover:underline-offset-4"
                  >
                    {tier.name}. {tier.subtitle}
                    <span className="flex-none font-mono text-muted-foreground">
                      {tier.price}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <CTA
        variant="talk"
        title="Tell us what's happening."
        lead="Thirty minutes is enough to work out whether this needs a small fix, a focused project, a larger programme, or nothing from us at all."
        topic="advisory"
      />
    </>
  );
}
