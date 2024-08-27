const mongoose = require('mongoose');

// Define the Rating Schema
const RatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,  // Ensure that every rating must be a number
    },
    timestamp: {
        type: Date,
        default: Date.now,  // Automatically set the current date if not provided
        required: true,
    },
});

// Create the Rating model based on the schema
const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
