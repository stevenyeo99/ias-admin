# AGENTS.md

## Project Overview

This project is an internal insurance automation prototype.

Goal:
- Provide a UI console for automation workflows
- Display live internal web system viewer
- Show automation logs and extracted data
- Generate CSV for downstream systems

Current phase:
Frontend UI prototype only.

## Tech Stack

Frontend:
- React + Vite
- JavaScript only

Backend:
- Node.js + Express
- Express generator style
- /bin/www startup structure

## Implementation Rules

- Use modular component structure
- Keep components reusable
- Keep layout clean and enterprise-style
- Prefer simple architecture over overengineering
- Use mock/static data for current phase
- Keep code readable and maintainable

## Frontend Rules

- Use React functional components only
- Use component-based architecture
- Keep CSS clean and organized
- Avoid large monolithic components
- Use modern dashboard layout
- White background with blue/green accents

## Backend Rules

- Use modular feature-based structure
- Use modules/<feature>/ pattern
- Use Express generator architecture
- Keep routes/controllers/services separated

## Automation Rules

- Real browser automation is NOT implemented yet
- Do not add Playwright login yet
- Live web viewer is placeholder only

## CSV Rules

- CSV generation is placeholder only for now
- Final CSV structure pending confirmation

## Security Rules

- Never hardcode credentials
- Never expose internal URLs in frontend
- Use environment variables later

## Do Not Implement Yet

- Do not implement real IAS login
- Do not implement Playwright automation
- Do not implement backend API integration
- Do not implement authentication
- Do not implement database persistence
- Do not implement real CSV generation logic

## Preferred Work Style

- Build UI mockup first
- Use clean enterprise dashboard styling
- Prioritize visual clarity for demo purposes
- Keep implementation simple and modular