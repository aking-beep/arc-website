import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/badge";
import { CTA } from "@/components/cta";
import { research } from "@/lib/content";

export function generateStaticParams() {
  return research.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = research.find((a) => a.slug === params.slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = research.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <>
      <Container className="py-16 sm:py-20">
        <Link
          href="/research"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          ARC Research
        </Link>

        <article className="mx-auto max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
              {article.kind}
            </span>
            <StatusBadge status={article.status} />
            <span>{formatDate(article.date)}</span>
            <span>· {article.readingTime} read</span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance">
            {article.title}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
            {article.summary}
          </p>

          <hr className="my-10 border-border" />

          <div className="prose-arc space-y-10 text-base leading-relaxed text-muted-foreground">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-foreground">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </Container>

      <CTA
        title="Want this analysis for your systems?"
        lead="ARC Studio can run the same method against your stack and hand you an operator-ready plan. Book a 30-minute call."
      />
    </>
  );
}
