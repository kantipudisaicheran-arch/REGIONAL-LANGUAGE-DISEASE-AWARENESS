const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Environment Variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/disease_awareness';

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const Disease = require('./models/Disease');
const Contact = require('./models/Contact');

// API Routes

// Get all diseases (basic structure or fully populated)
app.get('/api/diseases', async (req, res) => {
    try {
        const diseases = await Disease.find();
        res.json(diseases);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch diseases' });
    }
});

// Get a specific disease by its ID
app.get('/api/diseases/:id', async (req, res) => {
    try {
        const disease = await Disease.findOne({ id: req.params.id });
        if (!disease) return res.status(404).json({ message: 'Disease not found' });
        res.json(disease);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching disease details' });
    }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const contact = new Contact({ name, email, message });
        await contact.save();
        
        res.status(201).json({ message: 'Your message has been sent successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Fallback to index.html for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
