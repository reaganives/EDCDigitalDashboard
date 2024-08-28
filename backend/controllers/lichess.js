const Rating = require('../models/Rating');
const axios = require('axios');
const xml2js = require('xml2js');

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

// Function to fetch the latest blog article from Lichess Atom feed
async function getLatestLichessBlog(req, res) {
    try {
        // Fetch the blog data from Lichess
        const response = await axios.get('https://lichess.org/@/Lichess/blog.atom', {
            headers: {
                'Content-Type': 'application/xml'
            }
        });

        const xmlData = response.data;

        // Log the raw XML data to verify it's coming through correctly
        // console.log('Raw XML Data:', xmlData);

        // Parse the XML data using xml2js
        xml2js.parseString(xmlData, { explicitArray: false }, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                return res.status(500).json({ error: 'Failed to parse Lichess blog data' });
            }

            // Log the parsed XML structure to understand it better
            // console.log('Parsed XML Structure:', JSON.stringify(result, null, 2));

            // Ensure that the feed and entry exist
            const feed = result.feed;
            const latestEntry = Array.isArray(feed.entry) ? feed.entry[0] : feed.entry;

            // Check if an entry is present
            if (latestEntry) {
                // Safely access the content and check for an image in the content
                const content = latestEntry.content ? latestEntry.content._ || latestEntry.content : 'No summary available';
                const image = latestEntry.content && latestEntry.content.img && latestEntry.content.img.$ ? latestEntry.content.img.$.src : 'No image available';

                // Safely access the link field
                let link = 'No link available';
                if (Array.isArray(latestEntry.link)) {
                    const alternateLink = latestEntry.link.find(l => l.$.rel === 'alternate');
                    link = alternateLink ? alternateLink.$.href : 'No link available';
                } else if (latestEntry.link && latestEntry.link.$ && latestEntry.link.$.rel === 'alternate') {
                    link = latestEntry.link.$.href;
                }

                // Send relevant data to the frontend
                res.json({
                    title: latestEntry.title || 'No title available',
                    summary: content,
                    link: link,
                    published: latestEntry.published || 'No date available',
                    image: image
                });
            } else {
                console.error('No blog entries found');
                res.status(404).json({ error: 'No blog articles found' });
            }
        });
    } catch (error) {
        console.error('Error fetching Lichess blog:', error);
        res.status(500).json({ error: 'Failed to fetch Lichess blog' });
    }
}

module.exports = {
    getRatingChange,
    insertCurrentRating,
    getLatestLichessBlog,
};




