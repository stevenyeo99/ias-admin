const jobs = new Map();

const TERMINAL_STATUSES = new Set(['completed', 'failed', 'cancelled']);

function list() {
  return Array.from(jobs.values());
}

function create(input) {
  const now = new Date().toISOString();
  const job = {
    id: createJobId(),
    status: 'queued',
    currentStep: 'Queued',
    browserStatus: 'idle',
    latestScreenshot: null,
    error: null,
    input: input || {},
    createdAt: now,
    startedAt: null,
    completedAt: null,
    updatedAt: now
  };

  jobs.set(job.id, job);
  return job;
}

function get(jobId) {
  return jobs.get(jobId) || null;
}

function update(jobId, patch) {
  const existingJob = get(jobId);

  if (!existingJob) {
    return null;
  }

  const nextJob = {
    ...existingJob,
    ...patch,
    updatedAt: new Date().toISOString()
  };

  if (TERMINAL_STATUSES.has(nextJob.status) && !nextJob.completedAt) {
    nextJob.completedAt = nextJob.updatedAt;
  }

  jobs.set(jobId, nextJob);
  return nextJob;
}

function createJobId() {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, 14);
  const suffix = Math.random().toString(36).slice(2, 8);

  return `job-${timestamp}-${suffix}`;
}

module.exports = {
  list,
  create,
  get,
  update
};
