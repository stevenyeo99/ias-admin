# Live Preview And Playwright Automation Plan

## Scope

Implement backend-driven IAS login automation using Playwright and connect the console UI to realtime job logs.

This plan introduces real automation, but only through the backend. The frontend console must not store, display, or submit IAS credentials.

## Security Rules

- Never hardcode IAS credentials in source code.
- Store IAS URL, username, and password in `ias-api/.env`.
- Keep `ias-api/.env` ignored by Git.
- Only commit safe placeholders in `ias-api/.env.example`.
- Do not expose IAS credentials to `ias-console`.
- Avoid logging credentials, cookies, authorization headers, or full request payloads containing sensitive data.
- Consider rotating shared credentials because they were provided in chat.

Required backend environment variables:

```env
IAS_LOGIN_URL=https://tpa.staging.ins-link.com/auth/login.do?formAction=preLogin
IAS_USERNAME=
IAS_PASSWORD=
PLAYWRIGHT_HEADLESS=true
```

## Target Flow

1. User opens `ias-console`.
2. User clicks `Start Automation`.
3. Frontend calls `POST /jobs`.
4. Backend creates a job ID and starts automation in the background.
5. Frontend subscribes to realtime logs through SSE.
6. Backend emits structured job logs for each automation step.
7. Playwright opens IAS login page and attempts login.
8. Console updates:
   - Activity log in realtime.
   - Browser status.
   - Current step.
   - Job information.
   - Latest screenshot preview if available.

## Recommended Realtime Strategy

Use Server-Sent Events first.

SSE is appropriate because the console mainly needs one-way realtime updates from backend to frontend.

Endpoint:

```txt
GET /jobs/:jobId/logs/stream
```

Example event payload:

```json
{
  "timestamp": "2026-05-19T06:30:00.000Z",
  "level": "info",
  "step": "login",
  "message": "Opening IAS login page",
  "status": "running"
}
```

## Backend Structure

Add or update:

```txt
ias-api/
  automation/
    browserFactory.js
    iasLoginAutomation.js
  jobs/
    jobStore.js
    jobLogStore.js
  controllers/
    jobController.js
  services/
    jobService.js
  routes/
    jobs.js
  utils/
    logger.js
```

## Backend Responsibilities

`automation/browserFactory.js`

- Create and configure Playwright browser instances.
- Read `PLAYWRIGHT_HEADLESS` from environment variables.
- Keep browser setup separate from IAS-specific logic.

`automation/iasLoginAutomation.js`

- Open `IAS_LOGIN_URL`.
- Fill username and password from environment variables.
- Submit login form.
- Retry login if configured.
- Emit structured logs for every major step.
- Capture screenshot on failure.
- Return structured result.

`jobs/jobStore.js`

- Track job state in memory for the current demo phase.
- Store:
  - `id`
  - `status`
  - `createdAt`
  - `startedAt`
  - `completedAt`
  - `currentStep`
  - `browserStatus`
  - `latestScreenshot`
  - `error`

`jobs/jobLogStore.js`

- Store logs per job.
- Allow subscribers for SSE streams.
- Broadcast new log entries to connected clients.
- Remove subscribers when clients disconnect.

`services/jobService.js`

- Create job.
- Start automation asynchronously.
- Update job status and current step.
- Append logs.
- Keep controller thin.

`controllers/jobController.js`

- `createJob`
- `getJob`
- `listJobs`
- `streamJobLogs`

`routes/jobs.js`

- `GET /jobs`
- `POST /jobs`
- `GET /jobs/:jobId`
- `GET /jobs/:jobId/logs/stream`

## Frontend Structure

Add or update:

```txt
ias-console/
  src/services/api.js
  src/hooks/useJobLogStream.js
  src/hooks/useJobPolling.js
  src/components/JobForm.jsx
  src/components/JobLogs.jsx
  src/components/LiveWebPageViewer.jsx
  src/components/JobInformation.jsx
```

## Frontend Responsibilities

`services/api.js`

- Add `createJob()`.
- Add `getJob(jobId)`.
- Keep API base URL configurable through `VITE_API_BASE_URL`.

`hooks/useJobLogStream.js`

- Open `EventSource` to `/jobs/:jobId/logs/stream`.
- Append log events to local state.
- Handle connection open, error, and cleanup.

`hooks/useJobPolling.js`

- Poll `/jobs/:jobId` for job status and metadata.
- Keep polling interval modest, such as 1000-2000 ms.
- Stop polling when job reaches terminal status.

`JobForm.jsx`

- Enable `Start Automation`.
- Call `createJob()`.
- Pass the created job ID upward.
- Do not collect IAS credentials.

`JobLogs.jsx`

- Render realtime logs from SSE.
- Preserve current visual timeline style.
- Show static placeholder logs only when no real job has started.

`LiveWebPageViewer.jsx`

- Show:
  - browser status
  - current step
  - latest screenshot preview if available
  - placeholder canvas before automation starts
- Do not embed the IAS site in an iframe.

`JobInformation.jsx`

