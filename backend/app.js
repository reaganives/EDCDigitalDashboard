require('dotenv').config();  // For loading environment variables
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the API!');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Enable CORS with default settings (allows all origins)
app.use(cors({
    origin: '*',  // Allow all origins (for testing only)
    credentials: true,
}));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware for parsing JSON
app.use(express.json());

// Models
require('./models/Rating');
require('./models/User');

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;  // Adjust with your URI
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api', apiRoutes);

// Start the server
const PORT = 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Running in ${process.env.NODE_ENV} mode`);
    console.log('updated cors');
});
