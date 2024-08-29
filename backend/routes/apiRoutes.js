require('dotenv').config();
const express = require('express');
const { getTokensFromAuthorizationCode, ensureAccessToken, getLastPlayedTrack, getNewestReleases } = require('../controllers/spotify');
const router = express.Router();
const axios = require('axios');
const { getRatingChange, insertCurrentRating, getLatestLichessBlog } = require('../controllers/lichess');
const { getTrendingTopics } = require('../controllers/x');
const { fetchCryptoData } = require('../controllers/crypto');
const { getLatestMLBNews } = require('../controllers/baseball');
const User = require('../models/User');

// Store tokens in cookies after successful login
router.get('/spotify/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const { accessToken, refreshToken } = await getTokensFromAuthorizationCode(code);

        // Find the existing user document (assuming there's only one user)
        let user = await User.findOne();

        if (!user) {
            // If the user document doesn't exist, create it
            user = new User({
                spotifyAccessToken: accessToken,
                spotifyRefreshToken: refreshToken,
                spotifyTokenExpiration: Date.now() + 3600 * 1000, // Token valid for 1 hour
                // Add any other fields you might need
            });
        } else {
            // Update the existing user document with the new tokens
            user.spotifyAccessToken = accessToken;
            user.spotifyRefreshToken = refreshToken;
            user.spotifyTokenExpiration = Date.now() + 3600 * 1000; // Token valid for 1 hour
        }

        // Save the user document to the database
        await user.save();

        // Redirect to your frontend
        res.redirect('http://localhost:5173'); // Or your actual frontend URL
    } catch (error) {
        console.error('Error getting tokens:', error);
        res.status(500).send('Authorization failed');
    }
});

// Endpoint to fetch MLB standings
router.get('/mlb/standings', async (req, res) => {
    try {
        const response = await axios.get('https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=2024&standingsTypes=regularSeason');
        const standings = response.data.records;
        res.json(standings);
    } catch (error) {
        console.error('Error fetching MLB standings:', error);
        res.status(500).json({ error: 'Failed to fetch MLB standings' });
    }
});

// Route to get the last played track
router.get('/spotify/last-played', ensureAccessToken, getLastPlayedTrack);

// Route to track rating change dynamically
router.get('/lichess/rating-change', async (req, res) => {
    try {
        // Fetch the current rating from Lichess
        const response = await axios.get('https://lichess.org/api/user/maverickofatlas/perf/rapid');
        const currentRating = response.data.perf.glicko.rating;

        // Insert the current rating into the database
        await insertCurrentRating(currentRating);

        // Calculate and return the rating change
        await getRatingChange(req, res);

    } catch (error) {
        console.error('Error tracking rating change:', error);
        res.status(500).json({ error: 'Failed to track rating change' });
    }
});

// Weather forecast route
router.get('/weather/forecast', async (req, res) => {
    try {
        // Get IP Geolocation
        const ipResponse = await axios.get('https://ipinfo.io/json', {
            params: {
                token: process.env.IPINFO_TOKEN  // Replace with your IPInfo token
            }
        });
        const locationData = ipResponse.data;

        if (!locationData || !locationData.loc) {
            throw new Error('Unable to fetch location data');
        }

        const [latitude, longitude] = locationData.loc.split(',');

        // Get weather forecast based on latitude and longitude
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                lat: latitude,
                lon: longitude,
                units: 'metric', // Or 'imperial' for Fahrenheit
                appid: process.env.OPENWEATHER_API_KEY,  // Ensure this API key is correct
            }
        });

        // Send the 3-hour weather forecast to the frontend
        res.json(weatherResponse.data.list);  // List contains the 3-hour forecast entries
    } catch (error) {
        console.error('Error fetching weather forecast:', error.message || error);
        res.status(500).json({ error: 'Failed to fetch weather forecast' });
    }
});

// Route to get the latest Lichess blog article
router.get('/lichess/latest-blog', getLatestLichessBlog);

// Route to get newest releases
router.get('/spotify/new-releases', ensureAccessToken, getNewestReleases);

// Route to fetch the top 20 cryptocurrencies
router.get('/crypto', fetchCryptoData);

// Route to fetch the trending topics
router.get('/x/trending', getTrendingTopics);

// Route to fetch live scores for the San Diego Padres
router.get('/mlb/latest-news', getLatestMLBNews);

module.exports = router;



