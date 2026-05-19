const jobStore = require('../jobs/jobStore');
const jobLogStore = require('../jobs/jobLogStore');
const { runIasLoginAutomation } = require('../automation');
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

  startIasLoginJob(job.id);

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

  if (entry.type !== 'preview') {
    logger.info(entry.message, {
      jobId,
      step: entry.step,
      status: entry.status
    });
  }

  return entry;
}

function updateJob(jobId, patch) {
  return jobStore.update(jobId, patch);
}

function startIasLoginJob(jobId) {
  setImmediate(async () => {
    try {
      await runIasLoginAutomation({
        jobId,
        emitLog: (log) => appendJobLog(jobId, log),
        updateJob: (patch) => updateJob(jobId, patch)
      });
    } catch (error) {
      updateJob(jobId, {
        status: 'failed',
        currentStep: 'Login failed',
        browserStatus: 'idle',
        error: {
          message: error.message
        }
      });
      appendJobLog(jobId, {
        level: 'error',
        step: 'failed',
        message: 'IAS login automation failed',
        status: 'failed',
        meta: {
          reason: error.message
        }
      });
    }
  });
}

module.exports = {
  listJobs,
  createJob,
  getJob,
  listJobLogs,
  subscribeToJobLogs
};
