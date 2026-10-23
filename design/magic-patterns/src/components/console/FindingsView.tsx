import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { findings, type Severity } from '../../data/console';
import { ViewHeader } from './ViewHeader';
import { Pill, type Tone } from './Pill';

const sevTone: Record<Severity, Tone> = { critical: 'danger', high: 'danger', medium: 'warn', low: 'neutral' };

export function FindingsView() {
  const [open, setOpen] = useState<string | null>(findings[0].id);
  const [acked, setAcked] = useState<string[]>([]);
  const [hideAcked, setHideAcked] = useState(false);
  const list = hideAcked ? findings.filter((f) => !acked.includes(f.id)) : findings;

  return (
    <div>
      <ViewHeader
        title="Security findings"
        lead="From MCP validation, permission reviews and outcome coverage checks."
        right={
          <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-[13px] text-mist-2">
            <input
              type="checkbox"
              checked={hideAcked}
              onChange={(e) => setHideAcked(e.target.checked)}
              className="h-4 w-4 accent-[#7ccbd9]"
            />
            Hide acknowledged
          </label>
        }
      />
      <ul className="mt-5 space-y-2">
        {list.map((f) => {
          const isOpen = open === f.id;
          const isAck = acked.includes(f.id);
          return (
            <li key={f.id} className={`rounded-lg border border-night-line ${isAck ? 'opacity-60' : ''}`}>
              <button
                aria-expanded={isOpen}
                aria-controls={`f-${f.id}`}
                onClick={() => setOpen(isOpen ? null : f.id)}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <Pill tone={sevTone[f.severity]}>{f.severity}</Pill>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-medium text-mist">{f.title}</span>
                  <span className="mt-0.5 block font-mono text-[11.5px] text-mist-2">
                    {f.id} · {f.source} · {f.target}
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`mt-0.5 shrink-0 text-mist-2 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div id={`f-${f.id}`} className="border-t border-night-line px-4 pb-4 pt-3 text-[13.5px]">
                  <p className="leading-relaxed text-mist">{f.detail}</p>
                  <p className="mt-3 text-mist-2">
                    <span className="font-medium text-mist">Recommended fix: </span>
                    {f.fix}
                  </p>
                  <button
                    onClick={() => setAcked((a) => (isAck ? a.filter((x) => x !== f.id) : [...a, f.id]))}
                    className="mt-4 inline-flex min-h-[36px] items-center rounded-md border border-night-line px-3 text-[13px] font-medium text-mist transition-colors duration-150 hover:bg-night-3"
                  >
                    {isAck ? 'Reopen' : 'Acknowledge'}
                  </button>
                </div>
              )}
            </li>
          );
        })}
        {list.length === 0 && <li className="rounded-lg border border-night-line p-6 text-center text-[13.5px] text-mist-2">All findings acknowledged.</li>}
      </ul>
    </div>
  );
}
