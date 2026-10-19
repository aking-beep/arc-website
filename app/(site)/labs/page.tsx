import type { Metadata } from "next";
import Link from "next/link";
import { Github } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { StateBadge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { MarketSignals } from "@/components/market-signals";
import { Takeaway } from "@/components/diagram";
import { CTA } from "@/components/cta";
import {
  labGroups,
  labs,
  labsProof,
  site,
  stateLabel,
  stateMeaning,
  type State,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Labs · Open tools, scanners and experiments",
  description:
    "Free Labs tools from ARC: scanners, catalogues and utilities you can run yourself. Most need no account. Every tool carries its state.",
};

/** What each badge commits us to. Stated so the labels mean something. */
const stateKey: State[] = ["available", "beta", "labs", "research", "soon"];

export default function LabsPage() {
  // Only show a label that something carries, so the key never
  // advertises a stage with nothing in it.
  const counts = stateKey
    .map((state) => ({
      state,
      text: stateMeaning[state],
      count: labs.filter((p) => p.state === state).length,
    }))
    .filter((k) => k.count > 0);
  const keyColumns =
    counts.length % 4 === 0
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : counts.length % 3 === 0
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <>
      <PageHero
        kicker="Labs"
        title="Open tools, scanners and experiments."
        lead={`${labsProof.tools} free tools, grouped by the job they do. Most need no account and store nothing. None of them are sold as products. Every one carries its state, so you can tell what is supported before you depend on it.`}
      >
        <Button href={site.github} variant="outline">
          <Github className="h-4 w-4" />
          Browse the GitHub org
        </Button>
      </PageHero>

      <Section>
        <SectionHeading
          kicker="How to read this page"
          title="The labels mean something specific."
          lead="Labs is where work happens before it is a product. Presenting an experiment as infrastructure wastes someone's week, so each project says which it is."
        />
        <dl
          className={`mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border ${keyColumns}`}
        >
          {counts.map((k) => (
            <div key={k.state} className="bg-card p-6">
              <dt className="flex flex-wrap items-center gap-2">
                <StateBadge state={k.state} />
                <span className="font-mono text-[11px] text-muted-foreground">
                  {k.count} {k.count === 1 ? "tool" : "tools"}
                </span>
                <span className="sr-only">{stateLabel[k.state]}</span>
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {k.text}
              </dd>
            </div>
          ))}
        </dl>
        <Takeaway className="mt-12 max-w-3xl">
          Nothing here implies a maturity it does not have. If a tool
          is an experiment, the page says experiment.
        </Takeaway>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Research-stage work has no running implementation behind it yet, so it
          lives on the{" "}
          <Link
            href="/developers"
            className="font-medium text-foreground underline underline-offset-4"
          >
            developer surface
          </Link>{" "}
          rather than here.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The skills, reference-architecture and workflow-template libraries are
          not listed here. They ship as part of the{" "}
          <Link
            href="/playbook"
            className="font-medium text-foreground underline underline-offset-4"
          >
            ARC AI Product Playbook
          </Link>
          , printed in full and filed under the module each one belongs to.
        </p>
      </Section>

      <MarketSignals
        className="bg-muted/30"
        title="Why these tools exist."
        lead="Each tool answers something specific that broke or changed. Here is the dated version with the source, so you can decide whether it applies to you before you run anything."
      />

      {labGroups.map((group, i) => {
        const products = group.slugs
          .map((slug) => labs.find((p) => p.slug === slug))
          .filter((p): p is (typeof labs)[number] => Boolean(p));
        if (products.length === 0) return null;
        return (
          <Section
            key={group.id}
            id={group.id}
            className={`scroll-mt-24${i % 2 === 1 ? " bg-muted/30" : ""}`}
          >
            <SectionHeading title={group.name} lead={group.lead} />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} basePath="/labs" />
              ))}
            </div>
          </Section>
        );
      })}

      <CTA
        title="Need a human to read the report?"
        lead="Advisory turns findings into a plan with owners. Same point of view as the tools. Thirty minutes to see if that is worth it."
      />
    </>
  );
}
