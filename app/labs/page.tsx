import type { Metadata } from "next";
import Link from "next/link";
import { Github } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MaturityBadge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { MarketSignals } from "@/components/market-signals";
import { Takeaway } from "@/components/diagram";
import { CTA } from "@/components/cta";
import {
  labGroups,
  labs,
  labsProof,
  maturityLabel,
  site,
  type Maturity,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "ARK Labs · Open tools, scanners and experiments",
  description:
    "Free ARK Labs tools: scanners, catalogues and utilities you can run yourself. Most need no account. Every project carries its real maturity.",
};

/** What each badge actually commits us to. Stated so the labels mean something. */
const maturityKey: { maturity: Maturity; text: string }[] = [
  {
    maturity: "open-source",
    text: "Source is published, usually MIT. Read the rules, disagree with them, open a pull request.",
  },
  {
    maturity: "alpha",
    text: "Works and is in use, but the surface is still moving. Do not wire it into something you cannot unwire.",
  },
  {
    maturity: "experiment",
    text: "We are finding out whether the approach is sound. Treat the output as a prompt for a conversation, not a verdict.",
  },
  {
    maturity: "research",
    text: "Thinking published without a running implementation behind it.",
  },
];

export default function LabsPage() {
  // Only show a label that something actually carries, so the key never
  // advertises a stage with nothing in it.
  const counts = maturityKey
    .map((k) => ({
      ...k,
      count: labs.filter((p) => p.maturity === k.maturity).length,
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
        kicker="ARK Labs"
        title="Open tools, scanners and experiments."
        lead={`${labsProof.tools} free tools, grouped by the job they do. Most need no account and store nothing. None of them are sold as products — every one carries its real maturity, so you can tell what is supported before you depend on it.`}
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
            <div key={k.maturity} className="bg-card p-6">
              <dt className="flex flex-wrap items-center gap-2">
                <MaturityBadge maturity={k.maturity} />
                <span className="font-mono text-[11px] text-muted-foreground">
                  {k.count} {k.count === 1 ? "project" : "projects"}
                </span>
                <span className="sr-only">{maturityLabel[k.maturity]}</span>
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {k.text}
              </dd>
            </div>
          ))}
        </dl>
        <Takeaway className="mt-12 max-w-3xl">
          Nothing here implies production maturity it does not have. If a tool
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
          no longer listed here. They ship as part of the{" "}
          <Link
            href="/playbook"
            className="font-medium text-foreground underline underline-offset-4"
          >
            ARC AI Product Playbook
          </Link>
          , curated and tied to the module they belong to. The raw catalogs stay
          MIT licensed and public on GitHub.
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
