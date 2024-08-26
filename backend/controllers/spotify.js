require('dotenv').config();

const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const app = express();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = null;

// Function to request a new access token
async function getAccessToken() {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    accessToken = response.data.access_token;
    console.log('New access token:', accessToken);
}

// Middleware to ensure access token is available
async function ensureAccessToken(req, res, next) {
    if (!accessToken) {
        await getAccessToken();
    }
    next();
}

// Fetch your recently played tracks
app.get('/api/spotify/last-played', ensureAccessToken, async (req, res) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Respond with the most recent track
        res.json(response.data.items[0].track);
    } catch (error) {
        console.error('Error fetching last played track:', error);
        res.status(500).json({ error: 'Failed to fetch last played track' });
    }
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});

