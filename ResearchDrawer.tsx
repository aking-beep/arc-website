import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import type { ResearchItem } from '../../data/research';

/**
 * Detail panel for a research item. In production each item is a full page at
 * /research/[slug] (existing repository route); the prototype shows the summary.
 */
export function ResearchDrawer({ item, onClose }: { item: ResearchItem | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!item) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      lastFocus.current?.focus();
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-night/40"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={{ x: 32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 32, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col overflow-y-auto bg-canvas shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className="font-mono text-[12px] text-ink-3">
                {item.kind} · {item.topic}
              </span>
              <button ref={closeRef} onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-md text-ink-2 hover:bg-paper hover:text-ink">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 px-6 py-8 sm:px-8">
              <h2 id="drawer-title" className="font-serif text-[30px] leading-[1.15] text-ink">
                {item.title}
              </h2>
              <p className="mt-3 text-[13.5px] text-ink-3">
                {item.date} · {item.minutes} min read{item.sources > 0 ? ` · ${item.sources} cited sources` : ''}
              </p>
              <p className="mt-6 text-[17px] leading-relaxed text-ink">{item.summary}</p>
              <div className="mt-8 rounded-lg bg-paper p-5 text-[14px] leading-relaxed text-ink-2">
                The full piece lives at <code className="font-mono text-[13px] text-ink">/research/{item.slug}</code> on the current
                site. This prototype shows the summary only.
              </div>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-line px-6 py-5 sm:px-8">
              <Button to="/contact" arrow>
                Discuss this with ARC
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Back to library
              </Button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
