import type { Metadata } from "next";
import { Container } from "@/components/arc/ui/container";
import { ArcButton } from "@/components/arc/ui/button";
import { arcSite } from "@/lib/arc/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page isn’t here. These are the main places to go.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <p className="font-mono text-[13px] text-ink-3">404</p>
        <h1 className="mt-4 font-serif text-[44px] leading-tight text-ink">
          That page isn’t here.
        </h1>
        <p className="mt-4 max-w-[520px] text-[17px] leading-relaxed text-ink-2">
          It may have moved in the redesign. These are the main places to go.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ArcButton href="/">Home</ArcButton>
          <ArcButton href="/control" variant="secondary">
            ARC Control
          </ArcButton>
          <ArcButton href="/labs" variant="secondary">
            ARC Labs
          </ArcButton>
          <ArcButton href="/services" variant="secondary">
            Solutions
          </ArcButton>
          <ArcButton href="/research" variant="secondary">
            Research
          </ArcButton>
        </div>
        <p className="mt-10 text-[14.5px] text-ink-2">
          Looking for something specific?{" "}
          <a
            href={`mailto:${arcSite.email}`}
            className="font-medium text-brand underline underline-offset-2"
          >
            Email us
          </a>{" "}
          and we’ll point you at it.
        </p>
      </Container>
    </section>
  );
}
