function info(message, meta) {
  console.log(formatMessage('info', message, meta));
}

function error(message, meta) {
  console.error(formatMessage('error', message, meta));
}

function formatMessage(level, message, meta) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message
  };

  if (meta) {
    entry.meta = meta;
  }

  return JSON.stringify(entry);
}

module.exports = {
  info,
  error
};
