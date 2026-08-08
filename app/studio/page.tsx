import type { Metadata } from "next";
import { Check, Info } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CTA } from "@/components/cta";
import { services, stages, principles, bestFit } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio — Advisory & delivery",
  description:
    "ARC Studio is an advisory and delivery partner for small and mid-sized companies. Nine focused services, five honest stages, and outcomes you can measure.",
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        kicker="ARC Studio"
        title="Strategy that aligns. Work that delivers."
        lead="An advisory and delivery partner for small and mid-sized companies. We start with strategy that lines up with what you're actually trying to do, deliver the work in honest stages, and measure the outcomes that matter."
      />

      {/* Stages */}
      <Section>
        <SectionHeading
          kicker="How we work"
          title="Five stages. One honest system."
          lead="Every engagement names where you are, so the work matches the moment instead of the pitch deck."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((s) => (
            <li key={s.number} className="bg-card p-6">
              <span className="font-mono text-sm text-muted-foreground">
                {s.number}
              </span>
              <h3 className="mt-3 text-base font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Services */}
      <Section className="bg-muted/30">
        <SectionHeading
          kicker="What we do"
          title="Nine things we actually do."
          lead="Every service has a documented process and a template library, so we move quickly and you don't have to teach us how the work works."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card
              key={s.number}
              className={
                s.flagship
                  ? "flex flex-col p-6 ring-1 ring-foreground/15 lg:col-span-3"
                  : "flex flex-col p-6"
              }
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground">
                  {s.number}
                </span>
                {s.flagship ? (
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Flagship
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {s.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.blurb}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {s.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-emerald-500" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-lg border border-border bg-card p-6">
          <Info className="mt-0.5 h-5 w-5 flex-none text-muted-foreground" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">
              How most engagements start.
            </span>{" "}
            Almost every ARC relationship opens with a fixed-price diagnostic.
            Three to seven weeks, an executive summary you can act on, and a phased
            roadmap. The ones that go well usually turn into a retainer (Fractional
            Head of AI / Transformation, Fractional TPM, or Post-Diagnostic
            Execution) or a scoped delivery engagement. Pricing on request.
          </p>
        </div>
      </Section>

      {/* Principles */}
      <Section>
        <SectionHeading
          kicker="How we think about the work"
          title="The rules we hold ourselves to."
          lead="Every recommendation has to pass these. If a piece of work doesn't, we don't ship it — and we'll usually call it out before you do."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <div key={p.number} className="rounded-lg border border-border p-5">
              <span className="font-mono text-xs text-muted-foreground">
                {p.number}
              </span>
              <h3 className="mt-2 text-sm font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.text}
              </p>
            </div>
          ))}
        </div>

        <figure className="mt-12 border-l-2 border-foreground/20 pl-6">
          <blockquote className="max-w-2xl text-xl font-medium leading-relaxed text-balance">
            &ldquo;Selling someone a build when they haven&rsquo;t figured out the
            problem yet is malpractice. We won&rsquo;t do it, even when the budget
            says we could.&rdquo;
          </blockquote>
        </figure>
      </Section>

      {/* Best fit */}
      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading kicker="Fit" title="Who we work best with" />
          <ul className="grid gap-4">
            {bestFit.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 flex-none text-emerald-500" />
                <span className="text-base leading-relaxed text-muted-foreground">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTA />
    </>
  );
}
