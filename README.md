# University Survey App

A simple web application to collect anonymous survey responses and save them to a CSV file.

## Features

- Anonymous response collection
- Simple, user-friendly web interface
- Responses automatically saved to CSV file with timestamp
- Response counter
- Mobile-responsive design

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js with Express.js
- **Data Storage**: CSV file

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the App

Start the server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

### Usage

1. Open your browser to `http://localhost:3000`
2. Fill in the survey response in the text area
3. Click "Submit Response"
4. Your response will be saved to `responses.csv` with a timestamp

### CSV Format

Responses are stored in `responses.csv` with the following format:

```
timestamp,response
2024-04-29T10:30:45.123Z,"User response here"
```

### Project Structure

```
.
├── server.js           # Express server and API routes
├── package.json        # Project dependencies and scripts
├── public/
│   ├── index.html      # Main survey form
│   ├── style.css       # Styling
│   └── app.js          # Frontend logic
└── responses.csv       # Survey responses (created on first submission)
```

## API Endpoints

### POST /submit
Submit a survey response

**Request:**
```json
{
  "response": "Your response text here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Response saved successfully"
}
```

### GET /count
Get the number of responses received

**Response:**
```json
{
  "count": 42
}
```

## Data Privacy

- All responses are anonymous
- No user identification is collected
- Responses are stored locally in CSV format

## Notes

- Responses are appended to the CSV file; previous data is never overwritten
- The CSV file is created automatically on the first submission
- Double quotes in responses are properly escaped in the CSV

## License

MIT
