import type { ReactNode } from "react";
import { ArrowRight, Minus } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MaturityBadge } from "@/components/ui/badge";
import { PanelLabel } from "@/components/diagram";
import { CTA } from "@/components/cta";
import type { ArkProduct } from "@/lib/ark";

/**
 * Shared shell for the agent-infrastructure product pages. The "where this is today"
 * block is part of the shell rather than optional, so no product page can
 * ship without stating its maturity above the fold.
 */
export function ArkProductPage({
  product,
  prologue,
  capabilitiesClassName,
  children,
  ctaTitle,
  ctaLead,
  ctaTopic,
}: {
  product: ArkProduct;
  /** Sections that have to land before the product's own capabilities. */
  prologue?: ReactNode;
  /** Set when a prologue changes which background the capabilities land on. */
  capabilitiesClassName?: string;
  children?: ReactNode;
  ctaTitle?: string;
  ctaLead?: string;
  ctaTopic?: string;
}) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <Container className="relative py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  ARC product
                </span>
                <MaturityBadge maturity={product.maturity} />
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 text-xl leading-relaxed">{product.tagline}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {product.summary}
              </p>
              <div className="mt-8">
                <Button href={product.ctaHref} size="lg">
                  {product.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <aside className="rounded-xl border border-brand/30 bg-brand-subtle/60 p-6 sm:p-8">
              <PanelLabel>{product.todayLabel}</PanelLabel>
              <p className="mt-4 text-base leading-relaxed">{product.today}</p>
            </aside>
          </div>
        </Container>
      </section>

      <Section>
        <div className="max-w-3xl space-y-5">
          {product.intro.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {prologue}

      {product.evaluates ? (
        <Section className="bg-muted/30">
          <SectionHeading
            kicker="What it evaluates"
            title="Three layers, assessed separately."
            lead="A system can have a clean interface and no way to say who did what. These fail independently, so they are scored independently."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-3">
            {product.evaluates.map((group) => (
              <div key={group.group} className="bg-card p-6 sm:p-8">
                <PanelLabel>{group.group}</PanelLabel>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {product.capabilities ? (
        <Section
          className={
            capabilitiesClassName ??
            (product.evaluates ? undefined : "bg-muted/30")
          }
        >
          <SectionHeading
            kicker="What you get"
            title="What the product produces."
          />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {product.capabilities.map((c) => (
              <div key={c.name} className="bg-card p-6">
                <dt className="text-sm font-semibold">{c.name}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.text}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      {children}

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Limits"
          title="What this is not."
          lead="Stated on the page rather than discovered in month three."
        />
        <ul className="mt-10 grid max-w-3xl gap-4">
          {product.limits.map((limit) => (
            <li key={limit} className="flex items-start gap-3">
              <Minus className="mt-1 h-4 w-4 flex-none text-muted-foreground" />
              <span className="text-base leading-relaxed text-muted-foreground">
                {limit}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <CTA title={ctaTitle} lead={ctaLead} topic={ctaTopic} />
    </>
  );
}
