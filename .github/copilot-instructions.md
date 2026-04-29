<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a University Survey App - a Node.js web application that collects anonymous survey responses via a web form and saves them permanently to a MongoDB database. Responses can be exported as CSV files.

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Backend: Node.js with Express.js
- Database: MongoDB (Atlas)
- Dependencies: express, cors, mongoose

## Project Structure

```
.
├── server.js              # Express server with MongoDB integration
├── package.json           # Dependencies: express, cors, mongoose
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── public/
│   ├── index.html         # Survey form UI
│   ├── style.css          # Styling (gradient, responsive design)
│   └── app.js             # Client-side form submission logic
└── README.md              # Documentation
```

## Key Features

- Anonymous response collection (no user identification)
- MongoDB database for permanent data storage
- REST API endpoint POST /submit for form submissions
- CSV export functionality with GET /download
- Simple, responsive UI with success/error messaging
- Mobile-friendly design with gradient styling
- No data loss on server restart

## Development Guidelines

- Frontend changes: Edit files in `public/` directory
- Backend changes: Modify `server.js`
- Database: Configure `MONGODB_URI` in `.env`
- Dependencies: Use `npm install` to add packages
- Running the app: `npm start` starts server on port 3000

## Setup MongoDB

1. Create free account at MongoDB Atlas: https://www.mongodb.com/cloud/atlas
2. Create a cluster and get connection string
3. Copy `.env.example` to `.env` and add your MongoDB URI
4. Run `npm start`

## Important Notes

- Responses are anonymous and no personal data is collected
- Data is stored permanently in MongoDB
- CSV file is generated on-demand via /download endpoint
- The app listens on http://localhost:3000 by default
- All responses include ISO timestamp for tracking submission time
- Environment variables required: `MONGODB_URI`
