import { Container } from '../ui/Container';
import { SectionIntro } from '../ui/SectionIntro';
import { methodology } from '../../data/methodology';

export function Methodology() {
  return (
    <section aria-labelledby="method-title" className="py-20 sm:py-24">
      <Container>
        <SectionIntro
          id="method-title"
          eyebrow="Transformation methodology"
          title="Each phase ends in a decision, not a deck."
          lead="Every engagement can stop at the end of any phase, and you keep what was produced. Most start with a diagnostic, because it’s the cheapest way to find out whether the bigger work is worth doing."
        />

        <ol className="mt-14 grid gap-0 border-t border-line md:grid-cols-2 lg:grid-cols-4">
          {methodology.map((m, i) => (
            <li
              key={m.name}
              className="flex flex-col border-b border-line py-8 md:pr-8 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <div className="relative flex flex-1 flex-col">
              <span aria-hidden="true" className="absolute -top-[37px] left-0 h-[9px] w-[9px] rounded-full border-2 border-canvas bg-brand" />
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[19px] font-semibold text-ink">
                  <span className="mr-2 font-mono text-[13px] font-normal text-ink-3">{i + 1}</span>
                  {m.name}
                </h3>
                <span className="whitespace-nowrap font-mono text-[12px] text-ink-3">{m.length}</span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{m.text}</p>
              <dl className="mt-6 space-y-3 pt-0 text-[14px] lg:mt-auto lg:pt-6">
                <div>
                  <dt className="text-ink-3">You get</dt>
                  <dd className="mt-0.5 text-ink">{m.output}</dd>
                </div>
                <div>
                  <dt className="text-ink-3">Decision at the end</dt>
                  <dd className="mt-0.5 text-ink">{m.gate}</dd>
                </div>
              </dl>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
