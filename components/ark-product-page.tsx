import type { ReactNode } from "react";
import { ArrowRight, Minus } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { StateBadge } from "@/components/ui/badge";
import { PanelLabel } from "@/components/diagram";
import { PriceBlock } from "@/components/price-block";
import { CTA, type CtaVariant } from "@/components/cta";
import type { ArkProduct } from "@/lib/ark";

/**
 * Shared shell for the product pages.
 *
 * Two blocks are part of the shell rather than optional, so no product page
 * can ship without them: "where this is today" above the fold, and the limits
 * list at the bottom. The price renders whenever the product has one — which
 * is how a page that cannot be bought stays visibly different from one that
 * can, without anybody having to remember a rule.
 */
export function ArkProductPage({
  product,
  prologue,
  artifact,
  children,
  ctaTitle,
  ctaLead,
  ctaVariant = "assessment",
  ctaTopic,
}: {
  product: ArkProduct;
  /** Sections that have to land before the product's own capabilities. */
  prologue?: ReactNode;
  /** The deliverable, shown rather than described. */
  artifact?: ReactNode;
  children?: ReactNode;
  ctaTitle: string;
  ctaLead: string;
  ctaVariant?: CtaVariant;
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
                  ARC
                </span>
                <StateBadge state={product.state} />
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 text-xl leading-relaxed">{product.tagline}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {product.summary}
              </p>
              {product.price ? (
                <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-3xl font-semibold tracking-tight">
                    {product.price.amount}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {product.price.unit} · {product.price.duration}
                  </span>
                </p>
              ) : null}
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

      {artifact ? (
        <Section className="bg-muted/30">
          <SectionHeading
            kicker="The deliverable"
            title="What you are left holding."
            lead="The engagement ends in an object, not a conversation. This is what it looks like."
          />
          <div className="mt-12">{artifact}</div>
        </Section>
      ) : null}

      {product.evaluates ? (
        <Section>
          <SectionHeading
            kicker="What it covers"
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
        <Section className={product.evaluates ? "bg-muted/30" : undefined}>
          <SectionHeading kicker="What you get" title="What the work produces." />
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

      {product.price ? (
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <SectionHeading
              kicker="Price"
              title="One fee, on the page."
              lead="You should not have to book a call to find out what something costs. If the scope changes, the number changes before the work starts, not after."
            />
            <PriceBlock price={product.price}>
              <Button href={product.ctaHref} size="lg">
                {product.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </PriceBlock>
          </div>
        </Section>
      ) : null}

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

      <CTA title={ctaTitle} lead={ctaLead} variant={ctaVariant} topic={ctaTopic} />
    </>
  );
}
