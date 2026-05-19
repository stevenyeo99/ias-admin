import { Bot } from 'lucide-react';

import SectionTitle from '@/components/SectionTitle';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const toneClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  teal: 'bg-teal-50 text-teal-600'
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
                    <Badge className="mt-3 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
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
