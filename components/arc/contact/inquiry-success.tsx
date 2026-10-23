"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { ArcButton } from "@/components/arc/ui/button";
import { arcSite } from "@/lib/arc/site";

/**
 * Ported from the prototype's `contact/InquirySuccess`.
 *
 * Two changes. The prototype printed "Prototype confirmation: no message was
 * sent" — the message is now actually sent, so that line is gone. And it
 * generated a reference number from `Date.now()`, which told the visitor
 * something ARC could not look up; replaced with what actually happens next.
 *
 * The entrance is a CSS keyframe so /contact loads no animation library.
 */
export function InquirySuccess({
  name,
  email,
  type,
}: {
  name: string;
  email: string;
  type: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const first = name.trim().split(" ")[0] || "there";

  return (
    <div
      role="status"
      className="arc-pop rounded-xl border border-line bg-canvas p-6 sm:p-10"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ok-subtle text-ok">
        <Check size={22} aria-hidden="true" />
      </span>
      <h2
        ref={ref}
        tabIndex={-1}
        className="mt-6 font-serif text-[32px] leading-tight text-ink outline-none"
      >
        Thanks, {first}. It’s with us.
      </h2>
      <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
        We’ll reply to <span className="font-medium text-ink">{email}</span> with a recommended
        first step, usually within two business days. Sometimes that recommendation is “you don’t
        need us”.
      </p>
      <dl className="mt-8 grid gap-4 border-t border-line pt-6 text-[14.5px] sm:grid-cols-2">
        <div>
          <dt className="text-ink-3">Topic</dt>
          <dd className="mt-0.5 text-ink">{type}</dd>
        </div>
        <div>
          <dt className="text-ink-3">Who reads it</dt>
          <dd className="mt-0.5 text-ink">The person who would do the work.</dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        <ArcButton href={arcSite.calendly} arrow>
          Book 30 minutes now
        </ArcButton>
        <ArcButton href="/research" variant="secondary">
          Read the research while you wait
        </ArcButton>
      </div>
    </div>
  );
}
