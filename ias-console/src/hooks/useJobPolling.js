import { useEffect, useState } from 'react';

export default function useJobPolling(jobId) {
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!jobId) {
      setJob(null);
    }
  }, [jobId]);

  return {
    job,
    isPolling: false
  };
}
