"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Copy, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  agents,
  auditRecords,
  findings,
  health,
  policies as policySeed,
  runs,
  type Agent,
  type Policy,
  type RunOutcome,
  type Severity,
} from "@/lib/arc/console";
import { Pill, type PillTone } from "@/components/arc/ui/pill";
import { ViewHeader } from "@/components/arc/console/view-header";

/**
 * The six console views, ported from the prototype's `components/console/*`.
 * Every number, name and finding is invented (lib/arc/console.ts) and the
 * panel around these views carries a demonstration-data label.
 */

/* ---------------------------------- inventory --------------------------- */

export function InventoryView() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Agent>(agents[0]);

  const list = useMemo(
    () =>
      agents.filter((a) =>
        `${a.name} ${a.owner} ${a.framework}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div>
      <ViewHeader
        title="Agent inventory"
        lead="Every agent with an identity in this environment, including vendor-embedded ones."
        right={
          <label className="relative block">
            <span className="sr-only">Filter agents</span>
            <Search
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mist-2"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter agents"
              className="h-10 w-full rounded-md border border-night-line bg-night-2 pl-9 pr-3 text-[13.5px] text-mist placeholder:text-mist-2 focus:border-brand-on-dark focus:outline-none sm:w-56"
            />
          </label>
        }
      />

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="overflow-x-auto rounded-lg border border-night-line">
          <table className="w-full min-w-[560px] text-left text-[13.5px]">
            <caption className="sr-only">Agents. Select a row for details.</caption>
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
                  <tr
                    key={a.id}
                    className={cn("border-t border-night-line", on ? "bg-night-3" : "hover:bg-night-2")}
                  >
                    <td className="px-3 py-2.5">
                      <button
                        type="button"
                        onClick={() => setSelected(a)}
                        aria-pressed={on}
                        className="text-left font-medium text-mist hover:underline"
                      >
                        {a.name}
                        <span className="block text-[12px] font-normal text-mist-2">{a.owner}</span>
                      </button>
                    </td>
                    <td className="px-3 py-2.5">
                      <Pill tone={a.risk === "high" ? "danger" : a.risk === "medium" ? "warn" : "neutral"}>
                        {a.risk}
                      </Pill>
                    </td>
                    <td className="px-3 py-2.5">
                      <Pill tone={a.state === "active" ? "ok" : a.state === "review" ? "warn" : "neutral"}>
                        {a.state}
                      </Pill>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono tabular text-mist">
                      {a.runs24h.toLocaleString("en-US")}
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono tabular text-mist">
                      {a.runs24h ? `${a.verified}%` : "—"}
                    </td>
                  </tr>
                );
              })}
              {list.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-mist-2">
                    No agents match “{query}”.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <aside
          aria-label={`${selected.name} details`}
          className="rounded-lg border border-night-line bg-night-2 p-5"
        >
          <h4 className="break-all font-mono text-[14px] text-mist">{selected.name}</h4>
          <p className="mt-1 text-[12.5px] text-mist-2">
            {selected.framework} · last seen {selected.lastSeen}
          </p>
          <dl className="mt-5 space-y-4 text-[13px]">
            <div>
              <dt className="text-mist-2">Identity</dt>
              <dd className="mt-0.5 break-all font-mono text-mist">{selected.identity}</dd>
            </div>
            <div>
              <dt className="text-mist-2">Granted scopes</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {selected.scopes.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-night-line bg-night px-2 py-0.5 font-mono text-[11.5px] text-mist"
                  >
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-mist-2">Tools reachable</dt>
              <dd className="mt-0.5 text-mist">{selected.tools.join(", ")}</dd>
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

/* ---------------------------------- activity ---------------------------- */

const outcomeFilters: { id: RunOutcome | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "verified", label: "Verified" },
  { id: "unverified", label: "Unverified" },
  { id: "blocked", label: "Blocked" },
  { id: "pending", label: "Pending" },
];

const outcomeTone: Record<RunOutcome, PillTone> = {
  verified: "ok",
  unverified: "danger",
  blocked: "warn",
  pending: "neutral",
};

export function ActivityView() {
  const [filter, setFilter] = useState<RunOutcome | "all">("all");
  const list = filter === "all" ? runs : runs.filter((r) => r.outcome === filter);

  return (
    <div>
      <ViewHeader
        title="Execution activity"
        lead="Recent agent runs, with the policy that applied and whether the outcome was independently verified."
      />

      <div role="group" aria-label="Filter by outcome" className="mt-5 flex flex-wrap gap-1.5">
        {outcomeFilters.map((f) => {
          const count = f.id === "all" ? runs.length : runs.filter((r) => r.outcome === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "min-h-[36px] rounded-md border px-3 text-[13px] font-medium transition-colors duration-150",
                filter === f.id
                  ? "border-mist-2 bg-night-3 text-mist"
                  : "border-night-line text-mist-2 hover:text-mist",
              )}
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
                <td className="px-3 py-3 font-mono text-[12px] tabular text-mist-2">{r.time}</td>
                <td className="px-3 py-3">
                  <span className="font-mono text-[12px] text-mist-2">{r.agent}</span>
                  <span className="block text-mist">{r.action}</span>
                </td>
                <td className="px-3 py-3 font-mono text-[12px] text-mist">{r.tool}</td>
                <td className="px-3 py-3 font-mono text-[12px] text-mist-2">{r.policy}</td>
                <td className="px-3 py-3">
                  <Pill tone={outcomeTone[r.outcome]}>{r.outcome}</Pill>
                </td>
                <td className="px-3 py-3 text-right font-mono text-[12px] tabular text-mist">
                  {r.latency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------- policies ---------------------------- */

export function PoliciesView() {
  const [list, setList] = useState<Policy[]>(policySeed);

  const toggle = (id: string) =>
    setList((l) =>
      l.map((p) => (p.id === id ? { ...p, mode: p.mode === "enforce" ? "monitor" : "enforce" } : p)),
    );

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
              <p className="mt-1.5 overflow-x-auto rounded bg-night-2 px-2.5 py-1.5 font-mono text-[12px] leading-relaxed text-mist">
                {p.rule}
              </p>
              <p className="mt-2 text-[12.5px] text-mist-2">
                {p.hits24h.toLocaleString("en-US")} evaluations ·{" "}
                {p.mode === "enforce" ? `${p.blocks24h} blocked` : "would block: logged only"} in 24h
              </p>
            </div>
            <div className="flex items-center gap-3 sm:justify-end">
              <span className="w-[60px] text-right font-mono text-[12px] text-mist-2">{p.mode}</span>
              <button
                type="button"
                role="switch"
                aria-checked={p.mode === "enforce"}
                aria-label={`Enforce ${p.name}`}
                onClick={() => toggle(p.id)}
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-150",
                  p.mode === "enforce"
                    ? "border-brand-on-dark bg-brand"
                    : "border-night-line bg-night-3",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0.5 h-[18px] w-[18px] rounded-full bg-mist transition-transform duration-150 ease-out-strong",
                    p.mode === "enforce" ? "translate-x-[22px]" : "translate-x-0.5",
                  )}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------------- audit ------------------------------ */

export function AuditView() {
  const [id, setId] = useState(auditRecords[0].id);
  const [copied, setCopied] = useState(false);
  const record = auditRecords.find((r) => r.id === id) ?? auditRecords[0];
  const json = JSON.stringify(
    { record: record.id, run: record.run, time: record.time, ...record.evidence },
    null,
    2,
  );

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
                  type="button"
                  onClick={() => setId(r.id)}
                  aria-pressed={on}
                  className={cn(
                    "w-full rounded-lg border p-3.5 text-left transition-colors duration-150",
                    on ? "border-brand-on-dark bg-night-3" : "border-night-line hover:bg-night-2",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[12px] text-mist-2">
                      {r.id} · {r.run}
                    </span>
                    <Pill tone={r.result === "pass" ? "ok" : r.result === "fail" ? "danger" : "neutral"}>
                      {r.result}
                    </Pill>
                  </div>
                  <p className="mt-1.5 text-[13.5px] text-mist">{r.summary}</p>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="overflow-hidden rounded-lg border border-night-line bg-night-2">
          <div className="flex items-center justify-between gap-3 border-b border-night-line px-4 py-2.5">
            <span className="font-mono text-[12px] text-mist-2">{record.time}</span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-[32px] items-center gap-1.5 rounded px-2 text-[12.5px] text-mist-2 transition-colors duration-150 hover:bg-night-3 hover:text-mist"
            >
              {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
              {copied ? "Copied" : "Copy JSON"}
            </button>
          </div>
          <dl className="divide-y divide-night-line text-[12.5px]">
            {Object.entries(record.evidence).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[130px_1fr] gap-3 px-4 py-2">
                <dt className="font-mono text-mist-2">{k}</dt>
                <dd
                  className={cn(
                    "break-words font-mono text-mist",
                    k === "verdict" && "font-medium",
                  )}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? "Evidence copied to clipboard" : ""}
      </span>
    </div>
  );
}

/* ---------------------------------- findings ---------------------------- */

const severityTone: Record<Severity, PillTone> = {
  critical: "danger",
  high: "danger",
  medium: "warn",
  low: "neutral",
};

export function FindingsView() {
  const [open, setOpen] = useState<string | null>(findings[0].id);
  const [acked, setAcked] = useState<string[]>([]);
  const [hideAcked, setHideAcked] = useState(false);
  const list = hideAcked ? findings.filter((f) => !acked.includes(f.id)) : findings;

  return (
    <div>
      <ViewHeader
        title="Security findings"
        lead="From MCP conformance validation, permission reviews and outcome coverage checks."
        right={
          <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-[13px] text-mist-2">
            <input
              type="checkbox"
              checked={hideAcked}
              onChange={(e) => setHideAcked(e.target.checked)}
              className="h-4 w-4 accent-[hsl(var(--brand-on-dark))]"
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
            <li
              key={f.id}
              className={cn("rounded-lg border border-night-line", isAck && "opacity-60")}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`finding-${f.id}`}
                onClick={() => setOpen(isOpen ? null : f.id)}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <Pill tone={severityTone[f.severity]}>{f.severity}</Pill>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-medium text-mist">{f.title}</span>
                  <span className="mt-0.5 block font-mono text-[11.5px] text-mist-2">
                    {f.id} · {f.source} · {f.target}
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 shrink-0 text-mist-2 transition-transform duration-150",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen ? (
                <div
                  id={`finding-${f.id}`}
                  className="border-t border-night-line px-4 pb-4 pt-3 text-[13.5px]"
                >
                  <p className="leading-relaxed text-mist">{f.detail}</p>
                  <p className="mt-3 text-mist-2">
                    <span className="font-medium text-mist">Recommended fix: </span>
                    {f.fix}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setAcked((a) => (isAck ? a.filter((x) => x !== f.id) : [...a, f.id]))
                    }
                    className="mt-4 inline-flex min-h-[36px] items-center rounded-md border border-night-line px-3 text-[13px] font-medium text-mist transition-colors duration-150 hover:bg-night-3"
                  >
                    {isAck ? "Reopen" : "Acknowledge"}
                  </button>
                </div>
              ) : null}
            </li>
          );
        })}
        {list.length === 0 ? (
          <li className="rounded-lg border border-night-line p-6 text-center text-[13.5px] text-mist-2">
            All findings acknowledged.
          </li>
        ) : null}
      </ul>
    </div>
  );
}

/* ----------------------------------- health ----------------------------- */

export function HealthView() {
  const max = 100;
  const min = 90;
  const width = 100 / health.series.length;

  return (
    <div>
      <ViewHeader
        title="Operational health"
        lead="Verification coverage and the state of the control plane itself."
      />

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border border-night-line p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[13px] text-mist-2">Outcomes verified, last 14 days</p>
              <p className="mt-1 font-serif text-[44px] leading-none tabular text-mist">
                {health.verifiedRate}%
              </p>
            </div>
            <dl className="flex gap-6 text-[13px]">
              <div>
                <dt className="text-mist-2">Unverified 24h</dt>
                <dd className="mt-0.5 font-mono text-[18px] tabular text-danger-on-dark">
                  {health.unverified24h}
                </dd>
              </div>
              <div>
                <dt className="text-mist-2">Blocked 24h</dt>
                <dd className="mt-0.5 font-mono text-[18px] tabular text-warn-on-dark">
                  {health.blocked24h}
                </dd>
              </div>
              <div>
                <dt className="text-mist-2">p95 run</dt>
                <dd className="mt-0.5 font-mono text-[18px] tabular text-mist">
                  {health.p95Latency}
                </dd>
              </div>
            </dl>
          </div>
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="mt-6 h-32 w-full"
            role="img"
            aria-label={`Daily verified rate over 14 days, between ${Math.min(
              ...health.series,
            )}% and ${Math.max(...health.series)}%`}
          >
            {[0, 1, 2].map((g) => (
              <line
                key={g}
                x1="0"
                x2="100"
                y1={g * 20}
                y2={g * 20}
                stroke="hsl(var(--night-line))"
                strokeWidth="0.2"
              />
            ))}
            {health.series.map((v, i) => {
              const h = ((v - min) / (max - min)) * 40;
              return (
                <rect
                  key={i}
                  x={i * width + width * 0.18}
                  y={40 - h}
                  width={width * 0.64}
                  height={h}
                  fill={
                    i === health.series.length - 1
                      ? "hsl(var(--brand-on-dark))"
                      : "hsl(var(--brand) / 0.55)"
                  }
                />
              );
            })}
          </svg>
          <div className="mt-2 flex justify-between font-mono text-[11px] text-mist-2">
            <span>14 days ago</span>
            <span>Today</span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-lg border border-night-line">
            <h4 className="border-b border-night-line px-4 py-2.5 text-[13px] font-semibold text-mist">
              Control plane
            </h4>
            <ul className="divide-y divide-night-line text-[13px]">
              {health.services.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <span className="text-mist">
                    {s.name}
                    <span className="block text-[12px] text-mist-2">{s.note}</span>
                  </span>
                  <Pill tone={s.status === "ok" ? "ok" : "warn"}>{s.status}</Pill>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-night-line">
            <h4 className="border-b border-night-line px-4 py-2.5 text-[13px] font-semibold text-mist">
              Verification by owner
            </h4>
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
                      <div
                        className="h-full rounded-full bg-brand-on-dark"
                        style={{ width: `${a.verified}%` }}
                      />
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
