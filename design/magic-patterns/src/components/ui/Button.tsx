import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'onDarkOutline';

export function Button({
  to,
  href,
  children,
  variant = 'primary',
  arrow = false,
  onClick,
  type = 'button',
  disabled,
  className = '',
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}) {
  const base =
    'group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 text-[14.5px] font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60';
  const styles: Record<Variant, string> = {
    primary: 'bg-ink text-white hover:bg-night-3',
    secondary: 'border border-line-strong bg-canvas text-ink hover:border-ink hover:bg-paper',
    ghost: 'px-0 text-ink hover:text-brand',
    onDark: 'bg-mist text-night hover:bg-white',
    onDarkOutline: 'border border-night-line text-mist hover:border-mist-2 hover:bg-night-2',
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  const external = href?.startsWith('http');
  const icon = arrow ? (
    external ? (
      <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    ) : (
      <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
    )
  ) : null;

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
        {icon}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children}
        {icon}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
      {icon}
    </button>
  );
}
