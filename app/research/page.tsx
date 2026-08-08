import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { CTA } from "@/components/cta";
import { research } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research — Benchmarks & industry reports",
  description:
    "ARC Intelligence publishes benchmarks, teardowns, and reports in plain language with real numbers — not vendor gloss.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ResearchPage() {
  return (
    <>
      <PageHero
        kicker="ARC Intelligence"
        title="We publish what we learn."
        lead="Benchmarks, teardowns, and industry reports written the way we write everything: plain language, real numbers, assumptions labeled. If we can't source it, we say so."
      />

      <Section>
        <SectionHeading kicker="Latest" title="Research & benchmarks" />
        <div className="mt-12 grid gap-5">
          {research.map((a) => (
            <Link key={a.slug} href={`/research/${a.slug}`} className="group block">
              <Card className="flex flex-col gap-4 p-6 transition-all hover:border-foreground/20 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
                      {a.kind}
                    </span>
                    <StatusBadge status={a.status} />
                    <span>{formatDate(a.date)}</span>
                    <span>· {a.readingTime} read</span>
                  </div>
                  <h3 className="mt-3 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                    {a.title}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.summary}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <CTA
        title="Want the raw data?"
        lead="Our benchmarks are built on ARC Labs tools you can run yourself. Reach out if you'd like the methodology or a custom cut for your industry."
      />
    </>
  );
}
