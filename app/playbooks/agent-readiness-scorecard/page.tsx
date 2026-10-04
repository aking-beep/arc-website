import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Scorecard } from "@/components/scorecard";
import { CTA } from "@/components/cta";
import {
  getPlaybook,
  scorecardBands,
  scorecardDimensions,
  scorecardQuestions,
} from "@/lib/learn";

const playbook = getPlaybook("agent-readiness-scorecard");

export const metadata: Metadata = {
  title: "Agent Readiness Scorecard · Can agents operate your systems?",
  description:
    "A free self-assessment across discovery, interfaces, identity, permissions, observability, security and reliability. Scored in your browser. Nothing is stored.",
};

export default function ScorecardPage() {
  if (!playbook) notFound();

  return (
    <>
      <PageHero
        kicker="Free assessment"
        title="Can agents operate your systems?"
        lead={`${scorecardQuestions.length} questions across ${scorecardDimensions.length} dimensions. Scored in your browser, stored nowhere, no email required. Most teams discover the interfaces are further along than the controls behind them.`}
      />

      <Section>
        <Scorecard />
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Bands"
          title="What the score means."
          lead="The middle band is the one to watch. Enough capability to put agents into production, not enough evidence to know what they did."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border/60 shadow-sm ring-1 ring-border/60 dark:ring-border sm:grid-cols-2 lg:grid-cols-4">
          {scorecardBands.map((band) => (
            <li key={band.label} className="bg-card p-6">
              <span className="font-mono text-xs text-muted-foreground">
                {band.min}–{band.max}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {band.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {band.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <CTA
        title="Scored lower than you expected?"
        lead="That is the normal result, and it is usually identity and verification rather than interfaces. Thirty minutes is enough to work out what to fix first."
      />
    </>
  );
}
