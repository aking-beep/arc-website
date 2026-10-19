import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { PanelLabel } from "@/components/diagram";
import { caseStudies, site } from "@/lib/content";

/**
 * Two kinds of proof, kept apart on purpose.
 *
 * `kind` has distinguished delivery history from ARC's own engagements in the
 * data for a while, and nothing rendered it — so three Fortune 100/500
 * programmes delivered at previous employers sat in the same grid as ARC's
 * own work. A reader could reasonably have concluded those organisations
 * bought something from ARC. None of them did.
 *
 * The separation is not cosmetic and should not be collapsed back.
 */
export const proofDisclaimer =
  "Delivered by our team in prior roles at those organisations. They are not ARC clients and did not buy ARC products.";

export function CaseStudyGroup({
  kind,
  title,
  lead,
  disclaimer,
  className,
}: {
  kind: "career" | "arc";
  title: string;
  lead: string;
  disclaimer?: string;
  className?: string;
}) {
  const studies = caseStudies.filter((c) => c.kind === kind);
  if (studies.length === 0) return null;

  return (
    <Section className={className}>
      <SectionHeading
        kicker={kind === "career" ? "Team delivery history" : "ARC engagements"}
        title={title}
        lead={lead}
      />

      {disclaimer ? (
        <p className="mt-6 max-w-2xl rounded-lg border border-border bg-muted/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
          {disclaimer}
        </p>
      ) : null}

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {studies.map((study) => (
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
  );
}

/**
 * Product proof, which does not exist yet.
 *
 * Saying so is better than an empty section and far better than a fabricated
 * one. The list names what will go here once there is something to count.
 */
const plannedMetrics = [
  "Assessments completed",
  "Systems scanned",
  "MCP servers scanned",
  "Findings generated",
  "Workflows assessed",
  "Agent actions evaluated",
  "Verified outcomes",
  "Open-source adoption",
];

export function ProductProof({ className }: { className?: string }) {
  return (
    <Section className={className}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
        <SectionHeading
          kicker="Product proof"
          title="We have not published usage numbers, because we do not have them yet."
          lead="The delivery history above is our team's. It is not evidence that the products work at scale, and presenting it that way would be the easiest lie on this site."
        />
        <div>
          <Card className="p-6 sm:p-8">
            <PanelLabel>What will go here</PanelLabel>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {plannedMetrics.map((metric) => (
                <li
                  key={metric}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full border border-muted-foreground"
                  />
                  {metric}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border/60 pt-5 text-sm leading-relaxed text-muted-foreground">
              Each one will carry a date and a method when it appears. Until
              then the honest number is none. The open tools are on{" "}
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline underline-offset-4"
              >
                GitHub
              </a>{" "}
              if you would rather read the code than a metric.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}
