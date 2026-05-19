const jobs = [];

function list() {
  return jobs;
}

function create(job) {
  const nextJob = {
    id: `job-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...job
  };

  jobs.push(nextJob);
  return nextJob;
}

function get(jobId) {
  return jobs.find((job) => job.id === jobId) || null;
}

module.exports = {
  list,
  create,
  get
};
