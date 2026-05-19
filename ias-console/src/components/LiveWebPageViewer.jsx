import {
  Camera,
  Expand,
  Globe2,
  Monitor,
  RefreshCw
} from 'lucide-react';

import SectionTitle from '@/components/SectionTitle';
import StatusPill from '@/components/StatusPill';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function IconButton({ icon: Icon, label }) {
  return (
    <Button type="button" variant="outline" size="sm" className="h-10 w-10 p-0" aria-label={label}>
      <Icon className="h-4 w-4" />
    </Button>
  );
}

export default function LiveWebPageViewer({ state }) {
  return (
    <Card className="overflow-hidden">
      <SectionTitle icon={Monitor}>Live Web Page Viewer</SectionTitle>
      <CardContent className="space-y-4 p-4">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-800">Browser Status:</span>
            <StatusPill tone="green" className="h-7 px-3 text-xs">{state.browserStatus}</StatusPill>
          </div>
          <div className="flex items-center gap-2 lg:ml-10">
            <span className="text-slate-800">Current Step:</span>
            <StatusPill tone="blue" className="h-7 px-3 text-xs">{state.currentStep}</StatusPill>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span>Auto Refresh</span>
              <span className="relative inline-flex h-7 w-12 items-center rounded-full bg-emerald-500 p-1">
                <span className="h-5 w-5 translate-x-5 rounded-full bg-white shadow-sm" />
              </span>
            </div>
            <select
              className="h-10 rounded-md border bg-white px-4 text-sm shadow-sm outline-none"
              defaultValue={state.zoom}
              aria-label="Viewer zoom"
            >
              <option>{state.zoom}</option>
            </select>
            <div className="hidden h-8 border-l md:block" />
            <IconButton icon={RefreshCw} label="Refresh viewer" />
            <IconButton icon={Camera} label="Capture screenshot" />
            <IconButton icon={Expand} label="Fullscreen viewer" />
          </div>
        </div>

        <div className="flex min-h-[360px] items-center justify-center rounded-md border bg-slate-50 px-6 py-12 lg:min-h-[470px]">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-6 flex h-24 w-32 flex-col rounded-md border-2 border-blue-600 bg-white text-blue-600 shadow-sm">
              <div className="flex h-4 items-center gap-1 border-b-2 border-blue-600 px-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              </div>
              <div className="flex flex-1 items-center justify-center">
                <Globe2 className="h-14 w-14 stroke-[1.8]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-950">Live Internal Web System Viewer</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Live web page / browser view will appear here during automation execution.
            </p>
            <p className="mt-5 text-base leading-7 text-slate-600">
              This area will display the real-time view of the internal IAS system once connected.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
