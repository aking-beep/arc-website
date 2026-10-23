import { useState } from 'react';
import { Container } from '../ui/Container';
import { SectionIntro } from '../ui/SectionIntro';

/** From the repository's `agentLifecycle` (lib/ark.ts). */
const steps = [
  { name: 'Discover', text: 'Find which capabilities, tools and resources exist, and which apply to the task in hand.' },
  { name: 'Authenticate', text: 'Prove which agent is acting, on whose behalf, and under which credential.' },
  { name: 'Understand', text: 'Read schemas, contracts and side effects well enough to call a tool correctly the first time.' },
  { name: 'Permission', text: 'Resolve what this identity is allowed to do right now, including actions that need a human.' },
  { name: 'Execute', text: 'Run the work in an environment that fits its privacy, latency, policy and cost constraints.' },
  { name: 'Verify', text: 'Collect evidence from the systems that were supposed to change, not from the agent’s own report.' },
  { name: 'Measure', text: 'Attribute cost, latency and success to a unit of work a business can recognise.' },
  { name: 'Remember', text: 'Persist state so the next run starts from what happened, not from an empty context.' },
  { name: 'Audit', text: 'Keep a record someone can defend later: what was attempted, under what authority, with what result.' },
];

const controlled = ['Authenticate', 'Permission', 'Verify', 'Audit'];

export function Lifecycle() {
  const [active, setActive] = useState(3);

  return (
    <section aria-labelledby="life-title" className="border-t border-line bg-paper py-20 sm:py-24">
      <Container>
        <SectionIntro
          id="life-title"
          eyebrow="Architecture"
          title="Nine points where agents need infrastructure, not just a model."
          lead="ARC Control focuses on the four highlighted points. The others are where Services and the Labs scanners usually come in."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ol className="grid grid-cols-3 gap-2" aria-label="Agent lifecycle">
            {steps.map((s, i) => {
              const on = i === active;
              const ctl = controlled.includes(s.name);
              return (
                <li key={s.name}>
                  <button
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`flex h-full min-h-[64px] w-full flex-col justify-between rounded-md border px-3 py-2.5 text-left transition-colors duration-150 ${
                      on ? 'border-ink bg-ink text-white' : ctl ? 'border-brand/40 bg-brand-subtle text-ink hover:border-brand' : 'border-line bg-canvas text-ink-2 hover:border-line-strong'
                    }`}
                  >
                    <span className={`font-mono text-[11px] ${on ? 'text-mist-2' : 'text-ink-3'}`}>{i + 1}</span>
                    <span className="text-[13.5px] font-medium">{s.name}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div aria-live="polite" className="border-t border-ink pt-5">
            <p className="font-mono text-[12px] text-ink-3">
              Step {active + 1} of {steps.length}
              {controlled.includes(steps[active].name) && <span className="text-brand"> · ARC Control</span>}
            </p>
            <h3 className="mt-2 font-serif text-[28px] text-ink">{steps[active].name}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{steps[active].text}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
