import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/arc/ui/container";
import { SectionIntro } from "@/components/arc/ui/section-intro";
import { ArcButton } from "@/components/arc/ui/button";
import { ArcMaturityBadge } from "@/components/arc/ui/maturity-badge";
import { homepageLabProducts } from "@/lib/arc/products";
import { control, controlCapabilities } from "@/lib/arc/control";

/**
 * ARC Control alongside the tools you can use today. Ported from the
 * prototype's `home/FeaturedProducts`; the Labs panel reads the real
 * catalogue, so every link here is one this repository already publishes.
 */
export function FeaturedProducts() {
  return (
    <section
      aria-labelledby="prod-title"
      className="border-t border-line bg-paper py-20 sm:py-24"
    >
      <Container>
        <SectionIntro
          id="prod-title"
          eyebrow="Featured products"
          title="One platform in development. Tools you can use today."
          lead="Every product shows its real status. Where something is open source, the code is linked."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <article className="dark-surface flex flex-col rounded-xl bg-night p-7 text-mist sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-serif text-[30px] leading-tight">ARC Control</h3>
              <ArcMaturityBadge maturity={control.maturity} onDark />
            </div>
            <p className="mt-4 max-w-[480px] text-[16.5px] leading-relaxed text-mist-2">
              Know what your agents attempted, what authority they used, and whether the intended
              outcome actually happened, with evidence from the systems that were supposed to
              change.
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-night-line pt-6 text-[14.5px] text-mist sm:grid-cols-2">
              {controlCapabilities.map((c) => (
                <li key={c.name} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brand-on-dark"
                  />
                  {c.name}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[13.5px] leading-relaxed text-mist-2">
              Not available to buy. We are working through the verification model with a small
              number of teams running agents against production systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-auto lg:pt-6">
              <ArcButton href="/control" variant="onDark" arrow>
                Explore ARC Control
              </ArcButton>
            </div>
          </article>

          <div className="flex flex-col rounded-xl border border-line bg-canvas">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h3 className="text-[15px] font-semibold text-ink">From ARC Labs</h3>
              <Link
                href="/labs"
                className="inline-flex items-center gap-1 text-[13.5px] font-medium text-brand hover:underline"
              >
                All projects <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <ul className="flex-1 divide-y divide-line">
              {homepageLabProducts.map((p) => (
                <li key={p.slug} className="px-6 py-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-[15.5px] font-semibold text-ink">
                      <Link href={p.href} className="hover:text-brand">
                        {p.name}
                      </Link>
                    </h4>
                    <ArcMaturityBadge maturity={p.maturity} />
                  </div>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{p.tagline}</p>
                  <div className="mt-2.5 flex gap-4 text-[13px] font-medium">
                    {p.app ? (
                      <a
                        href={p.app}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-brand hover:underline"
                      >
                        Open tool <ArrowUpRight size={13} aria-hidden="true" />
                        <span className="sr-only">{p.name} (opens in a new tab)</span>
                      </a>
                    ) : null}
                    {p.github ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-ink-2 hover:text-ink"
                      >
                        GitHub <ArrowUpRight size={13} aria-hidden="true" />
                        <span className="sr-only">for {p.name} (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
