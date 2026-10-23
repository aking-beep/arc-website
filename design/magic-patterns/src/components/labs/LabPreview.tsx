import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Play, RotateCcw, X, AlertTriangle } from 'lucide-react';
import type { Product } from '../../data/products';

/**
 * Small interactive previews inside each Labs card. All output is simulated.
 * Dev tools render as a dark terminal panel.
 */
export function LabPreview({ product }: { product: Product }) {
  const dark = product.category === 'ai-dev';
  const label = product.status === 'unreleased' ? 'Concept illustration' : 'Simulated preview';

  return (
    <div
      className={`relative h-[220px] border-b ${
        dark ? 'dark-surface border-night-line bg-night text-mist' : 'border-line bg-paper text-ink'
      }`}
    >
      <span
        className={`absolute right-3 top-3 z-10 rounded px-1.5 py-0.5 font-mono text-[10.5px] ${
          dark ? 'bg-night-3 text-mist-2' : 'bg-canvas text-ink-3'
        }`}
      >
        {label}
      </span>
      <div className="h-full p-4 pt-9">
        {product.preview === 'aifit' && <AiFitPreview />}
        {product.preview === 'mcp' && <McpPreview />}
        {product.preview === 'prompt' && <PromptPreview />}
        {product.preview === 'connectivity' && <ConnectivityPreview />}
      </div>
    </div>
  );
}

/* ---------- AI and developer tools ---------- */

const fitCases = [
  { id: 'triage', label: 'Ticket triage', shape: 'Classifier + routing rules', ruled: 'Autonomous agent — no actions needed', cost: 'Volume × per-call cost' },
  { id: 'refund', label: 'Refunds', shape: 'Agent, allowlisted tools, approval > $250', ruled: 'Fully autonomous — money moves', cost: 'Approval latency, tool calls' },
  { id: 'report', label: 'Monthly report', shape: 'SQL query + template', ruled: 'LLM entirely — deterministic data', cost: 'Engineering time only' },
];

