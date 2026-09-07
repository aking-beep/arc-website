import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { marketSignals, marketSignalsUpdated } from "@/lib/content";

function formatSignalDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function MarketSignals({
  className,
  title = "What changed in the last month.",
  lead = "The market moved under a lot of AI plans this summer. These are the changes we think actually alter what an operator should do next — dated, sourced, and pointed at the tool or brief that answers them.",
}: {
  className?: string;
  title?: string;
  lead?: string;
}) {
  return (
    <Section className={className}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading kicker="Market signals" title={title} lead={lead} />
        <p className="flex-none text-sm text-muted-foreground">
          Reviewed {formatSignalDate(marketSignalsUpdated)}
        </p>
      </div>
      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {marketSignals.map((signal) => (
          <li key={signal.headline} className="h-full">
            <Card className="flex h-full flex-col p-6">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
                  {signal.label}
                </span>
                <time dateTime={signal.date} className="font-mono">
                  {formatSignalDate(signal.date)}
                </time>
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug">
                {signal.headline}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {signal.soWhat}
              </p>
              <Link
                href={signal.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
              >
                {signal.hrefLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-4 grid gap-1.5 border-t border-border/60 pt-4">
                {signal.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="mt-0.5 h-3 w-3 flex-none" />
                    <span>{source.name}</span>
                  </a>
                ))}
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
