import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CTA } from "@/components/cta";
import { getAdvisoryEngagementBySlug, advisoryEngagements } from "@/lib/content";

export function generateStaticParams() {
  return advisoryEngagements.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const offering = getAdvisoryEngagementBySlug(params.slug);
  if (!offering) return {};
  return {
    title: `${offering.name} · ARC Advisory`,
    description: offering.tagline,
  };
}

export default function AdvisoryEngagementPage({
  params,
}: {
  params: { slug: string };
}) {
  const offering = getAdvisoryEngagementBySlug(params.slug);
  if (!offering) notFound();

  return (
    <>
      <Container className="py-16 sm:py-20">
        <Link
          href="/advisory"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          ARC Advisory
        </Link>

        <article className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
              {offering.focus}
            </span>
            <span>{offering.duration}</span>
            {offering.flagship ? (
              <span className="rounded-full border border-border bg-background px-2.5 py-0.5 font-medium uppercase tracking-wider">
                Flagship
              </span>
            ) : null}
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance">
            {offering.name}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
            {offering.tagline}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {offering.blurb}
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Card className="p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Starts with
              </h2>
              <p className="mt-2 text-sm leading-relaxed">{offering.startsWith}</p>
            </Card>
            <Card className="p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                You leave with
              </h2>
              <p className="mt-2 text-sm leading-relaxed">{offering.youLeaveWith}</p>
            </Card>
          </div>

          <hr className="my-12 border-border" />

          <section>
            <SectionHeading kicker="Fit" title="Is this for you?" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {offering.whoFor}
            </p>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Probably not if
            </h3>
            <ul className="mt-4 space-y-3">
              {offering.notFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="mt-1 h-4 w-4 flex-none text-muted-foreground" />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <SectionHeading kicker="Deliverables" title="What you receive." />
            <ul className="mt-6 space-y-3">
              {offering.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-none text-emerald-500" />
                  <span className="text-base leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <SectionHeading
              kicker="Build options"
              title="What we can deliver after."
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The diagnostic is the front door. If the roadmap still needs hands on
              the work, these are the typical next steps — scoped from the problem,
              not from a menu.
            </p>
            <ul className="mt-6 space-y-3">
              {offering.buildOptions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-none text-emerald-500" />
                  <span className="text-base leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <SectionHeading
              kicker="Scoping to delivery"
              title="How the engagement runs."
            />
            <ol className="mt-6 space-y-4">
              {offering.scoping.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-relaxed text-muted-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {offering.typicalFollowOn ? (
            <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6">
              <h2 className="text-lg font-semibold tracking-tight">
                Typical follow-on
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {offering.typicalFollowOn}
              </p>
            </div>
          ) : null}
        </article>
      </Container>

      <CTA
        title={`Want to talk about the ${offering.name}?`}
        lead="A 30-minute call is enough to tell you whether this is the right first step — and what size of engagement the problem actually needs."
      />
    </>
  );
}
