const mongoose = require('mongoose');
require('dotenv').config();  // For loading environment variables

// Models
const Rating = require('./models/Rating');  // Ensure this is correctly pointing to your Rating model file

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/lichess';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

// Function to seed the database
async function seedDatabase() {
    try {
        // Clear the existing data
        await Rating.deleteMany({});

        // Create a rating record with a rating of 1900 from 3 days ago
        const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
        const seedData = new Rating({
            rating: 1900,
            timestamp: threeDaysAgo
        });

        // Save the record to the database
        await seedData.save();

        console.log('Database seeded with initial rating data:', seedData);
    } catch (err) {
        console.error('Error seeding the database:', err);
    } finally {
        // Ensure the database connection is closed even if there is an error
        mongoose.connection.close();
    }
}

// Run the seed function
seedDatabase();