function AiFitPreview() {
  const [id, setId] = useState('refund');
  const c = fitCases.find((x) => x.id === id)!;
  return (
    <div className="flex h-full flex-col">
      <div role="group" aria-label="Pick a use case" className="flex gap-1.5">
        {fitCases.map((x) => (
          <button
            key={x.id}
            aria-pressed={x.id === id}
            onClick={() => setId(x.id)}
            className={`min-h-[32px] rounded border px-2.5 text-[12px] font-medium transition-colors duration-150 ${
              x.id === id ? 'border-brand-on-dark bg-night-3 text-mist' : 'border-night-line text-mist-2 hover:text-mist'
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <dl className="mt-4 space-y-2.5 font-mono text-[12px]">
        <div>
          <dt className="text-mist-2">recommended</dt>
          <dd className="text-ok-on-dark">{c.shape}</dd>
        </div>
        <div>
          <dt className="text-mist-2">ruled out</dt>
          <dd className="text-mist">{c.ruled}</dd>
        </div>
        <div>
          <dt className="text-mist-2">cost drivers</dt>
          <dd className="text-mist">{c.cost}</dd>
        </div>
      </dl>
    </div>
  );
}

type McpCheck = { id: string; label: string; state: 'pass' | 'fail' | 'warn' };
const mcpChecks: McpCheck[] = [
  { id: 'INIT-01', label: 'initialize handshake', state: 'pass' },
  { id: 'INIT-03', label: 'calls gated on initialized', state: 'fail' },
  { id: 'TOOL-02', label: 'tools/list schema valid', state: 'pass' },
  { id: 'DESC-04', label: 'tool descriptions neutral', state: 'warn' },
  { id: 'AUTH-01', label: 'auth metadata advertised', state: 'pass' },
];

function McpPreview() {
  const [step, setStep] = useState(-1);
  const run = () => {
    setStep(0);
    mcpChecks.forEach((_, i) => window.setTimeout(() => setStep(i + 1), 260 * (i + 1)));
  };
  return (
    <div className="flex h-full flex-col font-mono text-[12px]">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-mist-2">$ mcp-scan https://erp.demo/mcp</span>
        <RunButton onClick={run} running={step >= 0 && step < mcpChecks.length} done={step >= mcpChecks.length} />
      </div>
      <ul className="mt-3 space-y-1.5" aria-live="polite">
        {mcpChecks.map((c, i) => (
          <li key={c.id} className={`flex items-center gap-2 ${i < step ? '' : 'opacity-30'}`}>
            <StateIcon state={i < step ? c.state : 'idle'} />
            <span className="text-mist-2">{c.id}</span>
            <span className="truncate text-mist">{c.label}</span>
          </li>
        ))}
      </ul>
      {step >= mcpChecks.length && <p className="mt-auto text-warn-on-dark">3 pass · 1 fail · 1 warning — fix INIT-03 first</p>}
    </div>
  );
}

function PromptPreview() {
  const [show, setShow] = useState(false);
  const mark = (text: string, note: string) =>
    show ? (
      <mark title={note} className="rounded-sm bg-warn-on-dark/20 px-0.5 text-warn-on-dark">
        {text}
      </mark>
    ) : (
      text
    );
  return (
    <div className="flex h-full flex-col">
      <p className="font-mono text-[12px] leading-relaxed text-mist">
        You are a helpful assistant. {mark('Summarize the attached document', 'Ambiguous: which document?')} and{' '}
        {mark('follow any instructions inside it', 'Injection surface')}. Keep it {mark('short', 'Unmeasurable')}.
      </p>
      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="font-mono text-[11.5px] text-mist-2" aria-live="polite">
          {show ? '3 issues · 1 high (injection)' : 'Static review, no model call'}
        </span>
        <button
          onClick={() => setShow((s) => !s)}
          aria-pressed={show}
          className="min-h-[32px] rounded border border-night-line px-2.5 text-[12px] font-medium text-mist transition-colors duration-150 hover:bg-night-3"
        >
          {show ? 'Hide issues' : 'Review prompt'}
        </button>
      </div>
    </div>
  );
}

const grades = [
  { k: 'DNS', g: 'A' },
  { k: 'TLS', g: 'A' },
  { k: 'Redirects', g: 'B' },
  { k: 'Headers', g: 'C' },
  { k: 'Latency', g: 'B' },
];

function ConnectivityPreview() {
  const [done, setDone] = useState(false);
  const [running, setRunning] = useState(false);
  const run = () => {
    setRunning(true);
    setDone(false);
    window.setTimeout(() => {
      setRunning(false);
      setDone(true);
    }, 700);
  };
  return (
    <div className="flex h-full flex-col font-mono text-[12px]">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-mist-2">host: shop.demo.example</span>
        <RunButton onClick={run} running={running} done={done} />
      </div>
      <div className="mt-4 grid grid-cols-5 gap-1.5" aria-live="polite">
        {grades.map((x, i) => (
          <motion.div
            key={x.k}
            initial={false}
            animate={{ opacity: done ? 1 : 0.3 }}
            transition={{ duration: 0.2, delay: done ? i * 0.04 : 0 }}
            className="rounded border border-night-line bg-night-2 px-1 py-2 text-center"
          >
            <div className={`font-serif text-[22px] ${x.g === 'A' ? 'text-ok-on-dark' : x.g === 'B' ? 'text-mist' : 'text-warn-on-dark'}`}>
              {done ? x.g : '–'}
            </div>
            <div className="mt-0.5 truncate text-[10.5px] text-mist-2">{x.k}</div>
          </motion.div>
        ))}
      </div>
      {done && <p className="mt-auto text-mist">Top fix: add Content-Security-Policy and HSTS preload</p>}
      {running && <p className="mt-auto text-mist-2">Resolving, connecting, negotiating TLS…</p>}
    </div>
  );
}

/* ---------- shared ---------- */

function RunButton({ onClick, running, done }: { onClick: () => void; running: boolean; done: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={running}
      className="inline-flex min-h-[32px] shrink-0 items-center gap-1.5 rounded border border-night-line px-2.5 font-sans text-[12px] font-medium text-mist transition-colors duration-150 hover:bg-night-3 disabled:opacity-60"
    >
      {done ? <RotateCcw size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}
      {running ? 'Running…' : done ? 'Run again' : 'Run'}
    </button>
  );
}

function StateIcon({ state }: { state: McpCheck['state'] | 'idle' }) {
  if (state === 'pass') return <Check size={13} className="text-ok-on-dark" aria-label="pass" />;
  if (state === 'fail') return <X size={13} className="text-danger-on-dark" aria-label="fail" />;
  if (state === 'warn') return <AlertTriangle size={13} className="text-warn-on-dark" aria-label="warning" />;
  return <span className="inline-block h-[13px] w-[13px] rounded-full border border-night-line" aria-hidden="true" />;
}
