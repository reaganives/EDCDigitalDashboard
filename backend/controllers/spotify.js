require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring');
const User = require('../models/User');

// Spotify API credentials
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_URI;

// Function to exchange authorization code for access and refresh tokens
async function getTokensFromAuthorizationCode(code) {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,  // This needs to match exactly with your redirect URI
            client_id: clientId,
            client_secret: clientSecret,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        const tokenExpiration = Date.now() + 3600 * 1000; // Assuming tokens are valid for 1 hour

        // Store the tokens in the database (assume only one user document)
        let user = await User.findOne();
        if (!user) {
            user = new User({
                spotifyAccessToken: accessToken,
                spotifyRefreshToken: refreshToken,
                spotifyTokenExpiration: tokenExpiration,
            });
        } else {
            user.spotifyAccessToken = accessToken;
            user.spotifyRefreshToken = refreshToken;
            user.spotifyTokenExpiration = tokenExpiration;
        }

        await user.save();

        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error exchanging authorization code for tokens:', error);
        throw error;
    }
}

// Function to refresh the access token using the refresh token
async function refreshAccessToken(refreshToken) {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId,
            client_secret: clientSecret,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const newAccessToken = response.data.access_token;
        const newTokenExpiration = Date.now() + 3600 * 1000; // Assuming tokens are valid for 1 hour

        // Update the access token in the database
        let user = await User.findOne();
        if (user) {
            user.spotifyAccessToken = newAccessToken;
            user.spotifyTokenExpiration = newTokenExpiration;
            await user.save();
        }

        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
}

// Middleware to ensure valid access token in cookies
async function ensureAccessToken(req, res, next) {
    const user = await User.findOne();

    if (!user || !user.spotifyAccessToken) {
        return res.status(401).json({ error: 'No access token available' });
    }

    let accessToken = user.spotifyAccessToken;

    // Check if the token has expired
    if (Date.now() > user.spotifyTokenExpiration) {
        console.log('Access token expired, refreshing...');
        accessToken = await refreshAccessToken(user.spotifyRefreshToken);
    }

    // Attach tokens to req object for use in subsequent handlers
    req.accessToken = accessToken;
    req.refreshToken = user.spotifyRefreshToken;

    next();
}

// Controller function to get the last played track
async function getLastPlayedTrack(req, res) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {
                Authorization: `Bearer ${req.accessToken}`,
            },
        });

        const lastPlayedTrack = response.data.items[0]?.track;
        const albumImages = lastPlayedTrack.album.images;

        res.json({
            name: lastPlayedTrack.name,
            artists: lastPlayedTrack.artists.map(artist => artist.name),
            album: lastPlayedTrack.album.name,
            image: albumImages[0].url,
            spotifyUrl: lastPlayedTrack.external_urls.spotify,
        });
    } catch (error) {
        console.error('Error fetching last played track:', error);
        res.status(500).json({ error: 'Failed to fetch last played track' });
    }
}

async function getNewestReleases(req, res) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
            headers: {
                Authorization: `Bearer ${req.accessToken}`,
            },
            params: {
                country: 'US',
                limit: 10,
            },
        });

        const newestReleases = response.data.albums.items;

        res.json({
            releases: newestReleases.map((release) => ({
                name: release.name,
                artists: release.artists.map((artist) => artist.name).join(', '),
                releaseDate: release.release_date,
                image: release.images[0].url,
                spotifyUrl: release.external_urls.spotify,
            })),
        });
    } catch (error) {
        console.error('Error fetching newest releases:', error);
        res.status(500).json({ error: 'Failed to fetch newest releases' });
    }
}

module.exports = {
    getTokensFromAuthorizationCode,
    ensureAccessToken,
    getNewestReleases,
    getLastPlayedTrack,
    refreshAccessToken,
};





