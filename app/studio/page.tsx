import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { FaqList } from "@/components/faq-list";
import { CTA } from "@/components/cta";
import {
  offers,
  services,
  stages,
  principles,
  bestFit,
  notAFit,
  howWeEngage,
  caseStudies,
  faqs,
  site,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio · Advisory & delivery",
  description:
    "Named Studio engagements for 10–500 person organizations: readiness reviews, architecture diligence, security baselines, data roadmaps, AI sprints, and a full transformation diagnostic.",
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        kicker="ARC Studio"
        title="Strategy that aligns. Work that delivers."
        lead={`${site.audience.line} Pick a named offer with a duration and a deliverable — then we size the rest of the work to the problem.`}
      />

      <Section id="offers" className="scroll-mt-24 bg-muted/30">
        <SectionHeading
          kicker="Offers"
          title="What you can actually buy."
          lead="Each offer has a visitor-friendly promise, a typical duration, and what you leave with. The discovery call is to pick one — or tell you none of them fit."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {offers.map((o) => (
            <Card
              key={o.number}
              className={
                o.flagship
                  ? "flex flex-col p-6 ring-1 ring-foreground/15 md:col-span-2"
                  : "flex flex-col p-6"
              }
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground">{o.number}</span>
                <span className="text-xs text-muted-foreground">{o.duration}</span>
                {o.flagship ? (
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Flagship
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{o.name}</h3>
              <p className="mt-2 text-base leading-relaxed text-foreground">{o.promise}</p>
              <dl className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <div>
                  <dt className="font-medium text-foreground">Starts with</dt>
                  <dd className="mt-1">{o.startsWith}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">You leave with</dt>
                  <dd className="mt-1">{o.youLeaveWith}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {howWeEngage.map((item) => (
            <div key={item.name} className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

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

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Capability catalog"
          title="The work behind the offers."
          lead="The named offers above are how you buy. These nine services are the documented capabilities we pull from — due diligence, security, data, AI, and a full transformation diagnostic."
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
      </Section>

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Work"
            title="Outcomes over narratives."
            lead="Verifiable scope from Fortune 100/500 delivery and ARC Studio. Where confidentiality applies, we name the scale instead of the logo."
          />
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            See the work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {caseStudies.map((study) => (
            <Link key={study.slug} href={`/work/${study.slug}`} className="group block">
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
                    {study.kind === "career" ? "Prior delivery" : "ARC Studio"}
                  </span>
                  <span>{study.industry}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4">
                  {study.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {study.summary}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/60 pt-4">
                  {study.outcomes.map((o) => (
                    <div key={o.label}>
                      <div className="text-lg font-semibold tracking-tight">
                        {o.metric}
                      </div>
                      <p className="text-xs text-muted-foreground">{o.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="How we think about the work"
          title="The rules we hold ourselves to."
          lead="Every recommendation has to pass these. If a piece of work does not, we do not ship it. We will usually call that out before you do."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <div key={p.number} className="rounded-lg border border-border bg-card p-5">
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

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading kicker="Fit" title="Who we work best with" />
            <ul className="mt-8 grid gap-4">
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
          <div>
            <SectionHeading kicker="Not a fit" title="When to look elsewhere" />
            <ul className="mt-8 grid gap-4">
              {notAFit.map((b) => (
                <li key={b} className="text-base leading-relaxed text-muted-foreground">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="FAQ"
          title="Before the discovery call."
          lead="If the answer is not here, ask it on the call. That is what the thirty minutes are for."
        />
        <div className="mt-10 max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </Section>

      <CTA
        title="Let's see if Studio is the right next step."
        lead="A 30-minute discovery call. No pitch deck. We'll name the problem, pick the offer that fits — or tell you none of them do."
      />
    </>
  );
}
