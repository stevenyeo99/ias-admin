import { cn } from '@/lib/utils';

const toneClasses = {
  blue: 'border-blue-200 bg-blue-50 text-blue-700',
  green: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  gray: 'border-slate-200 bg-slate-50 text-slate-600'
};

export default function StatusPill({ children, tone = 'gray', dot = false, className }) {
  return (
    <span
      className={cn(
        'inline-flex h-8 items-center gap-2 rounded-md border px-3 text-sm font-medium',
        toneClasses[tone],
        className
      )}
    >
      {dot ? <span className="h-2 w-2 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
