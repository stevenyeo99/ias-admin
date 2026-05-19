const jobStore = require('../jobs/jobStore');
const logger = require('../utils/logger');

async function listJobs() {
  logger.info('Listing jobs');
  return jobStore.list();
}

async function createJob(payload) {
  logger.info('Creating placeholder job');
  return jobStore.create({
    status: 'pending',
    input: payload || {}
  });
}

async function getJob(jobId) {
  logger.info(`Retrieving job ${jobId}`);
  return jobStore.get(jobId);
}

module.exports = {
  listJobs,
  createJob,
  getJob
};
