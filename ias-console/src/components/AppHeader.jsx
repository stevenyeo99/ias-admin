import StatusPill from '@/components/StatusPill';

export default function AppHeader({ state }) {
  return (
    <header className="flex min-h-[76px] flex-wrap items-center justify-between gap-4 border-b bg-white px-5 py-3 shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-lg font-bold text-white shadow-sm">
          {state.logoLabel}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold leading-6 text-slate-950">{state.title}</h1>
          <p className="truncate text-sm text-slate-500">{state.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden rounded-md border bg-white px-4 py-2 text-sm shadow-sm sm:block">
          <span className="text-slate-700">System Status:</span>
          <span className="ml-2 inline-flex items-center gap-2 font-semibold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {state.status}
          </span>
        </div>
        <StatusPill tone="green" dot className="sm:hidden">
          {state.status}
        </StatusPill>
      </div>
    </header>
  );
}
