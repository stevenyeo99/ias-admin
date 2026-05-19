export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });
  const payload = await response.json();

  if (!response.ok || payload.success === false) {
    throw new Error(payload.error?.message || 'API request failed');
  }

  return payload.data;
}

export async function getHealth() {
  return request('/health');
}

export async function listJobs() {
  return request('/jobs');
}

export async function createJob(input = {}) {
  return request('/jobs', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export async function getJob(jobId) {
  return request(`/jobs/${jobId}`);
}
