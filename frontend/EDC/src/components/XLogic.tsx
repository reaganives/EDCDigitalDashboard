import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Ensure axios is set up with your base URL

export default function XLogic() {
    const [trendingTopics, setTrendingTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch trending topics from the backend
        axios.get('/x/trending', {
            headers: {
                Authorization: `AAAAAAAAAAAAAAAAAAAAAAJGvgEAAAAAOgjtGr%2FhTKJHNrVFCaRdLUXWFSo%3DRnTQI3VuRNIA800UcH7LgNAJsIoJGxmOchMpaRL0hQMGKVN05p`, // Or hardcode if testing
            }
        })
        .then(response => {
            setTrendingTopics(response.data);
            setLoading(false);
        })
        .catch(err => {
            setError('Failed to load trending topics');
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Loading trending topics...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="x-trending-card bg-white rounded-3xl shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Trending on X</h2>
            <ul>
                {trendingTopics.map((topic, idx) => (
                    <li key={idx} className="mb-2">
                        <a href={topic.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {topic.name}
                        </a>
                        {topic.tweet_volume && (
                            <span className="text-gray-600"> - {topic.tweet_volume.toLocaleString()} Tweets</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

