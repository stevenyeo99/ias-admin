import { Calendar, FileText, Loader2, Play, RotateCcw } from 'lucide-react';
import { useState } from 'react';

import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function FormField({ id, name, label, placeholder, required = false, icon: Icon, value, onChange, disabled }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-medium text-slate-800">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="h-10 pr-9"
        />
        {Icon ? <Icon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /> : null}
      </div>
    </div>
  );
}

export default function JobForm({ values, onStart, isStarting = false, isRunning = false, error }) {
  const [formValues, setFormValues] = useState(values);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onStart(formValues);
  }

  function handleReset() {
    setFormValues(values);
  }

  return (
    <Card className="overflow-hidden">
      <SectionTitle icon={FileText}>Job Details</SectionTitle>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          <FormField
            id="policy-number"
            name="policyNumber"
            label="Policy Number"
            placeholder="Enter policy number"
            required
            icon={FileText}
            value={formValues.policyNumber}
            onChange={handleChange}
            disabled={isStarting || isRunning}
          />
          <FormField
            id="member-number"
            name="memberNumber"
            label="Member Number (Optional)"
            placeholder="Enter member number"
            icon={FileText}
            value={formValues.memberNumber}
            onChange={handleChange}
            disabled={isStarting || isRunning}
          />
          <FormField
            id="date-of-birth"
            name="dateOfBirth"
            label="Date of Birth (Optional)"
            placeholder="DD/MM/YYYY"
            icon={Calendar}
            value={formValues.dateOfBirth}
            onChange={handleChange}
            disabled={isStarting || isRunning}
          />
          <FormField
            id="agent-code"
            name="agentCode"
            label="Agent Code (Optional)"
            placeholder="Enter agent code"
            value={formValues.agentCode}
            onChange={handleChange}
            disabled={isStarting || isRunning}
          />
        </div>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        {isRunning ? <p className="mt-3 text-sm text-amber-700">Automation is running. Start is disabled until this job finishes.</p> : null}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button type="submit" className="h-10 bg-blue-600 hover:bg-blue-700" disabled={isStarting || isRunning}>
            {isStarting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
            {isStarting ? 'Starting...' : isRunning ? 'Running...' : 'Start Automation'}
          </Button>
          <Button type="button" variant="outline" className="h-10" onClick={handleReset} disabled={isStarting || isRunning}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        </form>
      </CardContent>
    </Card>
  );
}
