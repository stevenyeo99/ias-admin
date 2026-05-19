# IAS Console UI Implementation Plan

## Scope

Implement a frontend-only console preview based on `docs/UI-Mockup/UI-V1.png`.

This phase is display-only. No login flow, IAS automation, Playwright browser control, backend job execution, real API calls, CSV generation, or credential handling should be implemented.

## Target Screen

The console should render a single dashboard matching the mockup structure:

- Top application header with IAS branding, title, subtitle, system status, notification icon, and user avatar.
- Left operational column with job input details, activity log, and extracted data preview.
- Main content area with a live web page viewer placeholder.
- Bottom job information summary cards.

## Files To Change

Primary files:

- `ias-console/src/pages/DashboardPage.jsx`
- `ias-console/src/components/JobForm.jsx`
- `ias-console/src/components/JobLogs.jsx`
- `ias-console/src/components/ExtractedDataPreview.jsx`
- `ias-console/src/components/CsvDownload.jsx`
- `ias-console/src/index.css`

New console-only components to consider:

- `ias-console/src/components/AppHeader.jsx`
- `ias-console/src/components/LiveWebPageViewer.jsx`
- `ias-console/src/components/JobInformation.jsx`
- `ias-console/src/components/StatusPill.jsx`

Existing shadcn-style primitives should be reused:

- `ias-console/src/components/ui/button.jsx`
- `ias-console/src/components/ui/card.jsx`
- `ias-console/src/components/ui/badge.jsx`
- `ias-console/src/components/ui/input.jsx`
- `ias-console/src/components/ui/label.jsx`

Additional shadcn-style primitives may be added only if needed for the mockup:

- `separator`
- `select`
- `switch`
- `table`

## Layout Plan

Use a full-height application shell:

- Header height around `76px`.
- Body uses a two-column grid.
- Left column width around `360px`.
- Main column fills remaining space.
- Content spacing should be compact and enterprise-style.
- Cards should use small radius, subtle borders, white background, and minimal shadow.

Desktop-first layout:

- `grid-cols-[360px_1fr]`
- Left rail stacks three cards.
- Right area stacks live viewer and job information.

Responsive behavior:

- Below large desktop width, collapse to one column.
- Keep viewer placeholder height usable on smaller screens.
- Avoid overlapping controls in the viewer toolbar.

## Visual Details From Mockup

Header:

- IAS hexagon-like brand mark at left.
- Title: `IAS Automation Console`.
- Subtitle: `AI-Powered IAS Operation System`.
- Status control on right: `System Status: Ready` with green dot.
- Notification icon with red count badge.
- Circular blue avatar with initials `AD`.
- Chevron icon for account menu placeholder.

Job Details card:

- Section title with small blue icon.
- Inputs:
  - `Policy Number *`
  - `Member Number (Optional)`
  - `Date of Birth (Optional)`
  - `Agent Code (Optional)`
- Primary button: `Start Automation`.
- Secondary button: `Reset`.
- Inputs and buttons are disabled or non-functional placeholders in this phase.

Activity Log card:

- Title: `Activity Log`.
- `Clear` action as a disabled or inert text button.
- Static timeline rows:
  - `09:41:12` Job created successfully
  - `09:41:14` Opening browser
  - `09:41:15` Navigating to IAS system
  - `09:41:18` Entering credentials
  - `09:41:22` Searching for policy: `AI00012345`
  - `09:41:25` Fetching policy details
  - `09:41:28` Extracting member information
  - `09:41:30` Generating CSV
  - `09:41:31` Job in progress...
- Completed rows use green check icons.
- Current row uses blue activity/spinner-style icon.
- Pending rows use muted gray dots.

Extracted Data card:

- Title: `Extracted Data (Preview)`.
- Static two-column table:
  - Policy Number: `AI00012345`
  - Member Name: `-`
  - Identity No.: `-`
  - Date of Birth: `-`
  - Plan Name: `-`
  - Status: `-`
  - Agent Code: `-`
- Bottom actions:
  - `Generate CSV`
  - `Download CSV`
- Buttons are placeholders only.

Live Web Page Viewer:

- Card title: `Live Web Page Viewer`.
- Toolbar:
  - Browser Status: `Connected`
  - Current Step: `Searching Policy`
  - Auto Refresh switch, visually on
  - Zoom select showing `100%`
  - Refresh icon button
  - Screenshot icon button
  - Fullscreen icon button
- Large viewer canvas with centered browser/globe illustration.
- Text:
  - `Live Internal Web System Viewer`
  - `Live web page / browser view will appear here during automation execution.`
  - `This area will display the real-time view of the internal IAS system once connected.`
- No iframe, no browser stream, no Playwright integration.

Job Information:

- Title: `Job Information`.
- Five metric cards:
  - Job ID: `JOB-20240522-094112`
  - Status: `In Progress`
  - Created At: `22 May 2024 09:41:12`
  - Duration: `00:00:14`
  - Browser: `Chromium`
- Use Lucide icons in circular icon wells.

