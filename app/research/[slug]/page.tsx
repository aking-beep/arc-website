import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpenCheck } from "lucide-react";
import { Container } from "@/components/ui/section";
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

/** Render paragraph text with [n] citation markers as links to #source-n */
function ParagraphWithCitations({ text }: { text: string }) {
  const parts = text.split(/(\[\d+\])/g);
  return (
    <p>
      {parts.map((part, i) => {
        const match = part.match(/^\[(\d+)\]$/);
        if (!match) return <span key={i}>{part}</span>;
        const id = match[1];
        return (
          <a
            key={i}
            href={`#source-${id}`}
            className="text-foreground/80 underline decoration-border underline-offset-2 transition-colors hover:text-foreground"
          >
            [{id}]
          </a>
        );
      })}
    </p>
  );
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
            <span className="rounded-full border border-border px-2.5 py-0.5 font-medium text-foreground/80">
              {article.topic}
            </span>
            <span>{formatDate(article.date)}</span>
            <span>· {article.readingTime} read</span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance">
            {article.title}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
            {article.summary}
          </p>

          <div className="mt-8 rounded-xl border border-border bg-muted/40 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <BookOpenCheck className="h-4 w-4" />
              Key findings
            </div>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              {article.keyFindings.map((finding) => (
                <li key={finding.slice(0, 64)} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="my-10 border-border" />

          <div className="prose-arc space-y-10 text-base leading-relaxed text-muted-foreground">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-foreground">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((p) => (
                    <ParagraphWithCitations key={p.slice(0, 48)} text={p} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-14 border-t border-border pt-10">
            <h2 className="text-xl font-semibold text-foreground">
              Sources & citations
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Primary and secondary sources used in this brief. Open the original
              document to verify claims in context.
            </p>
            <ol className="mt-6 space-y-4">
              {article.sources.map((source) => (
                <li
                  key={source.id}
                  id={`source-${source.id}`}
                  className="scroll-mt-24 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="font-medium text-foreground">
                    [{source.id}]
                  </span>{" "}
                  {source.authors}.{" "}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline decoration-border underline-offset-2 transition-colors hover:decoration-foreground"
                  >
                    {source.title}
                    <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-text-top text-muted-foreground" />
                  </a>
                  . <em>{source.venue}</em>, {source.year}.
                </li>
              ))}
            </ol>
          </section>
        </article>
      </Container>

      <CTA
        title="Want this applied to your operating model?"
        lead="Studio can score these findings against your stack and hand you a sequenced plan with named owners. Book a 30-minute call."
      />
    </>
  );
}
