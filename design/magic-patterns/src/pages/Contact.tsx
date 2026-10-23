import { Container } from '../components/ui/Container';
import { InquiryForm } from '../components/contact/InquiryForm';
import { site } from '../data/site';

export function Contact() {
  return (
    <section aria-labelledby="contact-title" className="bg-paper">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <p className="font-mono text-[13px] text-brand">Talk to ARC</p>
          <h1 id="contact-title" className="mt-5 font-serif text-[40px] leading-[1.08] tracking-[-0.02em] text-ink text-balance sm:text-[52px]">
            Tell us what’s happening.
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-2">
            You don’t need to know which service you need. A few details help us come back with something useful
            rather than a request for a call.
          </p>

          <h2 className="mt-12 text-[14px] font-semibold text-ink">What happens next</h2>
          <ol className="mt-4 space-y-5 border-l border-line-strong pl-5">
            <li>
              <p className="text-[15px] font-medium text-ink">A person reads it</p>
              <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-2">The person who would do the work, not a sales queue.</p>
            </li>
            <li>
              <p className="text-[15px] font-medium text-ink">You get a recommended first step</p>
              <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-2">Usually within two business days. Sometimes that’s “you don’t need us.”</p>
            </li>
            <li>
              <p className="text-[15px] font-medium text-ink">Thirty minutes, no deck</p>
              <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-2">If it makes sense to talk, we’ll find a time.</p>
            </li>
          </ol>

          <div className="mt-12 border-t border-line pt-6 text-[14.5px] text-ink-2">
            <p>
              Prefer email?{' '}
              <a href={`mailto:${site.email}`} className="break-all font-medium text-brand underline underline-offset-2">
                {site.email}
              </a>
            </p>
            <p className="mt-2">
              Or{' '}
              <a href={site.calendly} target="_blank" rel="noreferrer" className="font-medium text-brand underline underline-offset-2">
                book 30 minutes directly
              </a>
              .
            </p>
          </div>
        </div>

        <InquiryForm />
      </Container>
    </section>
  );
}
