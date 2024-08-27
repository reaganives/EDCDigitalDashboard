import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

export default function RatingLogic() {
    const [ratingChange, setRatingChange] = useState(null);
    const [currentRating, setCurrentRating] = useState(null);
    const [oldestRating, setOldestRating] = useState(null);

    useEffect(() => {
        axios.get('/lichess/rating-change')
            .then(response => {
                // Destructure data from the response
                const { ratingChange, currentRating, oldestRating } = response.data;

                // Ensure values are valid before updating state
                setRatingChange(ratingChange != null && !isNaN(ratingChange) ? ratingChange : 'N/A');
                setCurrentRating(currentRating != null && !isNaN(currentRating) ? currentRating : 'N/A');
                setOldestRating(oldestRating != null && !isNaN(oldestRating) ? oldestRating : 'N/A');
            })
            .catch(error => {
                console.error('Error fetching rating change:', error);
                setRatingChange('N/A');
                setCurrentRating('N/A');
                setOldestRating('N/A');
            });
    }, []);

    return (
        <div className="rating-change-card">
            <h2>Rating Change Compared to Oldest Rating</h2>
            <p>Elo Change: {typeof ratingChange === 'number' ? ratingChange.toFixed(2) : 'N/A'}</p>
            <p>Current Rating: {typeof currentRating === 'number' ? currentRating.toFixed(2) : 'N/A'}</p>
            <p>Oldest Rating: {typeof oldestRating === 'number' ? oldestRating.toFixed(2) : 'N/A'}</p>
        </div>
    );
}






