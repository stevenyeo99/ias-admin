import AppHeader from '@/components/AppHeader';
import JobInformation from '@/components/JobInformation';
import LiveWebPageViewer from '@/components/LiveWebPageViewer';
import JobForm from '../components/JobForm.jsx';
import JobLogs from '../components/JobLogs.jsx';
import ExtractedDataPreview from '../components/ExtractedDataPreview.jsx';
import useJobLogStream from '@/hooks/useJobLogStream';
import useJobPolling from '@/hooks/useJobPolling';
import { createJob, API_BASE_URL } from '@/services/api';
import {
  activityLogs,
  extractedData,
  headerState,
  jobDetails,
  jobInfoCards,
  viewerState
} from '@/data/consoleMockData';
import { CalendarDays, Clock3, FileText, Monitor, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';

const RUNNING_STATUSES = new Set(['queued', 'running']);

export default function DashboardPage() {
  const [activeJobId, setActiveJobId] = useState(null);
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState(null);
  const { job } = useJobPolling(activeJobId);
  const { logs } = useJobLogStream(activeJobId);
  const isRunning = job ? RUNNING_STATUSES.has(job.status) : false;

  async function handleStartAutomation(input) {
    try {
      setIsStarting(true);
      setStartError(null);
      const nextJob = await createJob(input);
      setActiveJobId(nextJob.id);
    } catch (error) {
      setStartError(error.message);
    } finally {
      setIsStarting(false);
    }
  }

  const displayedLogs = useMemo(() => {
    if (logs.length === 0) {
      return activityLogs;
    }

    return mapBackendLogs(logs);
  }, [logs]);

  const displayedViewerState = useMemo(() => {
    if (!job) {
      return viewerState;
    }

    return {
      ...viewerState,
      browserStatus: formatBrowserStatus(job.browserStatus),
      currentStep: job.currentStep || 'Waiting',
      status: job.status,
      latestScreenshot: job.latestScreenshot ? `${API_BASE_URL}${job.latestScreenshot}` : null
    };
  }, [job]);

  const displayedJobInfo = useMemo(() => {
    if (!job) {
      return jobInfoCards;
    }

    return buildJobInfoCards(job);
  }, [job]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <AppHeader state={headerState} />
      <section className="grid gap-3 p-3 xl:grid-cols-[350px_minmax(0,1fr)]">
        <div className="grid content-start gap-3">
          <JobForm
            values={jobDetails}
            onStart={handleStartAutomation}
            isStarting={isStarting}
            isRunning={isRunning}
            error={startError}
          />
          <JobLogs logs={displayedLogs} />
          <ExtractedDataPreview rows={extractedData} />
        </div>
        <div className="grid min-w-0 content-start gap-3">
          <LiveWebPageViewer state={displayedViewerState} />
          <JobInformation items={displayedJobInfo} />
        </div>
      </section>
    </main>
  );
}

function mapBackendLogs(logs) {
  return logs.map((log, index) => {
    const isLast = index === logs.length - 1;

    return {
      time: formatTime(log.timestamp),
      message: log.message,
      detail: log.level === 'error' ? getSafeErrorDetail(log) : undefined,
      state: resolveLogState(log, isLast)
    };
  });
}

function resolveLogState(log, isLast) {
  if (log.level === 'error') {
    return 'active';
  }

  if (log.status === 'completed') {
    return 'done';
  }

  return isLast ? 'active' : 'done';
}

function getSafeErrorDetail(log) {
  if (!log.meta?.reason) {
    return undefined;
  }

  const reason = log.meta.reason.replace(/\s+/g, ' ').trim();
  return reason.length > 80 ? `${reason.slice(0, 80)}...` : reason;
}

function buildJobInfoCards(job) {
  return [
    {
      label: 'Job ID',
      value: job.id,
      icon: FileText,
      tone: 'blue'
    },
    {
      label: 'Status',
      value: formatStatus(job.status),
      icon: ShieldCheck,
      tone: getJobTone(job.status),
      badge: true
    },
    {
      label: 'Created At',
      value: formatDateTime(job.createdAt),
      icon: CalendarDays,
      tone: 'blue'
    },
    {
      label: 'Duration',
      value: formatDuration(job),
      icon: Clock3,
      tone: 'blue'
    },
    {
      label: 'Browser',
      value: formatBrowserStatus(job.browserStatus),
      icon: Monitor,
      tone: 'teal'
    }
  ];
}

function getJobTone(status) {
  if (status === 'completed') {
    return 'green';
  }

  if (status === 'failed') {
    return 'red';
  }

  if (RUNNING_STATUSES.has(status)) {
    return 'yellow';
  }

  return 'blue';
}

function formatStatus(status) {
  if (!status) {
    return '-';
  }

  return status
    .split('_')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function formatBrowserStatus(status) {
  return formatStatus(status || 'idle');
}

function formatTime(timestamp) {
  if (!timestamp) {
    return '--:--:--';
  }

  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date(timestamp));
}

function formatDateTime(timestamp) {
  if (!timestamp) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date(timestamp));
}

function formatDuration(job) {
  const startTime = job.startedAt || job.createdAt;
  const endTime = job.completedAt || job.updatedAt;

  if (!startTime || !endTime) {
    return '00:00:00';
  }

  const seconds = Math.max(0, Math.floor((new Date(endTime) - new Date(startTime)) / 1000));
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const remainingSeconds = String(seconds % 60).padStart(2, '0');

  return `${hours}:${minutes}:${remainingSeconds}`;
}
