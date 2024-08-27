const Rating = require('../models/Rating');

// Function to get the rating change compared to the oldest record in the database
async function getRatingChange(req, res) {
    try {
        // Fetch the oldest rating in the database
        const oldestRatingData = await Rating.findOne({}).sort({ timestamp: 1 });

        // Fetch the most recent rating in the database
        const currentRatingData = await Rating.findOne({}).sort({ timestamp: -1 });

        if (oldestRatingData && currentRatingData) {
            // Calculate the rating change
            const ratingChange = currentRatingData.rating - oldestRatingData.rating;

            // Respond with the rating change, the oldest rating, and the current rating
            res.json({ ratingChange, oldestRating: oldestRatingData.rating, currentRating: currentRatingData.rating });
        } else {
            // Handle cases where there isn't enough data to calculate rating change
            res.json({ error: 'Insufficient data to calculate rating change' });
        }
    } catch (error) {
        console.error('Error fetching rating change:', error);
        res.status(500).json({ error: 'Failed to calculate rating change' });
    }
}

// Function to insert a new rating without overwriting old ratings
async function insertCurrentRating(currentRating) {
    try {
        const newRating = new Rating({ rating: currentRating });
        await newRating.save();
        console.log('New rating inserted:', currentRating);
    } catch (error) {
        console.error('Error inserting new rating:', error);
    }
}

module.exports = {
    getRatingChange,
    insertCurrentRating
};




