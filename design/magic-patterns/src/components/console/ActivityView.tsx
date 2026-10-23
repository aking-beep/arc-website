import { useState } from 'react';
import { runs, type RunOutcome } from '../../data/console';
import { ViewHeader } from './ViewHeader';
import { Pill, type Tone } from './Pill';

const filters: { id: RunOutcome | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'verified', label: 'Verified' },
  { id: 'unverified', label: 'Unverified' },
  { id: 'blocked', label: 'Blocked' },
  { id: 'pending', label: 'Pending' },
];

const tone: Record<RunOutcome, Tone> = { verified: 'ok', unverified: 'danger', blocked: 'warn', pending: 'neutral' };

export function ActivityView() {
  const [filter, setFilter] = useState<RunOutcome | 'all'>('all');
  const list = filter === 'all' ? runs : runs.filter((r) => r.outcome === filter);

  return (
    <div>
      <ViewHeader title="Execution activity" lead="Recent agent runs, with the policy that applied and whether the outcome was independently verified." />

      <div role="group" aria-label="Filter by outcome" className="mt-5 flex flex-wrap gap-1.5">
        {filters.map((f) => {
          const count = f.id === 'all' ? runs.length : runs.filter((r) => r.outcome === f.id).length;
          return (
            <button
              key={f.id}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`min-h-[36px] rounded-md border px-3 text-[13px] font-medium transition-colors duration-150 ${
                filter === f.id ? 'border-mist-2 bg-night-3 text-mist' : 'border-night-line text-mist-2 hover:text-mist'
              }`}
            >
              {f.label} <span className="font-mono text-[11.5px] text-mist-2">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-night-line">
        <table className="w-full min-w-[720px] text-left text-[13.5px]">
          <caption className="sr-only">Agent runs</caption>
          <thead className="bg-night-2 font-mono text-[11.5px] text-mist-2">
            <tr>
              <th scope="col" className="px-3 py-2.5 font-normal">Time</th>
              <th scope="col" className="px-3 py-2.5 font-normal">Agent · action</th>
              <th scope="col" className="px-3 py-2.5 font-normal">Tool</th>
              <th scope="col" className="px-3 py-2.5 font-normal">Policy</th>
              <th scope="col" className="px-3 py-2.5 font-normal">Outcome</th>
              <th scope="col" className="px-3 py-2.5 text-right font-normal">Duration</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id} className="border-t border-night-line align-top">
                <td className="px-3 py-3 font-mono text-[12px] text-mist-2 tabular">{r.time}</td>
                <td className="px-3 py-3">
                  <span className="font-mono text-[12px] text-mist-2">{r.agent}</span>
                  <span className="block text-mist">{r.action}</span>
                </td>
                <td className="px-3 py-3 font-mono text-[12px] text-mist">{r.tool}</td>
                <td className="px-3 py-3 font-mono text-[12px] text-mist-2">{r.policy}</td>
                <td className="px-3 py-3">
                  <Pill tone={tone[r.outcome]}>{r.outcome}</Pill>
                </td>
                <td className="px-3 py-3 text-right font-mono text-[12px] text-mist tabular">{r.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
