import { Link } from 'react-router-dom';

export function Brand({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="ARC Transformation Group, home"
      className={`inline-flex items-center gap-2.5 ${onDark ? 'text-mist' : 'text-ink'}`}
    >
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <rect x="0.5" y="0.5" width="25" height="25" rx="5" fill="currentColor" />
        <path
          d="M6.5 19 A6.5 6.5 0 0 1 19.5 19"
          fill="none"
          stroke={onDark ? '#0a0e15' : '#ffffff'}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="13" cy="12.5" r="1.8" fill={onDark ? '#056b80' : '#7ccbd9'} />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight">ARC</span>
        <span className={`mt-0.5 text-[10.5px] font-medium ${onDark ? 'text-mist-2' : 'text-ink-3'}`}>
          Transformation Group
        </span>
      </span>
    </Link>
  );
}
