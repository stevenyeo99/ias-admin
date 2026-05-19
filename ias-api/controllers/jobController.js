const jobService = require('../services/jobService');
const createError = require('http-errors');

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

    if (!job) {
      throw createError(404, 'Job not found');
    }

    res.json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
}

async function listJobLogs(req, res, next) {
  try {
    const job = await jobService.getJob(req.params.jobId);

    if (!job) {
      throw createError(404, 'Job not found');
    }

    const logs = await jobService.listJobLogs(req.params.jobId);
    res.json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
}

async function streamJobLogs(req, res, next) {
  try {
    const job = await jobService.getJob(req.params.jobId);

    if (!job) {
      throw createError(404, 'Job not found');
    }

    res.set({
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
      'X-Accel-Buffering': 'no'
    });
    res.flushHeaders();

    const sendEvent = (event, data) => {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    sendEvent('job', job);

    const existingLogs = await jobService.listJobLogs(req.params.jobId);
    existingLogs.forEach((log) => {
      sendEvent('log', log);
    });

    const unsubscribe = jobService.subscribeToJobLogs(req.params.jobId, (log) => {
      sendEvent('log', log);
    });

    const heartbeat = setInterval(() => {
      res.write(': heartbeat\n\n');
    }, 30000);

    req.on('close', () => {
      clearInterval(heartbeat);
      unsubscribe();
      res.end();
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listJobs,
  createJob,
  getJob,
  listJobLogs,
  streamJobLogs
};
