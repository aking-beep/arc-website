import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FlowChain, Panel, PanelLabel, Takeaway } from "@/components/diagram";
import { CTA } from "@/components/cta";
import { getPlaybook, productPlaybook } from "@/lib/learn";
import { site } from "@/lib/content";

const playbook = getPlaybook("ark-ai-product-playbook");

const reserveHref = `mailto:${site.email}?subject=ARK%20AI%20Product%20Playbook%20%E2%80%94%20reserve%20a%20copy&body=Send%20me%20the%20Playbook%20when%20it%20ships.`;

export const metadata: Metadata = {
  title: "ARK AI Product Playbook · You built it with AI. Now make it real.",
  description:
    "From idea to shipped product without guessing what comes next. Eight modules covering validation, product definition, architecture, build, evaluation, production readiness and launch.",
};

export default function ProductPlaybookPage() {
  if (!playbook) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <Container className="relative py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <div className="animate-fade-up">
              <PanelLabel>ARK Playbook</PanelLabel>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                You built it with AI.
                <br />
                Now make it real.
              </h1>
              <p className="mt-6 text-xl leading-relaxed">
                From idea to shipped product without guessing what comes next.
              </p>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
                {productPlaybook.openers.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <FlowChain
                steps={["Validate it", "Architect it", "Test it", "Secure it", "Ship it"]}
                className="mt-8"
                highlightLast
              />
            </div>

            <Card className="p-6 sm:p-8">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-semibold tracking-tight">
                  {playbook.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  one-off, no subscription
                </span>
              </div>
              <p className="mt-5 rounded-lg border border-brand/30 bg-brand-subtle/60 p-4 text-sm leading-relaxed">
                {playbook.availability}
              </p>
              <div className="mt-6">
                <Button href={reserveHref} size="lg" className="w-full">
                  {playbook.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                A workbook and a set of frameworks. Not another application to
                log into, and not a course you have to sit through.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeading
          kicker="The gap"
          title="Shipping code is not the same as shipping a product."
          lead="AI closed the distance between an idea and a working interface. It did not answer any of the questions that decide whether the thing survives contact with a real user."
        />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productPlaybook.questions.map((q) => (
            <li
              key={q}
              className="rounded-lg border border-border bg-card px-5 py-4 text-base font-medium"
            >
              {q}
            </li>
          ))}
        </ul>
        <Takeaway className="mt-12 max-w-3xl">
          The Playbook is the sequence for answering those in an order that does
          not waste the work you already did.
        </Takeaway>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Eight modules"
          title="What is inside."
          lead="Each module is a worked framework with the decisions named, not a chapter of encouragement."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {productPlaybook.modules.map((m) => (
            <li key={m.number} className="bg-card p-6">
              <span className="font-mono text-xs text-muted-foreground">
                {m.number}
              </span>
              <h3 className="mt-3 text-base font-semibold">{m.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {m.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading kicker="Built for" title="Who this is for." />
            <ul className="mt-8 grid gap-3">
              {productPlaybook.builtFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-none text-emerald-500" />
                  <span className="text-base leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading kicker="Included" title="What you receive." />
            <ul className="mt-8 grid gap-3">
              {productPlaybook.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-none text-emerald-500" />
                  <span className="text-base leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <Panel className="p-8 sm:p-12">
          <PanelLabel>The system</PanelLabel>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Validate it. Architect it. Test it. Secure it. Measure it. Ship it.
          </h2>
          <FlowChain steps={productPlaybook.system} className="mt-8" highlightLast />
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Six steps, in that order, because every one of them is cheaper before
            the one after it. The Playbook is the version of that sequence we run
            on paid product work.
          </p>
          <div className="mt-8">
            <Button href={reserveHref}>
              {playbook.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Panel>
      </Section>

      <CTA
        title="Want the sequence run on your product instead?"
        lead="The Playbook is the method. If you would rather have us apply it to a specific product, that is an advisory engagement — thirty minutes is enough to size it."
      />
    </>
  );
}
