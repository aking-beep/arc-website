import { Container } from '../ui/Container';
import { SectionIntro } from '../ui/SectionIntro';

const chain = [
  { name: 'Agent request', covered: 'trace' },
  { name: 'Model decision', covered: 'trace' },
  { name: 'Tool action', covered: 'trace' },
  { name: 'System change', covered: 'control' },
  { name: 'Outcome evidence', covered: 'control' },
  { name: 'Verified outcome', covered: 'control' },
];

const failures = [
  'An agent can complete a run while the payment failed.',
  'It can report a record as updated when the destination system never changed.',
  'It can call the correct tool with the wrong authority.',
  'It can finish a workflow while violating the policy that should have governed it.',
];

export function ExecutionGap() {
  return (
    <section aria-labelledby="gap-title" className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionIntro
            id="gap-title"
            eyebrow="The problem"
            title="Your agent said it finished. Did it?"
            lead="A successful model response isn’t the same as a successful business outcome. Tracing tells you what the agent attempted. It doesn’t tell you what changed."
          />
          <ul className="space-y-0 border-t border-line">
            {failures.map((f) => (
              <li key={f} className="border-b border-line py-4 text-[16px] leading-relaxed text-ink">
                {f}
              </li>
            ))}
          </ul>
        </div>

        <figure className="mt-16">
          <div className="overflow-x-auto pb-2">
            <ol className="grid min-w-[760px] grid-cols-6 gap-2" aria-label="Agent execution chain">
              {chain.map((c, i) => (
                <li key={c.name} className="relative">
                  <div
                    className={`flex h-[72px] items-center rounded-md border px-4 text-[14.5px] font-medium ${
                      c.covered === 'control' ? 'border-brand bg-brand-subtle text-ink' : 'border-line bg-paper text-ink-2'
                    }`}
                  >
                    <span className="mr-2 font-mono text-[12px] text-ink-3">{i + 1}</span>
                    {c.name}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-3 grid min-w-[760px] grid-cols-6 gap-2 text-[13px]">
              <div className="col-span-3 border-t-2 border-line-strong pt-2 text-ink-2">What logs and traces typically capture</div>
              <div className="col-span-3 border-t-2 border-brand pt-2 font-medium text-brand">What ARC Control is built to verify</div>
            </div>
          </div>
          <figcaption className="mt-6 max-w-[640px] text-[14.5px] leading-relaxed text-ink-2">
            Execution success is not a verified outcome. ARC Control connects execution evidence — the trace, the
            tool call, the identity, the policy decision — with evidence collected from the system that was
            supposed to change.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
