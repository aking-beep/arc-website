import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Check, ExternalLink, Github } from "lucide-react";
import { Container, Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { ProductVisualPanel } from "@/components/product-visual";
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
    title: `${product.name} · ARC Labs`,
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

  const ctaLabel = product.ctaLabel ?? "Open tool";
  const isCatalog = /browse|templates|skills|architectures/i.test(ctaLabel);

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
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                {product.status !== "live" ? (
                  <StatusBadge status={product.status} />
                ) : null}
                {product.badge ? (
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {product.badge}
                  </span>
                ) : (
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Free tool
                  </span>
                )}
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">{product.tagline}</p>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {product.links.app ? (
                  <Button href={product.links.app}>
                    <ExternalLink className="h-4 w-4" />
                    {ctaLabel}
                  </Button>
                ) : null}
                {product.links.github ? (
                  <Button href={product.links.github} variant="outline">
                    <Github className="h-4 w-4" />
                    Source on GitHub
                  </Button>
                ) : null}
                {product.links.docs ? (
                  <Button href={product.links.docs} variant="ghost">
                    <BookOpen className="h-4 w-4" />
                    Documentation
                  </Button>
                ) : null}
              </div>
            </div>
            <ProductVisualPanel visual={product.visual} />
          </div>
        </Container>
      </section>

      <Section className="!border-t-0 !pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What it does</h2>
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

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
            <ol className="mt-6 space-y-3">
              {product.howItWorks.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-border font-mono text-[10px] text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/30 p-6">
            <h2 className="text-lg font-semibold tracking-tight">Who it&rsquo;s for</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {product.audience}
            </p>
          </div>

          {product.roadmap ? (
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">What&rsquo;s next</h2>
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
                          ? "text-sm text-muted-foreground"
                          : "text-sm text-foreground"
                      }
                    >
                      {r.done ? `${r.label} — shipped` : r.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h2 className="text-lg font-semibold tracking-tight">Status</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                This tool is still taking shape. Follow the GitHub org for releases,
                or book a call if you want it prioritized against your stack.
              </p>
            </div>
          )}
        </div>
      </Section>

      <CTA
        title={
          isCatalog
            ? "Want these adapted to your workflows?"
            : "Want ARC to help remediate this?"
        }
        lead={
          isCatalog
            ? "Studio can help you pick, wire, and govern the pieces that match how your team actually works. Book a 30-minute call."
            : "The report is the start. Studio turns findings into a prioritized remediation plan with named owners. Book a 30-minute call."
        }
      />
    </>
  );
}
