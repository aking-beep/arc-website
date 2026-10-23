import type { ReactNode } from 'react';

export type Tone = 'ok' | 'warn' | 'danger' | 'neutral' | 'brand';

const tones: Record<Tone, string> = {
  ok: 'border-ok-on-dark/30 text-ok-on-dark',
  warn: 'border-warn-on-dark/35 text-warn-on-dark',
  danger: 'border-danger-on-dark/40 text-danger-on-dark',
  neutral: 'border-night-line text-mist-2',
  brand: 'border-brand-on-dark/35 text-brand-on-dark',
};

export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded border px-1.5 py-px font-mono text-[11.5px] capitalize ${tones[tone]}`}>
      {children}
    </span>
  );
}
