import { useEffect, useState } from 'react';

import { API_BASE_URL } from '@/services/api';

export default function useJobLogStream(jobId) {
  const [logs, setLogs] = useState([]);
  const [connectionState, setConnectionState] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) {
      setLogs([]);
      setConnectionState('idle');
      setError(null);
      return undefined;
    }

    const eventSource = new EventSource(`${API_BASE_URL}/jobs/${jobId}/logs/stream`);

    setLogs([]);
    setConnectionState('connecting');
    setError(null);

    eventSource.onopen = () => {
      setConnectionState('connected');
    };

    eventSource.addEventListener('log', (event) => {
      const log = JSON.parse(event.data);

      setLogs((currentLogs) => {
        if (currentLogs.some((currentLog) => currentLog.id === log.id)) {
          return currentLogs;
        }

        return [...currentLogs, log];
      });
    });

    eventSource.onerror = () => {
      setConnectionState('error');
      setError(new Error('Realtime log stream disconnected'));
    };

    return () => {
      eventSource.close();
    };
  }, [jobId]);

  return {
    logs,
    connectionState,
    error
  };
}
