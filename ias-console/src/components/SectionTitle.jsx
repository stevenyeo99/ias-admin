import { cn } from '@/lib/utils';

export default function SectionTitle({ icon: Icon, children, action, className }) {
  return (
    <div className={cn('flex items-center justify-between border-b px-4 py-3', className)}>
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-normal text-blue-700">
        {Icon ? <Icon className="h-4 w-4" /> : null}
        <span>{children}</span>
      </div>
      {action}
    </div>
  );
}
