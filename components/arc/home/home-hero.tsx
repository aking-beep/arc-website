import Link from "next/link";
import { Container } from "@/components/arc/ui/container";
import { ArcButton } from "@/components/arc/ui/button";
import { AgentExecution } from "@/components/arc/home/agent-execution";

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:py-24">
        <div>
          <h1
            id="hero-title"
            className="font-serif text-[44px] leading-[1.04] tracking-[-0.025em] text-balance text-ink sm:text-[60px] lg:text-[68px]"
          >
            Make technology work for your business.
          </h1>
          <p className="mt-7 max-w-[540px] text-[18px] leading-relaxed text-pretty text-ink-2">
            ARC builds the controls that let AI agents act on production systems safely, modernizes
            the infrastructure they depend on, and turns emerging technology into products people
            actually use.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ArcButton href="/control" arrow>
              Explore ARC Control
            </ArcButton>
            <ArcButton href="/services" variant="secondary">
              Explore our solutions
            </ArcButton>
            <Link
              href="/labs"
              className="inline-flex h-11 items-center px-2 text-[14.5px] font-medium text-brand underline-offset-4 hover:underline"
            >
              Explore ARC Labs
            </Link>
          </div>

          <dl className="mt-12 grid max-w-[540px] grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-6">
            <div>
              <dt className="text-[13px] text-ink-3">ARC Control</dt>
              <dd className="mt-1 text-[14.5px] leading-snug text-ink">
                Authorization, audit and verification for AI agents
              </dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-3">ARC Labs</dt>
              <dd className="mt-1 text-[14.5px] leading-snug text-ink">
                Open-source scanners and applied product experiments
              </dd>
            </div>
          </dl>
        </div>

        <AgentExecution />
      </Container>
    </section>
  );
}
