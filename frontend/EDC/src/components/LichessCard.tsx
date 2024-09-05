import { useState, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import RatingLogic from './RatingLogic';
import LichessBlog from './LichessBlog';

export default function LichessCard() {
    const [isSlideActive, setIsSlideActive] = useState<boolean>(false); // State to toggle slide

    const toggleSlide = () => {
        setIsSlideActive(!isSlideActive); // Toggle state on click
    };

    // Function to stop propagation when clicking on LichessBlog
    const handleNewReleasesClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <div
            className="relative flex bg-white rounded-3xl shadow-lg overflow-hidden h-full z-0"
            // Make the parent div clickable
        >
            {/* First layer */}
            <div onClick={toggleSlide}
                className={`absolute z-10 bg-white w-full h-full transition-all duration-500 rounded-3xl ${
                    isSlideActive ? '-translate-y-[93%] scale-110' : ''
                }`}
            >
                <div className="flex flex-col justify-center items-center w-full h-full cursor-pointer transition-all duration-500">
                    <div className='absolute z-50 -top-[85px] hover:top-0 transition-all duration-500 pt-2 opacity-85 px-4 flex justify-center' onClick={handleNewReleasesClick}>
                        <LichessBlog />
                    </div>
                    <div className='flex justify-center flex-col items-center hover:-translate-y-[2%] transition-all duration-500'>
                        <span className="tracking-wider md:text-2xl text-xl mb-2 md:pt-28 pt-8 font-roboto">Lichess.org</span>
                        <div className="flex flex-col space-y-0 text-[15px]">
                            <div className="flex space-x-0">
                                {Array(21)
                                    .fill(0)
                                    .map((_, idx) => (
                                        <span key={idx} className={idx % 2 === 1 ? 'text-white leading-none' : 'leading-none'}>
                                            <FontAwesomeIcon icon={faSquareFull} />
                                        </span>
                                    ))}
                            </div>
                            <div className="flex space-x-0">
                                {Array(21)
                                    .fill(0)
                                    .map((_, idx) => (
                                        <span key={idx} className={idx % 2 === 0 ? 'text-white leading-none' : 'leading-none'}>
                                            <FontAwesomeIcon icon={faSquareFull} />
                                        </span>
                                    ))}
                            </div>
                            <div className="flex space-x-0">
                                {Array(21)
                                    .fill(0)
                                    .map((_, idx) => (
                                        <span key={idx} className={idx % 2 === 1 ? 'text-white leading-none' : 'leading-none'}>
                                            <FontAwesomeIcon icon={faSquareFull} />
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second layer: Rating Logic */}
            <div className="z-0 relative w-full h-full md:p-6 flex items-center justify-center">
                <RatingLogic />
            </div>
        </div>
    );
}





