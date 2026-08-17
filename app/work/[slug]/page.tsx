import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Container, Section } from "@/components/ui/section";
import { CTA } from "@/components/cta";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = caseStudies.find((c) => c.slug === params.slug);
  if (!study) return {};
  return { title: `${study.title} · Case study`, description: study.summary };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = caseStudies.find((c) => c.slug === params.slug);
  if (!study) notFound();

  return (
    <>
      <Container className="py-16 sm:py-20">
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Work
          </Link>
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
              {study.kind === "composite" ? "Composite example" : "Case study"}
            </span>
            <span>{study.industry}</span>
          </div>
          <p className="mt-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {study.client}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {study.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {study.summary}
          </p>
        </div>

        {/* Outcomes */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {study.outcomes.map((o) => (
            <div key={o.label} className="bg-card p-6">
              <div className="text-3xl font-semibold tracking-tight">
                {o.metric}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{o.label}</p>
            </div>
          ))}
        </div>
      </Container>

      <Section className="!border-t-0 !pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">The challenge</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {study.challenge}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Our approach</h2>
            <ul className="mt-4 space-y-3">
              {study.approach.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CTA
        title="Want this shape of engagement?"
        lead="We'll tell you on a 30-minute call whether a diagnostic, a narrower review, or a workshop is the right first step — including if the answer is none of those."
      />
    </>
  );
}
