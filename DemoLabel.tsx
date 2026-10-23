import { FlaskConical } from 'lucide-react';

/** Required on every surface that shows simulated data. */
export function DemoLabel({ onDark = false, text = 'Demonstration data' }: { onDark?: boolean; text?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded border px-2 py-0.5 font-mono text-[11px] font-medium ${
        onDark ? 'border-warn-on-dark/35 text-warn-on-dark' : 'border-warn/30 bg-warn-subtle text-warn'
      }`}
    >
      <FlaskConical size={12} aria-hidden="true" />
      {text}
    </span>
  );
}
