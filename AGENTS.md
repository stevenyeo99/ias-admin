# AGENTS.md

## Project Overview

This project is an insurance automation demo.

Goal:
- Login to IAS UAT
- Retrieve policy/member data
- Generate CSV for InsureNet

Architecture:
- Frontend: React + Vite
- Backend: Node.js + Express
- Browser automation: Playwright
- CSV generation on backend

## Rules

- Never hardcode credentials
- Use environment variables
- Use service layer architecture
- Keep Playwright logic isolated under /backend/src/automation
- Use async/await consistently
- Use TypeScript if possible
- Keep UI simple and enterprise-style

## Frontend Rules

- React functional components only
- Use hooks
- Avoid large components
- Use API service abstraction
- Console/dashboard appearance preferred

## Backend Rules

- Separate controller/service/util layers
- Return structured JSON responses
- Add logging for all automation steps

## Automation Rules

- Use Playwright
- Avoid fragile XPath selectors
- Add screenshot on failure
- Add retry for login
- Store logs per job execution

## CSV Rules

- CSV generation must be configurable
- Use UTF-8
- Keep mapping layer separate

## Future AI Scope

Future enhancement may include:
- LLM intent parsing
- OCR extraction
- intelligent field mapping
- AI-assisted workflow decisions