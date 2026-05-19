import { useEffect, useState } from 'react';

import { API_BASE_URL } from '@/services/api';

export default function useJobLogStream(jobId) {
  const [logs, setLogs] = useState([]);
  const [preview, setPreview] = useState(null);
  const [connectionState, setConnectionState] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) {
      setLogs([]);
      setPreview(null);
      setConnectionState('idle');
      setError(null);
      return undefined;
    }

    const eventSource = new EventSource(`${API_BASE_URL}/jobs/${jobId}/logs/stream`);

    setLogs([]);
    setPreview(null);
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

    eventSource.addEventListener('preview', (event) => {
      const previewEvent = JSON.parse(event.data);

      if (previewEvent.preview?.url) {
        setPreview({
          url: previewEvent.preview.url,
          timestamp: previewEvent.timestamp
        });
      }
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
    preview,
    connectionState,
    error
  };
}
