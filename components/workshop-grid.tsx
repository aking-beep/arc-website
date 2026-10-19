import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { academy } from "@/lib/content";

/**
 * The three workshops. /consulting and /frameworks both show them, and both
 * used to carry their own copy of this lead sentence.
 */
const workshopCopy = {
  title: "When the room is the problem.",
  lead: "Sometimes the blocker is not the technology, it is that leadership and operators describe the same problem in different words. That is a session rather than a six-week diagnostic.",
};

export function WorkshopGrid({ className }: { className?: string }) {
  return (
    <Section className={className}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          kicker="Workshops"
          title={workshopCopy.title}
          lead={workshopCopy.lead}
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
  );
}
