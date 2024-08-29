require('dotenv').config();  // For loading environment variables
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const app = express();

// Enable CORS with default settings (allows all origins)
app.use(cors({
    origin: ['http://localhost:5173', 'http://ec2-54-241-59-25.us-west-1.compute.amazonaws.com'],  // Add all allowed origins
    credentials: true,
}));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware for parsing JSON
app.use(express.json());

// Models
require('./models/Rating');

// MongoDB Connection
const mongoURI = process.env.MONGO_URI  // Adjust with your URI
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api', apiRoutes);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Running in ${process.env.NODE_ENV} mode`);
    console.log('updated cors')
});

