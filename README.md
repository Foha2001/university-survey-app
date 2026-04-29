# University Survey App

A web application to collect anonymous survey responses with persistent database storage.

## Features

- Anonymous response collection
- MongoDB database for permanent data storage
- Simple, user-friendly web interface
- CSV export functionality
- Mobile-responsive design

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (Atlas)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account (free tier available)

### Setup MongoDB

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier)
3. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/survey-app?retryWrites=true&w=majority`
4. Create a `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/survey-app?retryWrites=true&w=majority
PORT=3000
```
5. Replace `username` and `password` with your MongoDB Atlas credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Foha2001/university-survey-app.git
cd university-survey-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Usage

1. Open your browser to `http://localhost:3000`
2. Fill in the survey response in the text area
3. Click "Submit Response"
4. Your response will be saved to MongoDB
5. Click "Download Responses (CSV)" to export all responses

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

### GET /download
Download all responses as CSV file

### GET /health
Health check endpoint

## Deployment

### On Render.com

1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Connect your GitHub repository
4. Set environment variable: `MONGODB_URI` with your MongoDB Atlas connection string
5. Deploy

### On Heroku

1. Set environment variable:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
```

2. Deploy:
```bash
git push heroku main
```

## Data Privacy

- All responses are anonymous
- No user identification is collected
- Data is stored securely in MongoDB
- Responses can be downloaded as CSV at any time

## Notes

- Responses are stored permanently in MongoDB
- No data loss on server restart
- Free tier supports up to 512 MB storage

## License

MIT

