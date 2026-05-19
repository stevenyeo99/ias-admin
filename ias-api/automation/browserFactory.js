const { chromium } = require('playwright');

function parseHeadless(value) {
  if (typeof value === 'undefined') {
    return true;
  }

  return value !== 'false';
}

async function createBrowser() {
  return chromium.launch({
    headless: parseHeadless(process.env.PLAYWRIGHT_HEADLESS),
    args: ['--no-sandbox']
  });
}

module.exports = {
  createBrowser
};
