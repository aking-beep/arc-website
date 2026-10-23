import type { Status } from '../../data/products';

/**
 * The one way maturity is shown anywhere on the site. Labels are deliberately
 * literal so a visitor never mistakes an experiment for a product.
 */
export function StatusBadge({ status, onDark = false }: { status: Status; onDark?: boolean }) {
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[11.5px] font-medium ${
        onDark ? s.dark : s.light
      }`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

const map: Record<Status, { label: string; light: string; dark: string; dot: string }> = {
  available: {
    label: 'Available',
    light: 'border-ok/25 bg-ok-subtle text-ok',
    dark: 'border-ok-on-dark/30 text-ok-on-dark',
    dot: 'bg-ok',
  },
  'open-source': {
    label: 'Open source · live',
    light: 'border-ok/25 bg-ok-subtle text-ok',
    dark: 'border-ok-on-dark/30 text-ok-on-dark',
    dot: 'bg-ok',
  },
  alpha: {
    label: 'Alpha',
    light: 'border-warn/25 bg-warn-subtle text-warn',
    dark: 'border-warn-on-dark/30 text-warn-on-dark',
    dot: 'bg-warn',
  },
  experiment: {
    label: 'Experiment',
    light: 'border-line-strong bg-paper text-ink-2',
    dark: 'border-night-line text-mist-2',
    dot: 'bg-ink-3',
  },
  'design-partners': {
    label: 'Design-partner development',
    light: 'border-brand/25 bg-brand-subtle text-brand',
    dark: 'border-brand-on-dark/30 text-brand-on-dark',
    dot: 'bg-brand',
  },
  unreleased: {
    label: 'In development · not public',
    light: 'border-line-strong bg-paper text-ink-2',
    dark: 'border-night-line text-mist-2',
    dot: 'bg-ink-3',
  },
};
