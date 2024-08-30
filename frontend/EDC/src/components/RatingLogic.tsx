import { useEffect, useState } from 'react';
import axios from '../axiosConfig';

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
        <div className="rating-logic w-full h-full flex justify-center items-center p-2">
            <h2 className="mt-2 md:text-base text-sm font-noto text-center text-zinc-600">
                Live Rapid Rating: 
                <a 
                    href="https://lichess.org/@/maverickofatlas/perf/rapid" 
                    target="_blank" 
                    className=''
                >
                    <p className="text-purple-800 md:text-lg text-base tracking-wide font-noto hover:scale-105 transition-all duration-300 hover:-translate-y-[2%]">
                        {currentRating !== null ? currentRating.toFixed(2) : 'N/A'}
                    </p>
                </a>
            </h2>
            <div className="flex items-center justify-center mt-4">
                <p className="mr-2 md:text-sm text-xs text-zinc-600 font-noto">
                    Last 10 days: 
                    <span className='text-zinc-900 tracking-wide font-noto font-semibold ml-px'>
                        {ratingChange !== null ? ratingChange.toFixed(2) : 'N/A'}
                    </span>
                </p>
            </div>
        </div>
    );
}





