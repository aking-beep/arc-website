import { health, agents } from '../../data/console';
import { ViewHeader } from './ViewHeader';
import { Pill } from './Pill';

export function HealthView() {
  const max = 100;
  const min = 90;
  const w = 100 / health.series.length;

  return (
    <div>
      <ViewHeader title="Operational health" lead="Verification coverage and the state of the control plane itself." />

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border border-night-line p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[13px] text-mist-2">Outcomes verified, last 14 days</p>
              <p className="mt-1 font-serif text-[44px] leading-none text-mist tabular">{health.verifiedRate}%</p>
            </div>
            <dl className="flex gap-6 text-[13px]">
              <div>
                <dt className="text-mist-2">Unverified 24h</dt>
                <dd className="mt-0.5 font-mono text-[18px] text-danger-on-dark tabular">{health.unverified24h}</dd>
              </div>
              <div>
                <dt className="text-mist-2">Blocked 24h</dt>
                <dd className="mt-0.5 font-mono text-[18px] text-warn-on-dark tabular">{health.blocked24h}</dd>
              </div>
              <div>
                <dt className="text-mist-2">p95 run</dt>
                <dd className="mt-0.5 font-mono text-[18px] text-mist tabular">{health.p95Latency}</dd>
              </div>
            </dl>
          </div>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="mt-6 h-32 w-full" role="img" aria-label={`Daily verified rate between ${Math.min(...health.series)}% and ${Math.max(...health.series)}%`}>
            {[0, 1, 2].map((g) => (
              <line key={g} x1="0" x2="100" y1={g * 20} y2={g * 20} stroke="#263040" strokeWidth="0.2" />
            ))}
            {health.series.map((v, i) => {
              const h = ((v - min) / (max - min)) * 40;
              return <rect key={i} x={i * w + w * 0.18} y={40 - h} width={w * 0.64} height={h} fill={i === health.series.length - 1 ? '#7ccbd9' : '#2f5866'} />;
            })}
          </svg>
          <div className="mt-2 flex justify-between font-mono text-[11px] text-mist-2">
            <span>14 days ago</span>
            <span>Today</span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-lg border border-night-line">
            <h4 className="border-b border-night-line px-4 py-2.5 text-[13px] font-semibold text-mist">Control plane</h4>
            <ul className="divide-y divide-night-line text-[13px]">
              {health.services.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <span className="text-mist">
                    {s.name}
                    <span className="block text-[12px] text-mist-2">{s.note}</span>
                  </span>
                  <Pill tone={s.status === 'ok' ? 'ok' : s.status === 'degraded' ? 'warn' : 'danger'}>{s.status}</Pill>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-night-line">
            <h4 className="border-b border-night-line px-4 py-2.5 text-[13px] font-semibold text-mist">Verification by owner</h4>
            <ul className="space-y-2.5 px-4 py-3 text-[12.5px]">
              {agents
                .filter((a) => a.runs24h > 0)
                .map((a) => (
                  <li key={a.id}>
                    <div className="flex justify-between text-mist-2">
                      <span>{a.owner}</span>
                      <span className="font-mono tabular text-mist">{a.verified}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-night-3">
                      <div className="h-full rounded-full bg-brand-on-dark" style={{ width: `${a.verified}%` }} />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
