import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Check, Github, Play } from "lucide-react";
import { Container, Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { CTA } from "@/components/cta";
import { labs } from "@/lib/content";

export function generateStaticParams() {
  return labs.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = labs.find((p) => p.slug === params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — ARC Labs`,
    description: product.description,
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = labs.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <Container className="relative py-16 sm:py-20">
          <Link
            href="/labs"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            ARC Labs
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <StatusBadge status={product.status} />
              {product.badge ? (
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {product.badge}
                </span>
              ) : null}
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">{product.tagline}</p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {product.links.demo ? (
                <Button href={product.links.demo}>
                  <Play className="h-4 w-4" />
                  Live demo
                </Button>
              ) : null}
              {product.links.github ? (
                <Button href={product.links.github} variant="outline">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              ) : null}
              {product.links.docs ? (
                <Button href={product.links.docs} variant="ghost">
                  <BookOpen className="h-4 w-4" />
                  Docs
                </Button>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {/* Screenshot placeholder */}
      <Container className="py-12">
        <div className="flex aspect-[16/9] w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          Product screenshot / architecture diagram goes here
        </div>
      </Container>

      <Section className="!border-t-0 !pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              What it does
            </h2>
            <ul className="mt-6 space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {product.roadmap ? (
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Roadmap</h2>
              <ul className="mt-6 space-y-3">
                {product.roadmap.map((r) => (
                  <li key={r.label} className="flex items-center gap-3">
                    <span
                      className={
                        r.done
                          ? "flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
                          : "flex h-5 w-5 flex-none items-center justify-center rounded-full border border-border text-muted-foreground"
                      }
                    >
                      {r.done ? <Check className="h-3 w-3" /> : null}
                    </span>
                    <span
                      className={
                        r.done
                          ? "text-sm text-muted-foreground line-through"
                          : "text-sm text-foreground"
                      }
                    >
                      {r.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Section>

      <CTA
        title="Want this run against your systems?"
        lead="ARC Studio takes what the tools surface and turns it into a prioritized, operator-ready plan. Book a 30-minute call."
      />
    </>
  );
}
