const jobStore = require('../jobs/jobStore');
const jobLogStore = require('../jobs/jobLogStore');
const logger = require('../utils/logger');

async function listJobs() {
  logger.info('Listing jobs');
  return jobStore.list();
}

async function createJob(payload) {
  const job = jobStore.create(payload || {});

  logger.info('Created automation job', { jobId: job.id });
  appendJobLog(job.id, {
    level: 'info',
    step: 'queued',
    message: 'Job queued',
    status: 'queued'
  });

  runPhaseOneDemoJob(job.id);

  return job;
}

async function getJob(jobId) {
  logger.info(`Retrieving job ${jobId}`);
  return jobStore.get(jobId);
}

async function listJobLogs(jobId) {
  return jobLogStore.list(jobId);
}

function subscribeToJobLogs(jobId, listener) {
  return jobLogStore.subscribe(jobId, listener);
}

function appendJobLog(jobId, log) {
  const entry = jobLogStore.append(jobId, log);

  logger.info(entry.message, {
    jobId,
    step: entry.step,
    status: entry.status
  });

  return entry;
}

function updateJob(jobId, patch) {
  return jobStore.update(jobId, patch);
}

function runPhaseOneDemoJob(jobId) {
  const steps = [
    {
      delay: 500,
      patch: {
        status: 'running',
        startedAt: new Date().toISOString(),
        currentStep: 'Opening browser',
        browserStatus: 'connecting'
      },
      log: {
        level: 'info',
        step: 'browser',
        message: 'Opening browser',
        status: 'running'
      }
    },
    {
      delay: 1200,
      patch: {
        currentStep: 'Preparing IAS login',
        browserStatus: 'connected'
      },
      log: {
        level: 'info',
        step: 'login',
        message: 'Preparing IAS login',
        status: 'running'
      }
    },
    {
      delay: 1900,
      patch: {
        currentStep: 'Waiting for Playwright phase',
        browserStatus: 'connected'
      },
      log: {
        level: 'info',
        step: 'automation',
        message: 'Phase 1 realtime log stream is active',
        status: 'running'
      }
    },
    {
      delay: 2700,
      patch: {
        status: 'completed',
        currentStep: 'Phase 1 complete',
        browserStatus: 'idle'
      },
      log: {
        level: 'info',
        step: 'complete',
        message: 'Phase 1 demo job completed',
        status: 'completed'
      }
    }
  ];

  steps.forEach((step) => {
    setTimeout(() => {
      const job = updateJob(jobId, step.patch);

      if (!job) {
        return;
      }

      appendJobLog(jobId, step.log);
    }, step.delay);
  });
}

module.exports = {
  listJobs,
  createJob,
  getJob,
  listJobLogs,
  subscribeToJobLogs
};
