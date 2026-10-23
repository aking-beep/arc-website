import { useEffect, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Bot, FileCheck2, Gauge, ScrollText, ShieldAlert } from 'lucide-react';
import { Container } from '../ui/Container';
import { DemoLabel } from '../ui/DemoLabel';
import { InventoryView } from './InventoryView';
import { ActivityView } from './ActivityView';
import { PoliciesView } from './PoliciesView';
import { AuditView } from './AuditView';
import { FindingsView } from './FindingsView';
import { HealthView } from './HealthView';
import { ConsoleSkeleton } from './ConsoleSkeleton';

export type ConsoleTab = 'inventory' | 'activity' | 'policies' | 'audit' | 'findings' | 'health';

const tabs: { id: ConsoleTab; label: string; icon: typeof Bot }[] = [
  { id: 'inventory', label: 'Agent inventory', icon: Bot },
  { id: 'activity', label: 'Execution activity', icon: Activity },
  { id: 'policies', label: 'Permission policies', icon: ScrollText },
  { id: 'audit', label: 'Audit evidence', icon: FileCheck2 },
  { id: 'findings', label: 'Security findings', icon: ShieldAlert },
  { id: 'health', label: 'Operational health', icon: Gauge },
];

/**
 * Interactive console preview. All data is fictional (data/console.ts).
 * A short simulated fetch on tab change shows the intended loading state.
 */
export function ControlConsole({ tab, onTab }: { tab: ConsoleTab; onTab: (t: ConsoleTab) => void }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 220);
    return () => window.clearTimeout(t);
  }, [tab]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const vertical = window.matchMedia('(min-width: 1024px)').matches;
    const next = vertical ? ['ArrowDown', 'ArrowUp'] : ['ArrowRight', 'ArrowLeft'];
    if (!next.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === next[0] ? 1 : -1;
    const t = tabs[(i + dir + tabs.length) % tabs.length];
    onTab(t.id);
    document.getElementById(`ctab-${t.id}`)?.focus();
  };

  return (
    <section id="console" aria-labelledby="console-title" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[640px]">
            <p className="font-mono text-[12.5px] font-medium text-brand">Console preview</p>
            <h2 id="console-title" className="mt-3 font-serif text-[32px] leading-tight tracking-[-0.015em] text-ink sm:text-[40px]">
              Explore the console with a fictional company.
            </h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
              Northwind Demo Co. runs six agents. Click through what they can reach, what they did, and what the
              evidence says. Nothing here is connected to a real system.
            </p>
          </div>
        </div>

        <div className="dark-surface mt-10 overflow-hidden rounded-xl border border-night-line bg-night text-mist">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-night-line bg-night-2 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-semibold">ARC Control</span>
              <span className="font-mono text-[12px] text-mist-2">northwind-demo · production</span>
            </div>
            <DemoLabel onDark text="Demonstration data · not a live system" />
          </div>

          <div className="lg:grid lg:grid-cols-[220px_1fr]">
            <div
              role="tablist"
              aria-label="Console views"
              aria-orientation="vertical"
              className="flex gap-1 overflow-x-auto border-b border-night-line p-2 lg:flex-col lg:border-b-0 lg:border-r lg:p-3"
            >
              {tabs.map((t, i) => {
                const on = t.id === tab;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    id={`ctab-${t.id}`}
                    role="tab"
                    aria-selected={on}
                    aria-controls="console-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => onTab(t.id)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`flex min-h-[40px] items-center gap-2.5 whitespace-nowrap rounded-md px-3 text-left text-[13.5px] font-medium transition-colors duration-150 ${
                      on ? 'bg-night-3 text-mist' : 'text-mist-2 hover:bg-night-2 hover:text-mist'
                    }`}
                  >
                    <Icon size={15} aria-hidden="true" className={on ? 'text-brand-on-dark' : ''} />
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div
              id="console-panel"
              role="tabpanel"
              aria-labelledby={`ctab-${tab}`}
              aria-busy={loading}
              className="min-h-[520px] p-4 sm:p-6"
            >
              <AnimatePresence mode="wait" initial={false}>
                {loading ? (
                  <motion.div key="sk" exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                    <ConsoleSkeleton />
                  </motion.div>
                ) : (
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {tab === 'inventory' && <InventoryView />}
                    {tab === 'activity' && <ActivityView />}
                    {tab === 'policies' && <PoliciesView />}
                    {tab === 'audit' && <AuditView />}
                    {tab === 'findings' && <FindingsView />}
                    {tab === 'health' && <HealthView />}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[13.5px] text-ink-3">
          Preview only. Agent names, events, policies and findings are invented to show how ARC Control is
          intended to work. Capabilities may change during design-partner development.
        </p>
      </Container>
    </section>
  );
}
