<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a University Survey App - a Node.js web application that collects anonymous survey responses via a web form and saves them to a CSV file.

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Backend: Node.js with Express.js
- Data Storage: CSV file (responses.csv)
- Dependencies: express, cors

## Project Structure

```
.
├── server.js              # Express server with /submit and /count routes
├── package.json           # Dependencies: express, cors
├── public/
│   ├── index.html         # Survey form UI
│   ├── style.css          # Styling (gradient, responsive design)
│   └── app.js             # Client-side form submission logic
├── responses.csv          # Survey responses dataset (auto-created)
└── README.md              # Documentation
```

## Key Features

- Anonymous response collection (no user identification)
- REST API endpoint POST /submit for form submissions
- Responses saved to CSV with timestamp and proper escaping
- Simple, responsive UI with success/error messaging
- Mobile-friendly design with gradient styling

## Development Guidelines

- Frontend changes: Edit files in `public/` directory
- Backend changes: Modify `server.js`
- Dependencies: Use `npm install` to add packages
- Running the app: `npm start` starts server on port 3000

## Important Notes

- Responses are anonymous and no personal data is collected
- CSV file is created automatically on first submission
- The app listens on http://localhost:3000 by default
- All responses include ISO timestamp for tracking submission time
