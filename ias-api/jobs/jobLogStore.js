const logsByJob = new Map();
const subscribersByJob = new Map();

function list(jobId) {
  return logsByJob.get(jobId) || [];
}

function append(jobId, log) {
  const entry = {
    id: createLogId(),
    timestamp: new Date().toISOString(),
    level: 'info',
    ...log
  };

  const logs = logsByJob.get(jobId) || [];
  logs.push(entry);
  logsByJob.set(jobId, logs);
  publish(jobId, entry);

  return entry;
}

function subscribe(jobId, listener) {
  const subscribers = subscribersByJob.get(jobId) || new Set();
  subscribers.add(listener);
  subscribersByJob.set(jobId, subscribers);

  return () => {
    subscribers.delete(listener);

    if (subscribers.size === 0) {
      subscribersByJob.delete(jobId);
    }
  };
}

function publish(jobId, entry) {
  const subscribers = subscribersByJob.get(jobId);

  if (!subscribers) {
    return;
  }

  subscribers.forEach((listener) => {
    listener(entry);
  });
}

function createLogId() {
  return `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

module.exports = {
  list,
  append,
  subscribe
};
