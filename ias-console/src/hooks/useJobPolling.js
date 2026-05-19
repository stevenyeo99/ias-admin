import { useEffect, useState } from 'react';

import { getJob } from '@/services/api';

const TERMINAL_STATUSES = new Set(['completed', 'failed', 'cancelled']);

export default function useJobPolling(jobId) {
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    if (!jobId) {
      setJob(null);
      setError(null);
      setIsPolling(false);
      return undefined;
    }

    let cancelled = false;
    let timeoutId;

    async function poll() {
      try {
        setIsPolling(true);
        const nextJob = await getJob(jobId);

        if (cancelled) {
          return;
        }

        setJob(nextJob);
        setError(null);

        if (!TERMINAL_STATUSES.has(nextJob.status)) {
          timeoutId = window.setTimeout(poll, 1500);
        } else {
          setIsPolling(false);
        }
      } catch (pollError) {
        if (cancelled) {
          return;
        }

        setError(pollError);
        timeoutId = window.setTimeout(poll, 2500);
      }
    }

    poll();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      setIsPolling(false);
    };
  }, [jobId]);

  return {
    job,
    isPolling,
    error
  };
}
