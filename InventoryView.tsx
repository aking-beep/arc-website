import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { agents, type Agent } from '../../data/console';
import { ViewHeader } from './ViewHeader';
import { Pill } from './Pill';

export function InventoryView() {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Agent>(agents[0]);

  const list = useMemo(
    () => agents.filter((a) => `${a.name} ${a.owner} ${a.framework}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <div>
      <ViewHeader
        title="Agent inventory"
        lead="Every agent with an identity in this environment, including vendor-embedded ones."
        right={
          <label className="relative block">
            <span className="sr-only">Filter agents</span>
            <Search size={14} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mist-2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter agents"
              className="h-10 w-full rounded-md border border-night-line bg-night-2 pl-9 pr-3 text-[13.5px] text-mist placeholder:text-mist-2 focus:border-brand-on-dark focus:outline-none sm:w-56"
            />
          </label>
        }
      />

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="overflow-x-auto rounded-lg border border-night-line">
          <table className="w-full min-w-[560px] text-left text-[13.5px]">
            <caption className="sr-only">Agents, select a row for details</caption>
            <thead className="bg-night-2 font-mono text-[11.5px] text-mist-2">
              <tr>
                <th scope="col" className="px-3 py-2.5 font-normal">Agent</th>
                <th scope="col" className="px-3 py-2.5 font-normal">Risk</th>
                <th scope="col" className="px-3 py-2.5 font-normal">State</th>
                <th scope="col" className="px-3 py-2.5 text-right font-normal">Runs 24h</th>
                <th scope="col" className="px-3 py-2.5 text-right font-normal">Verified</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => {
                const on = a.id === selected.id;
                return (
                  <tr key={a.id} className={`border-t border-night-line ${on ? 'bg-night-3' : 'hover:bg-night-2'}`}>
                    <td className="px-3 py-2.5">
                      <button
                        onClick={() => setSelected(a)}
                        aria-pressed={on}
                        className="text-left font-medium text-mist hover:underline"
                      >
                        {a.name}
                        <span className="block text-[12px] font-normal text-mist-2">{a.owner}</span>
                      </button>
                    </td>
                    <td className="px-3 py-2.5">
                      <Pill tone={a.risk === 'high' ? 'danger' : a.risk === 'medium' ? 'warn' : 'neutral'}>{a.risk}</Pill>
                    </td>
                    <td className="px-3 py-2.5">
                      <Pill tone={a.state === 'active' ? 'ok' : a.state === 'review' ? 'warn' : 'neutral'}>{a.state}</Pill>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono tabular text-mist">{a.runs24h.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-right font-mono tabular text-mist">{a.runs24h ? `${a.verified}%` : '—'}</td>
                  </tr>
                );
              })}
              {list.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-mist-2">
                    No agents match “{q}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <aside aria-label={`${selected.name} details`} className="rounded-lg border border-night-line bg-night-2 p-5">
          <h4 className="font-mono text-[14px] text-mist">{selected.name}</h4>
          <p className="mt-1 text-[12.5px] text-mist-2">
            {selected.framework} · last seen {selected.lastSeen}
          </p>
          <dl className="mt-5 space-y-4 text-[13px]">
            <div>
              <dt className="text-mist-2">Identity</dt>
              <dd className="mt-0.5 font-mono text-mist">{selected.identity}</dd>
            </div>
            <div>
              <dt className="text-mist-2">Granted scopes</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {selected.scopes.map((s) => (
                  <span key={s} className="rounded border border-night-line bg-night px-2 py-0.5 font-mono text-[11.5px] text-mist">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-mist-2">Tools reachable</dt>
              <dd className="mt-0.5 text-mist">{selected.tools.join(', ')}</dd>
            </div>
            <div>
              <dt className="text-mist-2">Accountable owner</dt>
              <dd className="mt-0.5 text-mist">{selected.owner}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
