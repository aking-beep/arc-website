import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { auditRecords } from '../../data/console';
import { ViewHeader } from './ViewHeader';
import { Pill } from './Pill';

export function AuditView() {
  const [id, setId] = useState(auditRecords[0].id);
  const [copied, setCopied] = useState(false);
  const rec = auditRecords.find((r) => r.id === id)!;
  const json = JSON.stringify({ record: rec.id, run: rec.run, time: rec.time, ...rec.evidence }, null, 2);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <ViewHeader
        title="Audit evidence"
        lead="One record per run: who acted, under what authority, and what the destination system says happened."
      />
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.25fr]">
        <ul className="space-y-2" aria-label="Audit records">
          {auditRecords.map((r) => {
            const on = r.id === id;
            return (
              <li key={r.id}>
                <button
                  onClick={() => setId(r.id)}
                  aria-pressed={on}
                  className={`w-full rounded-lg border p-3.5 text-left transition-colors duration-150 ${
                    on ? 'border-brand-on-dark bg-night-3' : 'border-night-line hover:bg-night-2'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[12px] text-mist-2">
                      {r.id} · {r.run}
                    </span>
                    <Pill tone={r.result === 'pass' ? 'ok' : r.result === 'fail' ? 'danger' : 'neutral'}>{r.result}</Pill>
                  </div>
                  <p className="mt-1.5 text-[13.5px] text-mist">{r.summary}</p>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="overflow-hidden rounded-lg border border-night-line bg-night-2">
          <div className="flex items-center justify-between border-b border-night-line px-4 py-2.5">
            <span className="font-mono text-[12px] text-mist-2">{rec.time}</span>
            <button
              onClick={copy}
              className="inline-flex min-h-[32px] items-center gap-1.5 rounded px-2 text-[12.5px] text-mist-2 transition-colors duration-150 hover:bg-night-3 hover:text-mist"
            >
              {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy JSON'}
            </button>
          </div>
          <dl className="divide-y divide-night-line text-[12.5px]">
            {Object.entries(rec.evidence).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[130px_1fr] gap-3 px-4 py-2">
                <dt className="font-mono text-mist-2">{k}</dt>
                <dd className={`break-words font-mono ${k === 'verdict' ? 'font-medium text-mist' : 'text-mist'}`}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Evidence copied to clipboard' : ''}
      </span>
    </div>
  );
}
