require('dotenv').config();
const axios = require('axios');

// Controller function to fetch the latest MLB news article
async function getLatestMLBNews(req, res) {
    try {
        // API URL with query for MLB
        const apiUrl = 'https://newsapi.org/v2/everything';
        
        // Fetch the latest MLB news article
        const response = await axios.get(apiUrl, {
            params: {
                q: 'MLB', // Query keyword for MLB
                sortBy: 'publishedAt', // Sort by the latest articles
                pageSize: 1, // Only fetch the latest article
                apiKey: process.env.NEWS_API_KEY // Your API key from .env file
            }
        });

        // Extract the article from the response
        const articles = response.data.articles;

        // Check if we got any articles
        if (articles && articles.length > 0) {
            // Send the latest article to the frontend
            res.json({
                title: articles[0].title,
                description: articles[0].description,
                url: articles[0].url,
                publishedAt: articles[0].publishedAt,
                imageUrl: articles[0].urlToImage,
                source: articles[0].source.name
            });
        } else {
            res.status(404).json({ message: 'No MLB news articles found' });
        }
    } catch (error) {
        console.error('Error fetching MLB news:', error.message);
        res.status(500).json({ error: 'Failed to fetch MLB news' });
    }
}

module.exports = { getLatestMLBNews };


