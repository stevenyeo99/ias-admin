const fs = require('fs/promises');
const path = require('path');

const { createBrowser } = require('./browserFactory');

const DEFAULT_TIMEOUT = 15000;
const ARTIFACTS_ROOT = path.join(__dirname, '..', 'jobs', 'artifacts');

async function runIasLoginAutomation({ jobId, emitLog, updateJob }) {
  validateConfig();

  const maxRetries = Number.parseInt(process.env.IAS_LOGIN_MAX_RETRIES || '2', 10);
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      return await runLoginAttempt({
        jobId,
        attempt,
        emitLog,
        updateJob
      });
    } catch (error) {
      lastError = error;
      emitLog({
        level: 'error',
        step: 'login',
        message: `Login attempt ${attempt} failed`,
        status: 'running',
        meta: {
          reason: error.message
        }
      });

      if (attempt >= maxRetries) {
        throw lastError;
      }

      updateJob({
        currentStep: `Retrying login (${attempt + 1}/${maxRetries})`,
        browserStatus: 'reconnecting'
      });
    }
  }

  throw lastError;
}

async function runLoginAttempt({ jobId, attempt, emitLog, updateJob }) {
  let browser;
  let page;

  try {
    updateJob({
      status: 'running',
      startedAt: new Date().toISOString(),
      currentStep: 'Opening browser',
      browserStatus: 'connecting'
    });
    emitLog({
      level: 'info',
      step: 'browser',
      message: `Opening browser (attempt ${attempt})`,
      status: 'running'
    });

    browser = await createBrowser();
    const context = await browser.newContext({
      viewport: { width: 1366, height: 768 }
    });
    page = await context.newPage();

    updateJob({
      currentStep: 'Opening IAS login page',
      browserStatus: 'connected'
    });
    emitLog({
      level: 'info',
      step: 'navigation',
      message: 'Opening IAS login page',
      status: 'running'
    });

    await page.goto(process.env.IAS_LOGIN_URL, {
      waitUntil: 'domcontentloaded',
      timeout: DEFAULT_TIMEOUT
    });
    await page.waitForLoadState('networkidle', { timeout: DEFAULT_TIMEOUT }).catch(() => {});
    await captureScreenshot({ page, jobId, name: `attempt-${attempt}-login-page`, updateJob });

    updateJob({ currentStep: 'Entering username' });
    emitLog({
      level: 'info',
      step: 'login',
      message: 'Entering username',
      status: 'running'
    });
    await fillFirstAvailable(page, usernameSelectors(), process.env.IAS_USERNAME);

    updateJob({ currentStep: 'Entering password' });
    emitLog({
      level: 'info',
      step: 'login',
      message: 'Entering password',
      status: 'running'
    });
    await fillFirstAvailable(page, passwordSelectors(), process.env.IAS_PASSWORD);

    updateJob({ currentStep: 'Submitting login form' });
    emitLog({
      level: 'info',
      step: 'login',
      message: 'Submitting login form',
      status: 'running'
    });
    await submitLogin(page);

    await page.waitForLoadState('networkidle', { timeout: DEFAULT_TIMEOUT }).catch(() => {});
    await page.waitForTimeout(1500);
    await captureScreenshot({ page, jobId, name: `attempt-${attempt}-after-submit`, updateJob });

    const success = await isLoginSuccessful(page);

    if (!success) {
      throw new Error('Login success indicator was not detected');
    }

    updateJob({
      status: 'completed',
      currentStep: 'Login successful',
      browserStatus: 'idle'
    });
    emitLog({
      level: 'info',
      step: 'complete',
      message: 'IAS login completed successfully',
      status: 'completed'
    });

    return {
      success: true
    };
  } catch (error) {
    if (page) {
      await captureScreenshot({ page, jobId, name: `attempt-${attempt}-failure`, updateJob }).catch(() => {});
    }

    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

function validateConfig() {
  const missingKeys = ['IAS_LOGIN_URL', 'IAS_USERNAME', 'IAS_PASSWORD'].filter((key) => {
    return !process.env[key];
  });

  if (missingKeys.length > 0) {
    throw new Error(`Missing IAS automation configuration: ${missingKeys.join(', ')}`);
  }
}

function usernameSelectors() {
  return [
    'input[name="username"]',
    'input[name="userName"]',
    'input[name="j_username"]',
    'input[id*="user" i]',
    'input[name*="user" i]',
    'input[type="text"]'
  ];
}

function passwordSelectors() {
  return [
    'input[name="password"]',
    'input[name="j_password"]',
    'input[id*="password" i]',
    'input[name*="password" i]',
    'input[type="password"]'
  ];
}

async function fillFirstAvailable(page, selectors, value) {
  for (const selector of selectors) {
    const locator = page.locator(selector).first();

    if (await locator.count()) {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      await locator.fill(value);
      return selector;
    }
  }

  throw new Error(`Unable to locate field for selectors: ${selectors.join(', ')}`);
}

async function submitLogin(page) {
  const submitCandidates = [
    page.getByRole('button', { name: /login|log in|sign in|submit/i }),
    page.locator('button[type="submit"]').first(),
    page.locator('input[type="submit"]').first()
  ];

  for (const locator of submitCandidates) {
    if (await locator.count()) {
      await Promise.all([
        page.waitForLoadState('domcontentloaded', { timeout: DEFAULT_TIMEOUT }).catch(() => {}),
        locator.click()
      ]);
      return;
    }
  }

  await page.keyboard.press('Enter');
}

async function isLoginSuccessful(page) {
  const currentUrl = page.url();
  const loginUrl = process.env.IAS_LOGIN_URL;

  if (currentUrl && loginUrl && currentUrl !== loginUrl && !currentUrl.includes('/auth/login')) {
    return true;
  }

  const passwordFields = await page.locator('input[type="password"]').count();
  return passwordFields === 0;
}

async function captureScreenshot({ page, jobId, name, updateJob }) {
  const jobArtifactsDir = path.join(ARTIFACTS_ROOT, jobId);
  await fs.mkdir(jobArtifactsDir, { recursive: true });

  const fileName = `${name}.png`;
  const absolutePath = path.join(jobArtifactsDir, fileName);
  const publicPath = `/jobs/artifacts/${jobId}/${fileName}`;

  await page.screenshot({
    path: absolutePath,
    fullPage: true
  });

  updateJob({
    latestScreenshot: publicPath
  });

  return publicPath;
}

module.exports = {
  runIasLoginAutomation
};
