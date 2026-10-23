import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { site } from '../../data/site';

export function InquirySuccess({ name, email, type }: { name: string; email: string; type: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const first = name.trim().split(' ')[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
      role="status"
      className="rounded-xl border border-line bg-canvas p-6 sm:p-10"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ok-subtle text-ok">
        <Check size={22} aria-hidden="true" />
      </span>
      <h2 ref={ref} tabIndex={-1} className="mt-6 font-serif text-[32px] leading-tight text-ink outline-none">
        Thanks, {first}. It’s with us.
      </h2>
      <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
        We’ll reply to <span className="font-medium text-ink">{email}</span> with a recommended first step, usually
        within two business days.
      </p>
      <dl className="mt-8 grid gap-4 border-t border-line pt-6 text-[14.5px] sm:grid-cols-2">
        <div>
          <dt className="text-ink-3">Topic</dt>
          <dd className="mt-0.5 text-ink">{type}</dd>
        </div>
        <div>
          <dt className="text-ink-3">Reference</dt>
          <dd className="mt-0.5 font-mono text-ink">ARC-{Date.now().toString(36).slice(-6).toUpperCase()}</dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={site.calendly} arrow>
          Book 30 minutes now
        </Button>
        <Button to="/research" variant="secondary">
          Read the research while you wait
        </Button>
      </div>
      <p className="mt-6 text-[12.5px] text-ink-3">Prototype confirmation: no message was sent.</p>
    </motion.div>
  );
}
