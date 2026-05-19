import { Bot } from 'lucide-react';

import SectionTitle from '@/components/SectionTitle';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const toneClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-600',
  yellow: 'bg-amber-50 text-amber-600',
  teal: 'bg-teal-50 text-teal-600'
};

const badgeClasses = {
  green: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50',
  red: 'border-red-200 bg-red-50 text-red-700 hover:bg-red-50',
  yellow: 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50',
  blue: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50'
};

export default function JobInformation({ items }) {
  return (
    <Card className="overflow-hidden">
      <SectionTitle icon={Bot}>Job Information</SectionTitle>
      <CardContent className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-md border bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full', toneClasses[item.tone])}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  {item.badge ? (
                    <Badge className={cn('mt-3', badgeClasses[item.tone] || badgeClasses.blue)}>
                      {item.value}
                    </Badge>
                  ) : (
                    <p className="mt-3 truncate text-sm text-slate-600">{item.value}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
