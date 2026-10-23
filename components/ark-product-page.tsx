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
      <section className="border-b border-line">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[13px] text-brand">ARC product</span>
                <MaturityBadge maturity={product.maturity} />
              </div>
              <h1 className="mt-5 font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-balance text-ink sm:text-[56px]">
                {product.name}
              </h1>
              <p className="mt-6 text-[19px] leading-relaxed text-ink">{product.tagline}</p>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-pretty text-ink-2">
                {product.summary}
              </p>
              <div className="mt-8">
                <Button href={product.ctaHref} size="lg">
                  {product.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <aside className="rounded-xl border border-brand/30 bg-brand-subtle p-6 sm:p-8">
              <PanelLabel>{product.todayLabel}</PanelLabel>
              <p className="mt-4 text-[15px] leading-relaxed text-ink">{product.today}</p>
            </aside>
          </div>
        </Container>
      </section>

      <Section>
        <div className="max-w-[720px] space-y-5">
          {product.intro.map((paragraph) => (
            <p key={paragraph} className="text-[17px] leading-relaxed text-pretty text-ink-2">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {prologue}

      {product.evaluates ? (
        <Section className="bg-paper">
          <SectionHeading
            kicker="What it evaluates"
            title="Three layers, assessed separately."
            lead="A system can have a clean interface and no way to say who did what. These fail independently, so they are scored independently."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-3">
            {product.evaluates.map((group) => (
              <div key={group.group} className="bg-canvas p-6 sm:p-8">
                <PanelLabel>{group.group}</PanelLabel>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-paper px-2.5 py-1 font-mono text-[11.5px] text-ink-2"
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
            (product.evaluates ? undefined : "bg-paper")
          }
        >
          <SectionHeading
            kicker="What you get"
            title="What the product produces."
          />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {product.capabilities.map((c) => (
              <div key={c.name} className="bg-canvas p-6">
                <dt className="text-[15px] font-semibold text-ink">{c.name}</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-ink-2">
                  {c.text}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      {children}

      <Section className="bg-paper">
        <SectionHeading
          kicker="Limits"
          title="What this is not."
          lead="Stated on the page rather than discovered in month three."
        />
        <ul className="mt-10 grid max-w-3xl gap-4">
          {product.limits.map((limit) => (
            <li key={limit} className="flex items-start gap-3">
              <Minus className="mt-1 h-4 w-4 flex-none text-ink-3" aria-hidden="true" />
              <span className="text-[15.5px] leading-relaxed text-ink-2">{limit}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CTA title={ctaTitle} lead={ctaLead} topic={ctaTopic} />
    </>
  );
}
