# REQUIREMENTS

## Current Scope

Implement frontend UI prototype only.

## Dashboard Layout

The dashboard should contain:
- left operation/control panel
- right live web page viewer panel

## Left Panel

### Job Details Section

Fields:
- Policy Number
- Member Number
- Date of Birth
- Agent Code

Buttons:
- Start Automation
- Reset

### Activity Log Section

Display mock automation logs:
- Job created
- Browser launched
- Searching policy
- Extracting data
- Generating CSV

### Extracted Data Preview

Display mock extracted data:
- Policy Number
- Member Name
- Identity No
- DOB
- Plan Name
- Status
- Agent Code

### Action Buttons

- Generate CSV
- Download CSV

## Right Panel

### Viewer Header

Display:
- Browser status
- Current step
- Auto refresh toggle
- Zoom dropdown
- Action buttons

### Main Viewer Area

Display placeholder viewer panel only.

Do NOT implement:
- real IAS login
- real iframe integration
- Playwright browser control

Placeholder message:
"Live Internal Web System Viewer"

## Bottom Job Information

Display:
- Job ID
- Status
- Created At
- Duration
- Browser