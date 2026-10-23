import { Container } from '../ui/Container';

/** From the repository's `limits` for Agent Control (lib/ark.ts). Non-negotiable on this page. */
const limits = [
  { t: 'Not available to buy.', d: 'Design-partner conversations only, until the verification model is proven in production.' },
  { t: 'Not a model-evaluation product.', d: 'It does not score answer quality. It checks what the agent did and what changed.' },
  { t: 'Not able to verify what it cannot read.', d: 'Outcome evidence has to come from somewhere. Without read access to a system, results are reported as unknown.' },
  { t: 'Not a compliance certification.', d: 'It produces the evidence. Your auditor draws the conclusion.' },
];

export function ControlLimits() {
  return (
    <section aria-labelledby="limits-title" className="py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <h2 id="limits-title" className="font-serif text-[32px] leading-tight tracking-[-0.015em] text-ink sm:text-[40px]">
            What ARC Control is not.
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
            Security and platform teams have heard every claim. Here is what we don’t claim.
          </p>
        </div>
        <dl className="grid gap-x-10 sm:grid-cols-2">
          {limits.map((l) => (
            <div key={l.t} className="border-t border-line py-5">
              <dt className="text-[16px] font-semibold text-ink">{l.t}</dt>
              <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{l.d}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
