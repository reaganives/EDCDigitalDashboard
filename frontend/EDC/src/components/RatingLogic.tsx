import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowTrendDown, faChessKnight } from '@fortawesome/free-solid-svg-icons'; // Added the pawn icon

export default function RatingLogic() {
    const [ratingChange, setRatingChange] = useState(null);
    const [currentRating, setCurrentRating] = useState(null);

    useEffect(() => {
        axios.get('/lichess/rating-change')
            .then(response => {
                const { ratingChange, currentRating } = response.data;
                setRatingChange(ratingChange != null && !isNaN(ratingChange) ? ratingChange : 'N/A');
                setCurrentRating(currentRating != null && !isNaN(currentRating) ? currentRating : 'N/A');
            })
            .catch(error => {
                console.error('Error fetching rating change:', error);
                setRatingChange('N/A');
                setCurrentRating('N/A');
            });
    }, []);

    return (
        <div className="rating-change-card h-full bg-white rounded-lg shadow-md md:p-4">
            <h2 className="mt-2 md:text-base text-sm font-noto text-center text-zinc-600">Live Rapid Rating: <a href="https://lichess.org/@/maverickofatlas/perf/rapid" target="_blank" className=''><p className="text-purple-800 md:text-lg text-base tracking-wide font-noto hover:scale-105 transition-all duration-300 hover:-translate-y-[2%]">{typeof currentRating === 'number' ? currentRating.toFixed(2) : 'N/A'}</p></a></h2>
            <div className="flex items-center text-lg mt-4 justify-center">
                {typeof ratingChange === 'number' ? (
                    <div className="flex items-center justify-center">
                        <p className="mr-2 md:text-sm text-xs text-zinc-600 font-noto">Last 10 days: <span className='text-zinc-900 tracking-wide font-noto font-semibold ml-px'>{ratingChange.toFixed(2)}</span></p>
                        {ratingChange > 0 ? (
                            <FontAwesomeIcon icon={faArrowTrendUp} className='p-1 text-green-400 mb-px' /> // Green up arrow
                        ) : ratingChange < 0 ? (
                            <FontAwesomeIcon icon={faArrowTrendDown} className='p-1 text-red-400 mb-px' /> // Red down arrow
                        ) : null}
                    </div>
                ) : (
                    <p>Last 10 days: N/A</p>
                )}
            </div>

            {/* Button linking to Lichess Daily Puzzle */}
            <div className="group flex justify-center mt-4 hover:scale-105 transition-all duration-300">
                <a
                    href="https://lichess.org/training/daily"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-300 text-white px-4 py-2 rounded-full flex items-center hover:bg-orange-300/90 transition duration-300"
                >
                    <FontAwesomeIcon icon={faChessKnight} className="mr-2 group-hover:rotate-12 transition-all duration-300 group-hover:scale-110" /> Daily Puzzle
                </a>
            </div>
        </div>
    );
}








