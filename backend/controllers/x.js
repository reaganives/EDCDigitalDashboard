require('dotenv').config();
const axios = require('axios');

async function getTrendingTopics(req, res) {
    const BEARER_TOKEN = process.env.BEARER_TOKEN;

    try {
        // Make the API request to X's trending topics endpoint
        const response = await axios.get('https://api.twitter.com/1.1/trends/place.json', {
            params: { id: 1 }, // id: 1 represents worldwide trends. Change this if you want trends from a specific location
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`
            }
        });

        // Respond with the trending topics
        const trends = response.data[0].trends;
        res.json(trends);
    } catch (error) {
        console.error('Error fetching trending topics:', error);
        res.status(500).json({ error: 'Failed to fetch trending topics' });
    }
}

module.exports = {
    getTrendingTopics
};
