import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles contact form submissions and site analytics.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Privacy"
        lead="Short version: we don't sell your data, we don't run a drip campaign off the contact form, and we only collect what we need to reply."
      />
      <Container className="max-w-2xl space-y-10 py-16 sm:py-20">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Who we are</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {site.name} (&ldquo;ARC,&rdquo; &ldquo;we&rdquo;) operates{" "}
            {site.domain.replace(/^https?:\/\//, "")}. Questions:{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            What we collect
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            If you use the contact form, we receive the fields you submit: name,
            work email, optional company, optional stage, and message. That
            payload is emailed to us (via Resend when configured) so a human can
            reply. We do not put contact-form submissions on a marketing list.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Standard web logs (IP, user agent, path, timestamp) may be processed
            by our host (Vercel) for security and reliability. If we enable
            analytics later, it will be privacy-respecting (e.g. Vercel Analytics
            or Plausible), no ad-tech trackers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">How we use it</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>To answer your inquiry and schedule discovery calls.</li>
            <li>To keep the site secure and working.</li>
            <li>Never to sell, rent, or trade personal data.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Retention</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Contact emails live in our inbox for as long as the conversation is
            relevant, then follow our normal email retention. Host logs follow
            the provider&rsquo;s defaults.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Your choices</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Email us to correct or delete contact information we hold about you.
            Prefer not to use the form? Book via Calendly or email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {site.email}
            </a>{" "}
            directly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Updates</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            If this policy changes in a material way, we&rsquo;ll update this
            page. Last updated: August 8, 2026.
          </p>
        </section>
      </Container>
    </>
  );
}
