import { AlertCircle, Check, ChevronsRight, Circle, Rocket } from 'lucide-react';

import SectionTitle from '@/components/SectionTitle';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const stateStyles = {
  done: {
    icon: Check,
    marker: 'bg-green-500 text-white',
    text: 'text-slate-950',
    time: 'text-slate-950'
  },
  active: {
    icon: ChevronsRight,
    marker: 'bg-blue-600 text-white',
    text: 'text-slate-950',
    time: 'text-blue-700'
  },
  failed: {
    icon: AlertCircle,
    marker: 'bg-red-600 text-white',
    text: 'text-red-700',
    time: 'text-red-700'
  },
  pending: {
    icon: Circle,
    marker: 'bg-slate-300 text-slate-300',
    text: 'text-slate-700',
    time: 'text-slate-500'
  }
};

export default function JobLogs({ logs }) {
  return (
    <Card className="overflow-hidden">
      <SectionTitle
        icon={Rocket}
        action={<button type="button" className="text-xs font-medium text-blue-600">Clear</button>}
      >
        Activity Log
      </SectionTitle>
      <CardContent className="p-4">
        {logs.length === 0 ? (
          <p className="text-sm text-slate-500">No activity yet.</p>
        ) : (
        <ol className="space-y-2">
          {logs.map((log, index) => {
            const style = stateStyles[log.state] || stateStyles.pending;
            const Icon = style.icon;

            return (
              <li key={`${log.time}-${log.message}`} className="grid grid-cols-[20px_58px_1fr] items-start gap-2 text-sm">
                <span className="relative flex justify-center">
                  {index < logs.length - 1 ? <span className="absolute top-5 h-5 w-px bg-slate-200" /> : null}
                  <span className={cn('relative z-10 flex h-4 w-4 items-center justify-center rounded-full', style.marker)}>
                    <Icon className={cn('h-3 w-3', log.state === 'pending' && 'fill-current')} />
                  </span>
                </span>
                <span className={cn('font-medium tabular-nums', style.time)}>{log.time}</span>
                <span className={style.text}>
                  {log.message}
                  {log.detail ? <span className="ml-1 font-semibold text-blue-700">{log.detail}</span> : null}
                </span>
              </li>
            );
          })}
        </ol>
        )}
      </CardContent>
    </Card>
  );
}
