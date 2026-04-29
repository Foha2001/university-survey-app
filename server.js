const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const CSV_FILE = path.join(__dirname, 'responses.csv');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize CSV file with header if it doesn't exist
if (!fs.existsSync(CSV_FILE)) {
  fs.writeFileSync(CSV_FILE, 'timestamp,response\n');
}

// Route to handle survey submission
app.post('/submit', (req, res) => {
  const { response } = req.body;

  if (!response || response.trim() === '') {
    return res.status(400).json({ error: 'Response cannot be empty' });
  }

  const timestamp = new Date().toISOString();
  // Escape double quotes in response and wrap in quotes for CSV
  const escapedResponse = `"${response.replace(/"/g, '""')}"`;
  const csvLine = `${timestamp},${escapedResponse}\n`;

  // Append to CSV file
  fs.appendFileSync(CSV_FILE, csvLine);

  res.json({ success: true, message: 'Response saved successfully' });
});

// Route to get response count
app.get('/count', (req, res) => {
  try {
    const data = fs.readFileSync(CSV_FILE, 'utf-8');
    const lines = data.trim().split('\n');
    const count = Math.max(0, lines.length - 1); // Subtract 1 for header
    res.json({ count });
  } catch (err) {
    res.json({ count: 0 });
  }
});

// Route to download CSV file
app.get('/download', (req, res) => {
  try {
    if (!fs.existsSync(CSV_FILE)) {
      return res.status(404).json({ error: 'No responses yet' });
    }
    res.download(CSV_FILE, 'responses.csv');
  } catch (err) {
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Responses will be saved to ${CSV_FILE}`);
  console.log(`Download responses at http://localhost:${PORT}/download`);
});
