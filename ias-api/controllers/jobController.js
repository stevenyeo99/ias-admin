const jobService = require('../services/jobService');

async function listJobs(req, res, next) {
  try {
    const jobs = await jobService.listJobs();
    res.json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
}

async function createJob(req, res, next) {
  try {
    const job = await jobService.createJob(req.body);
    res.status(202).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
}

async function getJob(req, res, next) {
  try {
    const job = await jobService.getJob(req.params.jobId);
    res.json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listJobs,
  createJob,
  getJob
};