- Render job metadata from backend when a job exists.
- Fall back to mock display before automation starts.

## Playwright Login Strategy

Initial selector strategy:

- Prefer `getByLabel`, `getByRole`, `locator('[name="..."]')`, or stable `id` attributes.
- Avoid fragile XPath selectors.
- Inspect the real IAS login page before final selector selection.

Initial automation steps:

1. Emit `Opening browser`.
2. Launch browser.
3. Emit `Opening IAS login page`.
4. Navigate to `IAS_LOGIN_URL`.
5. Wait for login form.
6. Emit `Entering username`.
7. Fill username.
8. Emit `Entering password`.
9. Fill password.
10. Emit `Submitting login form`.
11. Click login button or submit form.
12. Wait for post-login page indicator.
13. Emit `Login successful` or `Login failed`.
14. Capture screenshot on failure.
15. Close browser unless later phases require keeping it open.

## Screenshot Preview

For this phase, use screenshots instead of true live browser streaming.

Recommended behavior:

- Save screenshots under a job-specific folder, for example:

```txt
ias-api/jobs/artifacts/{jobId}/
```

- Capture screenshot:
  - after page open
  - after login submit
  - on failure
- Expose latest screenshot via a backend static route or API endpoint.
- Frontend renders the latest screenshot inside `LiveWebPageViewer`.

## Implementation Phases

### Phase 1: Backend Job And Log Infrastructure

Status: Complete.

Goal: create the job lifecycle and realtime log channel.

Work:

- Add `jobLogStore.js`.
- Expand `jobStore.js` for job metadata.
- Add SSE endpoint.
- Add structured log broadcasting.
- Keep automation mocked in this phase if needed.

Acceptance:

- `POST /jobs` returns a job ID.
- `GET /jobs/:jobId` returns structured job state.
- `GET /jobs/:jobId/logs/stream` streams log events.
- No credentials are used yet.

### Phase 2: Playwright Login Automation

Status: Complete.

Goal: perform IAS login through backend Playwright.

Work:

- Add Playwright dependency.
- Add browser factory.
- Add IAS login automation module.
- Read credentials from environment variables.
- Add retry and screenshot-on-failure.
- Emit logs for each step.

Acceptance:

- Backend can start a login job.
- Logs stream during automation.
- Credentials are never hardcoded or returned to frontend.
- Failure produces a screenshot artifact.

### Phase 3: Console Integration

Status: Complete.

Goal: connect the existing console UI to backend jobs.

Work:

- Enable `Start Automation`.
- Add `useJobLogStream`.
- Update activity log from realtime SSE events.
- Poll job metadata.
- Update viewer status/current step.
- Render latest screenshot if available.

Acceptance:

- Clicking `Start Automation` creates a backend job.
- Logs appear in realtime.
- Job information updates without page refresh.
- Console remains usable before and after job execution.

### Phase 4: Live Preview Polish

Status: Complete.

Goal: improve the viewer without implementing complex browser streaming.

Work:

- Render latest screenshot preview in viewer.
- Add clear states for:
  - idle
  - connecting
  - running
  - success
  - failed
- Disable duplicate start while a job is running.
- Improve frontend error messages.

Acceptance:

- Viewer communicates automation progress clearly.
- Failed login shows a safe error and screenshot preview.
- `npm run build` succeeds for frontend.
- Backend starts without syntax/runtime errors.

### Phase 5: Near-Realtime Browser Preview

Status: Complete.

Goal: show browser automation progress visually using frequent screenshots.

Work:

- Add a controlled screenshot capture loop while Playwright automation is running.
- Reuse the existing job artifact folder.
- Emit preview frame updates through the existing SSE stream.
- Update the frontend SSE hook to receive preview events.
- Update the live viewer to prefer the latest streamed preview frame over slower polling state.
- Stop preview capture when the job completes or fails.

Acceptance:

- The console viewer image updates repeatedly during automation.
- Preview frames use existing backend static artifact paths.
- Realtime logs continue to work.
- No IAS credentials are exposed to the frontend.
- `npm run build` succeeds for frontend.
- Backend syntax checks pass.

## Explicit Non-Goals

- No IAS credentials in React.
- No authentication system for the demo console.
- No database persistence.
- No production job queue yet.
- No true browser video streaming yet.
- No policy/member extraction yet.
- No CSV generation yet.
- No InsureNet integration yet.

## Open Questions Before Implementation

- What are the stable selectors on the IAS login form?
- What page element confirms login success?
- Should the browser remain open after login for future policy search steps?
- Should screenshots be exposed as static files or through authenticated API endpoints later?
- What is the expected timeout for staging IAS login?

## Verification Checklist

- Backend reads IAS config from `.env`.
- `.env.example` contains placeholders only.
- `npm run build` passes in `ias-console`.
- Backend starts with `npm run dev`.
- `POST /jobs` starts a job.
- SSE logs arrive in the console in realtime.
- Automation failure captures screenshot.
- No credentials appear in logs, responses, or committed files.