## Component Plan

`DashboardPage.jsx`

- Compose the full page shell.
- Own static mock data arrays for activity log, extracted data, and job information.
- Pass static data into child components.

`AppHeader.jsx`

- Render branding, status, notification, and avatar.
- Keep all actions inert.

`JobForm.jsx`

- Render the job details form only.
- Use shadcn-style `Input`, `Label`, and `Button`.
- Do not submit or validate yet.

`JobLogs.jsx`

- Render the static activity timeline.
- Use status-specific icon styling.
- Do not poll or fetch logs.

`ExtractedDataPreview.jsx`

- Render static table and CSV placeholder buttons.
- Keep CSV actions inert.

`LiveWebPageViewer.jsx`

- Render viewer card, toolbar, and placeholder canvas.
- Use static status and controls.

`JobInformation.jsx`

- Render the five summary metric cards.

## Styling Plan

Use Tailwind utility classes and current shadcn-style primitives.

Design constraints:

- Enterprise dashboard appearance.
- White cards over light gray background.
- Blue as primary action/accent.
- Green only for ready/connected/success states.
- Red only for notification badge or future errors.
- Small border radius, restrained shadow, clear spacing.
- No marketing hero, no decorative gradients, no business logic text.

Potential CSS additions in `src/index.css`:

- App-wide font smoothing.
- Stable input/button dimensions.
- Optional table border helper classes if Tailwind markup becomes noisy.

## Implementation Steps

1. Add missing UI primitives only if needed.
2. Add `AppHeader`, `LiveWebPageViewer`, `JobInformation`, and optional `StatusPill`.
3. Refactor existing placeholder components to match the mockup sections.
4. Update `DashboardPage.jsx` to use the final two-column console layout.
5. Keep all data static and local to the frontend.
6. Run `npm run build` in `ias-console`.
7. Start the Vite dev server only if local port binding is available.

## UI Implementation Phases

The console UI should be implemented in 4 frontend-only phases.

### Phase 1: Shell And Design Foundation

Goal: establish the visual foundation and reusable pieces needed by the mockup.

Work:

- Confirm Tailwind and shadcn-style setup is working in `ias-console`.
- Add any missing basic UI primitives required by the mockup.
- Tune `src/index.css` for the console background, font rendering, and base colors.
- Add shared helpers/components such as `StatusPill` if they reduce duplicated markup.
- Keep all changes frontend-only.

Acceptance:

- App still renders through `DashboardPage`.
- `npm run build` succeeds.
- No backend or automation code is touched.

### Phase 2: Header And Page Layout

Goal: match the overall page structure of `UI-V1.png`.

Work:

- Add `AppHeader.jsx`.
- Implement IAS logo mark, title, subtitle, system status, notification icon, avatar, and menu chevron.
- Refactor `DashboardPage.jsx` into the target two-column console layout.
- Define responsive collapse behavior for narrower screens.

Acceptance:

- The screen visually reads as the IAS Automation Console.
- Header and main layout align with the mockup.
- Layout does not require real login or user data.

### Phase 3: Left Console Rail

Goal: implement the left-side operational panels from the mockup.

Work:

- Refactor `JobForm.jsx` into the `Job Details` card.
- Refactor `JobLogs.jsx` into the static `Activity Log` timeline.
- Refactor `ExtractedDataPreview.jsx` into the preview table and CSV placeholder actions.
- Keep form fields, clear action, and CSV buttons inert.

Acceptance:

- Left rail contains the three mockup panels.
- Static mock values match the plan.
- No API calls, polling, validation, CSV logic, or job creation is added.

### Phase 4: Viewer And Job Summary

Goal: implement the main viewer area and job information section.

Work:

- Add `LiveWebPageViewer.jsx`.
- Render the static viewer toolbar and large placeholder canvas.
- Add `JobInformation.jsx`.
- Render five static job summary cards.
- Polish spacing, card heights, icon wells, and responsive behavior.

Acceptance:

- Main content area matches the mockup structure.
- Viewer is a static placeholder only.
- `npm run build` succeeds.

## Phase Boundary Rules

- All phases are UI-only.
- Data remains static and local to React components.
- No route, backend, Playwright, authentication, persistence, or CSV behavior is introduced.
- Controls may look enabled if the mockup shows them that way, but they must remain non-functional placeholders.
- Any future behavior work must be planned separately after this console preview is accepted.

## Explicit Non-Goals

- No IAS login screen.
- No authentication.
- No backend integration.
- No Playwright implementation.
- No live browser rendering.
- No real job creation.
- No polling.
- No CSV generation or download.
- No credential fields beyond inert visual placeholders.
- No database or persistence.

## Acceptance Criteria

- `ias-console` displays a console preview visually aligned with `docs/UI-Mockup/UI-V1.png`.
- The page renders without needing backend services.
- All controls are visible but inert.
- The dashboard remains usable on desktop and collapses cleanly on narrower screens.
- `npm run build` succeeds.
- No TypeScript files are introduced.
- No real IAS automation logic is added.
