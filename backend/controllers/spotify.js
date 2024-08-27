require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

// Spotify API credentials
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = `http://localhost:4000/api/spotify/callback`;

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

        return response.data.access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
}

// Middleware to ensure valid access token in cookies
async function ensureAccessToken(req, res, next) {
    let accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // If there's no access token, return an error
    if (!accessToken) {
        return res.status(401).json({ error: 'No access token available' });
    }

    // Attach tokens to req object for use in subsequent handlers
    req.accessToken = accessToken;
    req.refreshToken = refreshToken;

    next();
}

// Controller function to get the last played track
async function getLastPlayedTrack(req, res) {
    try {
        // First, try making the request with the existing access token
        let response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
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
            image: albumImages[0].url // Usually the first image is the largest
        });

    } catch (error) {
        // If the token is expired, refresh and retry the request
        if (error.response && error.response.status === 401 && req.refreshToken) {
            console.log('Access token expired, refreshing...');
            
            // Refresh the token
            const newAccessToken = await refreshAccessToken(req.refreshToken);

            // Update the access token in cookies
            res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true });

            // Retry the request with the new access token
            const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
                headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                },
            });

            // Extract album images again
            const lastPlayedTrack = response.data.items[0]?.track;
            const albumImages = lastPlayedTrack.album.images;

            res.json({
                name: lastPlayedTrack.name,
                artists: lastPlayedTrack.artists.map(artist => artist.name),
                album: lastPlayedTrack.album.name,
                image: albumImages[0].url // Usually the first image is the largest
            });

        } else {
            console.error('Error fetching last played track:', error);
            res.status(500).json({ error: 'Failed to fetch last played track' });
        }
    }
}

module.exports = {
    getTokensFromAuthorizationCode,
    ensureAccessToken,
    getLastPlayedTrack,
    refreshAccessToken,
};




