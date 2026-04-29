const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/survey-app';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Schema
const responseSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  response: { type: String, required: true }
});

const Response = mongoose.model('Response', responseSchema);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  console.log('⚠️  Running without database. Set MONGODB_URI to enable persistence.');
});

// Route to handle survey submission
app.post('/submit', async (req, res) => {
  try {
    const { response } = req.body;

    if (!response || response.trim() === '') {
      return res.status(400).json({ error: 'Response cannot be empty' });
    }

    const newResponse = new Response({
      response: response.trim()
    });

    await newResponse.save();
    res.json({ success: true, message: 'Response saved successfully' });
  } catch (err) {
    console.error('Error saving response:', err);
    res.status(500).json({ error: 'Failed to save response' });
  }
});

// Route to get response count
app.get('/count', async (req, res) => {
  try {
    const count = await Response.countDocuments();
    res.json({ count });
  } catch (err) {
    res.json({ count: 0 });
  }
});

// Route to download CSV file
app.get('/download', async (req, res) => {
  try {
    const responses = await Response.find({}).sort({ timestamp: 1 });

    if (responses.length === 0) {
      return res.status(404).json({ error: 'No responses yet' });
    }

    // Generate CSV
    let csv = 'timestamp,response\n';
    responses.forEach((doc) => {
      const timestamp = doc.timestamp.toISOString();
      const escapedResponse = `"${doc.response.replace(/"/g, '""')}"`;
      csv += `${timestamp},${escapedResponse}\n`;
    });

    // Send as download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=responses.csv');
    res.send(csv);
  } catch (err) {
    console.error('Error downloading responses:', err);
    res.status(500).json({ error: 'Failed to download responses' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Database: ${mongoose.connection.readyState === 1 ? 'MongoDB' : 'Not connected'}`);
  console.log(`Download responses at http://localhost:${PORT}/download`);
});
