import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/arc/ui/container";
import { InquiryForm } from "@/components/arc/contact/inquiry-form";
import { arcSite } from "@/lib/arc/site";

const title = "Talk to ARC";
const description =
  "Tell us what’s happening. A person reads every inquiry and replies with a recommended first step, usually within two business days.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", type: "website" },
  twitter: { title, description },
  // The form branches on query parameters, so an indexed ?service=... variant
  // would be a duplicate of this page with a different first step.
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="bg-paper">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <p className="font-mono text-[13px] text-brand">Talk to ARC</p>
          <h1
            id="contact-title"
            className="mt-5 font-serif text-[40px] leading-[1.08] tracking-[-0.02em] text-balance text-ink sm:text-[52px]"
          >
            Tell us what’s happening.
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-pretty text-ink-2">
            You don’t need to know which service you need. A few details help us come back with
            something useful rather than a request for a call.
          </p>

          <h2 className="mt-12 text-[14px] font-semibold text-ink">What happens next</h2>
          <ol className="mt-4 space-y-5 border-l border-line-strong pl-5">
            <li>
              <p className="text-[15px] font-medium text-ink">A person reads it</p>
              <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-2">
                The person who would do the work, not a sales queue.
              </p>
            </li>
            <li>
              <p className="text-[15px] font-medium text-ink">
                You get a recommended first step
              </p>
              <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-2">
                Usually within two business days. Sometimes that’s “you don’t need us.”
              </p>
            </li>
            <li>
              <p className="text-[15px] font-medium text-ink">Thirty minutes, no deck</p>
              <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-2">
                If it makes sense to talk, we’ll find a time.
              </p>
            </li>
          </ol>

          <div className="mt-12 border-t border-line pt-6 text-[14.5px] text-ink-2">
            <p>
              Would rather talk than type?{" "}
              <a
                href={arcSite.calendly}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand underline underline-offset-2"
              >
                Book 30 minutes directly
              </a>
              <span className="sr-only"> (opens in a new tab)</span> — no form needed.
            </p>
            <p className="mt-6 text-[13px] text-ink-3">
              No marketing list and no drip campaign. We keep what you send to answer you.{" "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-ink-2">
                Privacy
              </a>
              .
            </p>
          </div>
        </div>

        {/* The form reads query parameters, so it needs a Suspense boundary. */}
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="min-h-[560px] rounded-xl border border-line bg-canvas"
            />
          }
        >
          <InquiryForm />
        </Suspense>
      </Container>
    </section>
  );
}
