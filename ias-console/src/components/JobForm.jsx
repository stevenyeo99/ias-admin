import { Calendar, FileText, Play, RotateCcw } from 'lucide-react';

import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function FormField({ id, label, placeholder, required = false, icon: Icon }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-medium text-slate-800">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </Label>
      <div className="relative">
        <Input id={id} placeholder={placeholder} className="h-10 pr-9" />
        {Icon ? <Icon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /> : null}
      </div>
    </div>
  );
}

export default function JobForm() {
  return (
    <Card className="overflow-hidden">
      <SectionTitle icon={FileText}>Job Details</SectionTitle>
      <CardContent className="p-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          <FormField
            id="policy-number"
            label="Policy Number"
            placeholder="Enter policy number"
            required
            icon={FileText}
          />
          <FormField
            id="member-number"
            label="Member Number (Optional)"
            placeholder="Enter member number"
            icon={FileText}
          />
          <FormField
            id="date-of-birth"
            label="Date of Birth (Optional)"
            placeholder="DD/MM/YYYY"
            icon={Calendar}
          />
          <FormField
            id="agent-code"
            label="Agent Code (Optional)"
            placeholder="Enter agent code"
          />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button type="button" className="h-10 bg-blue-600 hover:bg-blue-700">
            <Play className="mr-2 h-4 w-4" />
            Start Automation
          </Button>
          <Button type="button" variant="outline" className="h-10">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
