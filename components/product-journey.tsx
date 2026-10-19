import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { StateBadge } from "@/components/ui/badge";
import { productJourney } from "@/lib/ark";
import { cn } from "@/lib/utils";

/**
 * Decide, prepare, verify.
 *
 * The three products in the order a buyer meets them, each carrying its own
 * state. Only the middle one can be bought today, and the cards say so rather
 * than leaving a reader to infer it from the CTA.
 */
export function ProductJourney({
  className,
  kicker = "The sequence",
}: {
  className?: string;
  kicker?: string;
}) {
  return (
    <Section className={className}>
      <SectionHeading
        kicker={kicker}
        title="Decide, prepare, verify."
        lead="Three questions in the order they actually arrive. Most organisations are somewhere in the first two, and the third is still research."
      />

      <ol className="mt-12 grid gap-5 lg:grid-cols-3">
        {productJourney.map((stage, i) => (
          <li key={stage.name} className="relative">
            <Link href={stage.href} className="group block h-full">
              <Card
                className={cn(
                  "flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm sm:p-7",
                  stage.state === "available" && "ring-1 ring-brand/25",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} · {stage.step}
                  </span>
                  <StateBadge state={stage.state} />
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {stage.name}
                </h3>
                <p className="mt-2 text-base font-medium leading-snug">
                  {stage.question}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {stage.purpose}
                </p>
                {stage.note ? (
                  <p className="mt-5 border-t border-border/60 pt-4 text-sm leading-relaxed text-muted-foreground">
                    {stage.note}
                  </p>
                ) : null}
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all group-hover:gap-2.5">
                  {stage.name}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Card>
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Agent Readiness is the one you can buy. AI Fit is a free tool. Agent
        Control is research, and this page will say something different on the
        day that changes.
      </p>
    </Section>
  );
}
