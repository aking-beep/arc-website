import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { CTA } from "@/components/cta";
import { academy } from "@/lib/content";

export function generateStaticParams() {
  return academy.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const workshop = academy.find((w) => w.slug === params.slug);
  if (!workshop) return {};
  return { title: `${workshop.name} · Academy`, description: workshop.text };
}

export default function WorkshopPage({
  params,
}: {
  params: { slug: string };
}) {
  const workshop = academy.find((w) => w.slug === params.slug);
  if (!workshop) notFound();

  return (
    <>
      <Container className="py-16 sm:py-20">
        <Link
          href="/academy"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          ARC Academy
        </Link>

        <article className="mx-auto max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
              Workshop
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance">
            {workshop.name}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
            {workshop.text}
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {workshop.detail}
          </p>

          <hr className="my-10 border-border" />

          <section>
            <SectionHeading kicker="Who it's for" title="Bring this if it sounds familiar." />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {workshop.whoFor}
            </p>
          </section>

          <section className="mt-12">
            <SectionHeading kicker="Objectives" title="What the day is for." />
            <ul className="mt-6 space-y-3">
              {workshop.objectives.map((item) => (
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
            <SectionHeading kicker="Curriculum" title="How we spend the time." />
            <ol className="mt-6 space-y-4">
              {workshop.curriculum.map((item, i) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12">
            <SectionHeading kicker="Outcomes" title="What you leave with." />
            <ul className="mt-6 space-y-3">
              {workshop.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-none text-emerald-500" />
                  <span className="text-base leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </Container>

      <CTA
        title="Want this workshop for your team?"
        lead="Tell us the decision you need to make. We'll scope the session against your real systems and who has to be in the room."
      />
    </>
  );
}
