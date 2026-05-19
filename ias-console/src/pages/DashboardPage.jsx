import AppHeader from '@/components/AppHeader';
import JobInformation from '@/components/JobInformation';
import LiveWebPageViewer from '@/components/LiveWebPageViewer';
import JobForm from '../components/JobForm.jsx';
import JobLogs from '../components/JobLogs.jsx';
import ExtractedDataPreview from '../components/ExtractedDataPreview.jsx';
import {
  activityLogs,
  extractedData,
  headerState,
  jobDetails,
  jobInfoCards,
  viewerState
} from '@/data/consoleMockData';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <AppHeader state={headerState} />
      <section className="grid gap-3 p-3 xl:grid-cols-[350px_minmax(0,1fr)]">
        <div className="grid content-start gap-3">
          <JobForm values={jobDetails} />
          <JobLogs logs={activityLogs} />
          <ExtractedDataPreview rows={extractedData} />
        </div>
        <div className="grid min-w-0 content-start gap-3">
          <LiveWebPageViewer state={viewerState} />
          <JobInformation items={jobInfoCards} />
        </div>
      </section>
    </main>
  );
}
