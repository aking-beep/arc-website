import type { ReactNode } from 'react';

export function ViewHeader({ title, lead, right }: { title: string; lead: string; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h3 className="text-[17px] font-semibold text-mist">{title}</h3>
        <p className="mt-1 text-[13.5px] text-mist-2">{lead}</p>
      </div>
      {right}
    </div>
  );
}
