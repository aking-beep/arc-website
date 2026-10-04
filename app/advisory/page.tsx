import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { PanelLabel } from "@/components/diagram";
import { AlternativesTable } from "@/components/alternatives-table";
import { FaqList } from "@/components/faq-list";
import { CTA } from "@/components/cta";
import {
  advisoryEngagements,
  bestFit,
  faqs,
  howWeEngage,
  notAFit,
  retainers,
} from "@/lib/content";
import { serviceAreas } from "@/lib/services";

export const metadata: Metadata = {
  title: "How we work · Scoped reviews, then delivery",
  description:
    "Most work with ARC starts as a two-to-seven week scoped review that ends in a plan with named owners. If the plan still needs hands on it, we stay and build.",
};

/**
 * Engagements are grouped by the service area that sends you to them, so this
 * page reads as the mechanics behind /services rather than a second, competing
 * list of what we sell.
 */
const groups = serviceAreas
  .map((area) => ({
    area,
    engagements: area.engagements
      .map((slug) => advisoryEngagements.find((e) => e.slug === slug))
      .filter((e): e is NonNullable<typeof e> => Boolean(e)),
  }))
  .filter((group) => group.engagements.length > 0);

export default function AdvisoryPage() {
  return (
    <>
      <PageHero
        kicker="How we work"
        title="Start small. Find out what the problem costs before you fund the fix."
        lead="Most work begins as a scoped review of two to seven weeks, ending in a plan with named owners and a sequence of spend. If the plan still needs hands on it, we stay and build it."
      />

      <Section>
        <SectionHeading
          kicker="Three sizes"
          title="How engagements are shaped."
          lead="We size the work from the problem. The call exists to find that size, which sometimes turns out to be nothing."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {howWeEngage.map((item, index) => (
            <Card key={item.name} className="flex h-full flex-col p-6 sm:p-7">
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {item.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="engagements" className="scroll-mt-24 bg-muted/30">
        <SectionHeading
          kicker="Scoped reviews"
          title="The reviews, grouped by the problem they answer."
          lead="Each one has a duration and something concrete at the end. Open any of them to see what it starts with, what you receive, and what we can build afterwards."
        />
        <div className="mt-12 grid gap-12">
          {groups.map(({ area, engagements }) => (
            <div key={area.slug}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
                <h3 className="text-xl font-semibold tracking-tight">
                  {area.heading}
                </h3>
                <Link
                  href={`/services/${area.slug}`}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {area.verb} →
                </Link>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {engagements.map((engagement) => (
                  <Link
                    key={engagement.slug}
                    href={`/advisory/${engagement.slug}`}
                    className="group block h-full"
                  >
                    <Card className="flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs font-medium">
                          {engagement.focus}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {engagement.duration}
                        </span>
                      </div>
                      <h4 className="mt-3 flex items-start gap-1.5 text-lg font-semibold leading-snug tracking-tight">
                        {engagement.name}
                        <ArrowUpRight className="mt-1 h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </h4>
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
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="Ongoing"
          title="When a review turns into standing work."
          lead="Three-month minimum, then month to month with 30 days' notice."
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Engagement</th>
                <th className="pb-3 pr-4 font-medium">Best fit</th>
                <th className="pb-3 font-medium">Typical commitment</th>
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

      <AlternativesTable />

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
                <li key={b} className="text-base leading-relaxed text-muted-foreground">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <figure className="mt-14 border-l-2 border-brand pl-6">
          <blockquote className="max-w-2xl text-xl font-medium leading-relaxed text-balance">
            &ldquo;Selling someone a build when they haven&rsquo;t figured out the
            problem yet is malpractice. We won&rsquo;t do it, even when the budget
            says we could.&rdquo;
          </blockquote>
        </figure>
      </Section>

      <Section>
        <SectionHeading
          kicker="FAQ"
          title="Before the call."
          lead="If it is not here, ask it on the call. That is what the thirty minutes are for."
        />
        <div className="mt-10 max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </Section>

      <CTA
        title="Tell us what's happening."
        lead="A 30-minute call is enough to tell you whether a scoped review is the right first step, and what size of engagement the problem needs."
        topic="advisory"
      />
    </>
  );
}
