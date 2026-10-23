import type { ReactNode } from 'react';

export function SectionIntro({
  eyebrow,
  title,
  lead,
  onDark = false,
  id,
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  onDark?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-[720px] ${className}`}>
      {eyebrow && (
        <p className={`font-mono text-[12.5px] font-medium ${onDark ? 'text-brand-on-dark' : 'text-brand'}`}>{eyebrow}</p>
      )}
      <h2
        id={id}
        className={`mt-3 font-serif text-[32px] leading-[1.12] tracking-[-0.015em] text-balance sm:text-[40px] ${
          onDark ? 'text-mist' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-[17px] leading-relaxed text-pretty ${onDark ? 'text-mist-2' : 'text-ink-2'}`}>{lead}</p>
      )}
    </div>
  );
}
