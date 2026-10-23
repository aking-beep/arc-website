import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionIntro } from '../ui/SectionIntro';
import { layers } from '../../data/architecture';

/** Cloud architecture explorer. Toggle current vs. modernized, select a layer for detail. */
export function CloudExplorer() {
  const [mode, setMode] = useState<'current' | 'target'>('current');
  const [id, setId] = useState('agents');
  const active = layers.find((l) => l.id === id)!;
  const stack = layers.filter((l) => l.kind === 'layer');
  const cross = layers.filter((l) => l.kind === 'cross');

  const LayerButton = ({ l, vertical = false }: { l: (typeof layers)[number]; vertical?: boolean }) => {
    const on = l.id === id;
    const comps = mode === 'current' ? l.current.components : l.target.components;
    return (
      <button
        onClick={() => setId(l.id)}
        aria-pressed={on}
        className={`flex h-full w-full flex-col rounded-lg border p-3.5 text-left transition-colors duration-150 ${
          on ? 'border-brand-on-dark bg-night-3' : 'border-night-line bg-night-2 hover:border-mist-2/50'
        }`}
      >
        <span className="text-[14px] font-semibold text-mist">{l.name}</span>
        <span className={`mt-2 flex flex-wrap gap-1 ${vertical ? 'lg:flex-col lg:items-start' : ''}`}>
          {comps.map((c) => (
            <span
              key={c}
              className={`rounded border px-1.5 py-0.5 font-mono text-[11px] ${
                mode === 'target' ? 'border-brand-on-dark/35 text-brand-on-dark' : 'border-night-line text-mist-2'
              }`}
            >
              {c}
            </span>
          ))}
        </span>
      </button>
    );
  };

  return (
    <section aria-labelledby="arch-title" className="dark-surface bg-night py-20 text-mist sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionIntro
            id="arch-title"
            onDark
            eyebrow="Cloud architecture explorer"
            title="What modernization changes, layer by layer."
            lead="A reference estate, not a client’s. Switch between a typical current state and a modernized one, then select a layer to see the risks and the moves."
          />
          <div role="radiogroup" aria-label="Architecture state" className="inline-flex rounded-lg border border-night-line p-1">
            {(['current', 'target'] as const).map((m) => (
              <button
                key={m}
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={`min-h-[40px] rounded-md px-4 text-[13.5px] font-medium transition-colors duration-150 ${
                  mode === m ? 'bg-mist text-night' : 'text-mist-2 hover:text-mist'
                }`}
              >
                {m === 'current' ? 'Typical current state' : 'Modernized'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="blueprint grid gap-2 rounded-xl border border-night-line p-3 sm:p-4 lg:grid-cols-[1fr_150px_150px]">
            <div className="grid gap-2">
              {stack.map((l) => (
                <div key={l.id}>{LayerButton({ l })}</div>
              ))}
            </div>
            {cross.map((l) => (
              <div key={l.id}>{LayerButton({ l, vertical: true })}</div>
            ))}
          </div>

          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${id}-${mode}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              >
                <p className="font-mono text-[12px] text-mist-2">
                  {active.kind === 'cross' ? 'Cross-cutting' : 'Layer'} · {mode === 'current' ? 'typical current state' : 'modernized'}
                </p>
                <h3 className="mt-2 font-serif text-[30px] leading-tight text-mist">{active.name}</h3>
                <h4 className={`mt-6 text-[13px] font-semibold ${mode === 'current' ? 'text-warn-on-dark' : 'text-ok-on-dark'}`}>
                  {mode === 'current' ? 'Where it hurts' : 'The moves that matter'}
                </h4>
                <ul className="mt-3 space-y-3">
                  {(mode === 'current' ? active.current.risks : active.target.moves).map((r) => (
                    <li key={r} className="border-l-2 border-night-line pl-4 text-[15.5px] leading-relaxed text-mist">
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[14px] leading-relaxed text-mist-2">
                  {mode === 'current'
                    ? 'Switch to “Modernized” to see the target for this layer.'
                    : 'Sequenced by what blocks delivery and what carries risk, not by what is newest.'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
