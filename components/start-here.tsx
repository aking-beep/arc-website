import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StateBadge } from "@/components/ui/badge";
import { assessment } from "@/lib/ark";
import { scorecardDimensions, scorecardQuestions } from "@/lib/learn";

/**
 * Free first, paid second. /agents and /assessment both make this offer and
 * both used to carry their own copy of the two cards.
 *
 * `paidVariant` is the one real difference: the agents hub sells the
 * assessment, while the assessment page is already the assessment and points
 * at the scorecard instead.
 */
export function StartHere({
  className,
  secondary = "assessment",
}: {
  className?: string;
  secondary?: "assessment" | "scorecard";
}) {
  return (
    <Section className={className}>
      <SectionHeading
        kicker={secondary === "assessment" ? "Start here" : "Before you buy anything"}
        title={
          secondary === "assessment"
            ? "Free first. Paid only if the answer is uncomfortable."
            : "Two free ways to find out whether you need this."
        }
        lead={
          secondary === "assessment"
            ? undefined
            : "Both are complete on their own page. Most people run one of them and never speak to us, which is a good outcome."
        }
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Card className="flex h-full flex-col p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StateBadge state="labs" />
            <span className="font-mono text-xs">Free</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">
            Agent access scan
          </h3>
          <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
            Describe your agents, tools and permissions in plain language and
            get a graded report back. Deterministic rules, every finding
            quoting your own words, nothing stored.
          </p>
          <div className="mt-7">
            <Button
              href="/labs/arc-agent-governance"
              variant={secondary === "assessment" ? "primary" : "outline"}
            >
              Run the scan
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {secondary === "assessment" ? (
          <Card className="flex h-full flex-col p-8 ring-1 ring-foreground/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StateBadge state={assessment.state} />
              <span className="font-mono text-xs">
                {assessment.price?.amount} · {assessment.price?.duration}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">
              {assessment.name}
            </h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
              {assessment.summary}
            </p>
            <div className="mt-7">
              <Button href={assessment.href} variant="outline">
                See what is in it
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="flex h-full flex-col p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StateBadge state="available" />
              <span className="font-mono text-xs">Free</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">
              Readiness scorecard
            </h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
              {scorecardQuestions.length} questions across{" "}
              {scorecardDimensions.length} dimensions, scored in your browser.
              Self-reported, so treat it as a starting point rather than
              evidence.
            </p>
            <div className="mt-7">
              <Button href="/frameworks/agent-readiness-scorecard" variant="outline">
                Run the scorecard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Section>
  );
}
