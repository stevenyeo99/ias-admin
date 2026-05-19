# Playwright Automation Skill

Use this skill whenever modifying browser automation.

Rules:
- Use Playwright only
- Prefer locator() over XPath
- Add waitForLoadState()
- Add screenshot on failure
- Store logs for each action
- Avoid fixed sleep()
- Use reusable helper methods

Folder Structure:
- automation/
  - login.ts
  - searchPolicy.ts
  - extractMember.ts

All automation must return structured JSON.