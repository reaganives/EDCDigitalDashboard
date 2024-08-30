import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowTrendDown, faChessKnight } from '@fortawesome/free-solid-svg-icons';

export default function RatingLogic() {
    const [currentRating, setCurrentRating] = useState<number | null>(null);
    const [ratingChange, setRatingChange] = useState<number | null>(null);

    useEffect(() => {
        axios.get('/lichess/rating-change')
            .then(response => {
                if (response.data && typeof response.data.currentRating === 'number') {
                    setCurrentRating(response.data.currentRating);
                } else {
                    setCurrentRating(null); // Fallback to null if data is not as expected
                }

                if (response.data && typeof response.data.ratingChange === 'number') {
                    setRatingChange(response.data.ratingChange);
                } else {
                    setRatingChange(null); // Fallback to null if data is not as expected
                }
            })
            .catch(error => {
                console.error('Error fetching rating data:', error);
                setCurrentRating(null); // Set to null in case of error
                setRatingChange(null); // Set to null in case of error
            });
    }, []);

    return (
        <div className="rating-change-card bg-white rounded-lg shadow-md p-4">
            <h2 className="mt-2 text-md font-noto text-center">Live Rapid Rating: <a href="https://lichess.org/@/maverickofatlas/perf/rapid" className='hover:scale-110 transition-all duration-300'>{typeof currentRating === 'number' ? currentRating.toFixed(2) : 'N/A'}</a></h2>
            <div className="flex items-center text-lg mt-4 justify-center">
                {typeof ratingChange === 'number' ? (
                    <div className="flex items-center justify-center">
                        <p className="mr-2 text-sm">Last 3 days: {ratingChange.toFixed(2)}</p>
                        {ratingChange > 0 ? (
                            <FontAwesomeIcon icon={faArrowTrendUp} className='p-2 text-green-400' /> // Green up arrow
                        ) : ratingChange < 0 ? (
                            <FontAwesomeIcon icon={faArrowTrendDown} className='p-2 text-red-400' /> // Red down arrow
                        ) : null}
                    </div>
                ) : (
                    <p>Last 3 days: N/A</p>
                )}
            </div>

            {/* Button linking to Lichess Daily Puzzle */}
            <div className="group flex justify-center mt-4">
                <a
                    href="https://lichess.org/training/daily"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-300 hover:bg-orange-300/90 font-roboto text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-600 transition-all duration-500"
                >
                    <span className='group-hover:rotate-12 transition-all duration-500'><FontAwesomeIcon icon={faChessKnight} className="mr-2" /></span> Daily Puzzle
                </a>
            </div>
        </div>
    );
}