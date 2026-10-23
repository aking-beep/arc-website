import { useState } from 'react';
import { policies as seed, type Policy } from '../../data/console';
import { ViewHeader } from './ViewHeader';

export function PoliciesView() {
  const [list, setList] = useState<Policy[]>(seed);

  const toggle = (id: string) =>
    setList((l) => l.map((p) => (p.id === id ? { ...p, mode: p.mode === 'enforce' ? 'monitor' : 'enforce' } : p)));

  return (
    <div>
      <ViewHeader
        title="Permission policies"
        lead="Rules evaluated before every tool call. Switch a policy between monitor and enforce to see the difference. Changes stay in this preview."
      />
      <ul className="mt-5 divide-y divide-night-line rounded-lg border border-night-line">
        {list.map((p) => (
          <li key={p.id} className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h4 className="text-[14.5px] font-semibold text-mist">{p.name}</h4>
                <span className="font-mono text-[11.5px] text-mist-2">{p.id}</span>
                <span className="text-[12.5px] text-mist-2">· {p.appliesTo}</span>
              </div>
              <p className="mt-1.5 rounded bg-night-2 px-2.5 py-1.5 font-mono text-[12px] leading-relaxed text-mist">{p.rule}</p>
              <p className="mt-2 text-[12.5px] text-mist-2">
                {p.hits24h.toLocaleString()} evaluations · {p.mode === 'enforce' ? `${p.blocks24h} blocked` : 'would block: logged only'} in 24h
              </p>
            </div>
            <div className="flex items-center gap-3 sm:justify-end">
              <span id={`mode-${p.id}`} className="w-[60px] text-right font-mono text-[12px] text-mist-2">
                {p.mode}
              </span>
              <button
                role="switch"
                aria-checked={p.mode === 'enforce'}
                aria-label={`Enforce ${p.name}`}
                onClick={() => toggle(p.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-150 ${
                  p.mode === 'enforce' ? 'border-brand-on-dark bg-brand' : 'border-night-line bg-night-3'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-0.5 h-[18px] w-[18px] rounded-full bg-mist transition-transform duration-150 ease-out ${
                    p.mode === 'enforce' ? 'translate-x-[22px]' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
