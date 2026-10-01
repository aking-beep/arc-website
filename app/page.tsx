import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { MaturityBadge } from "@/components/ui/badge";
import { FlowChain, Panel, PanelLabel, Takeaway } from "@/components/diagram";
import { MarketSignals } from "@/components/market-signals";
import { CTA } from "@/components/cta";
import { ark, arkProducts } from "@/lib/ark";
import { playbooks } from "@/lib/learn";
import {
  advisoryCapabilities,
  audiences,
  lifecyclePrinciple,
  operatingModes,
  pillars,
  site,
  technologyLifecycle,
} from "@/lib/content";

export default function HomePage() {
  const featuredPlaybooks = playbooks.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
        <Container className="relative py-24 sm:py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {site.audience.badge}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              Build what&rsquo;s next.
              <br />
              Improve what already works.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {site.audience.line}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/advisory" size="lg">
                Work with ARC
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/playbooks" variant="outline" size="lg">
                Start learning
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* The architecture, stated once, near the top. */}
      <Section className="bg-muted/30">
        <SectionHeading
          kicker="How this fits together"
          title="One company. Two questions."
          lead={`ARC asks: ${site.question} ARK asks: ${ark.question}`}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Link key={p.id} href={p.href} className="group block h-full">
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-foreground">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                  {p.name}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {p.kicker}
                </p>
                <p className="mt-3 text-sm font-medium">{p.summary}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.detail}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="What we do"
          title="Learn. Build. Operate."
          lead="Three verbs, in the order they actually happen. Most failed technology programmes skipped one of them."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {operatingModes.map((mode) => (
            <Card key={mode.id} className="flex h-full flex-col p-6 sm:p-8">
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-brand">
                {mode.verb}
              </p>
              <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-balance">
                {mode.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {mode.text}
              </p>
              <ul className="mt-6 grid flex-1 gap-2 border-t border-border/60 pt-5">
                {mode.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-border"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={mode.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
              >
                {mode.linkLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Technology lifecycle"
          title="New is not the same thing as better."
          lead="We work across the whole lifecycle, not only the emerging end of it. Most of the value in a technology estate is in systems that already exist."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-3">
          {technologyLifecycle.map((phase) => (
            <div key={phase.id} className="bg-card p-6 sm:p-8">
              <PanelLabel>{phase.label}</PanelLabel>
              <h3 className="mt-4 text-base font-semibold leading-snug">
                {phase.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {phase.items.map((item) => (
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
        <Takeaway className="mt-12 max-w-3xl">{lifecyclePrinciple}</Takeaway>
      </Section>

      {/* The ARK band. The agent-centric argument lives on /platform; this is
          the one place on the homepage that points at it. */}
      <Section>
        <Panel className="p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
              <PanelLabel>Building for the next operating layer</PanelLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {ark.positioning}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Software is starting to act on its own. Agents call tools, hold
                credentials and change real systems. {ark.explainer} It exists
                because the gap is no longer intelligence — it is whether an
                action can be trusted, verified and governed.
              </p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-brand">
                {ark.principle}
              </p>
              <FlowChain steps={ark.loop} className="mt-4" highlightLast />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/platform">
                  Explore ARK
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/developers" variant="outline">
                  For developers
                </Button>
              </div>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border">
              {arkProducts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    className="group block bg-card p-5 transition-colors hover:bg-accent/60"
                  >
                    <span className="flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-sm font-semibold">
                        {p.name}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                      <MaturityBadge maturity={p.maturity} />
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                      {p.tagline}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </Section>

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Advisory"
            title="Diagnose. Design. Deliver. Scale."
            lead="The commercial relationship with ARC. Scoped reviews that end in a plan with named owners, then delivery if the plan still needs hands on it."
          />
          <Link
            href="/advisory"
            className="inline-flex flex-none items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            See how we engage
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advisoryCapabilities.map((c, i) => (
            <Card key={c.id} className="flex h-full flex-col p-6">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{c.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {c.text}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {item}
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
            kicker="Learn"
            title="Use our methods without hiring us."
            lead="Three of these are free and complete on the page. The fourth is $19. If you can run the method yourself, that is a good outcome."
          />
          <Link
            href="/playbooks"
            className="inline-flex flex-none items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All playbooks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featuredPlaybooks.map((p) => (
            <Link
              key={p.slug}
              href={`/playbooks/${p.slug}`}
              className="group block h-full"
            >
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {p.kind}
                  </span>
                  <span className="font-mono text-xs font-medium">{p.price}</span>
                </div>
                <h3 className="mt-4 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                  {p.name}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 text-sm font-medium">{p.tagline}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
                {p.chain ? (
                  <FlowChain
                    steps={p.chain.slice(0, 4)}
                    className="mt-5 border-t border-border/60 pt-5"
                  />
                ) : null}
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <MarketSignals
        className="bg-muted/30"
        limit={3}
        title="What changed recently, and what to do about it."
        lead="Dated, sourced, and pointed at the tool or brief that answers it. If a change does not affect what you should do next, it does not go on this list."
        footer={
          <Link
            href="/labs#signals"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            See everything that changed
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <Section>
        <SectionHeading
          kicker="Track record"
          title="The standard comes from somewhere."
          lead="Twenty years of technology programme delivery inside Fortune 100 and Fortune 500 environments. ARC exists so organizations get that standard without a consulting army."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.team.scope.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-card px-5 py-4"
            >
              <div className="text-xl font-semibold tracking-tight">{item.metric}</div>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            See the work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Two ways in"
          title="Pick the door that matches you."
          lead="Organizations hire us. Builders use what we publish. Both start in the same place: our actual thinking, not a brochure."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {audiences.map((a) => (
            <Card key={a.id} className="flex h-full flex-col p-8">
              <PanelLabel>{a.label}</PanelLabel>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-balance">
                {a.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {a.text}
              </p>
              <ul className="mt-6 flex flex-1 flex-wrap gap-2 border-t border-border/60 pt-5">
                {a.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Button href={a.href}>
                  {a.linkLabel}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <CTA
        title="Not sure which of those you are?"
        lead="Thirty minutes is enough to work out whether the problem is a system, an organization, or an agent you cannot yet verify — and what the honest first step is."
      />
    </>
  );
}
