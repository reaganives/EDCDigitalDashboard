import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import SpotifyLogic from './SpotifyLogic';
import NewReleases from './NewReleases';

export default function SpotifyCard() {
    const [isSlideActive, setIsSlideActive] = useState(false); // State to toggle the slide

    const toggleSlide = () => {
        setIsSlideActive(!isSlideActive);
    };

    // Function to stop propagation when clicking on NewReleases
    const handleNewReleasesClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="relative bg-white flex rounded-3xl shadow-lg h-full overflow-hidden">
            {/* Green Cover Div */}
            <div
                className={`absolute group bg-gradient-to-tl from-[#1DB954] to-[#4ac776] top-0 flex-col left-0 w-full h-full transition-all duration-500 rounded-3xl z-10 flex items-center justify-center cursor-pointer ${
                    isSlideActive ? 'translate-x-[95%] rounded-none' : ''
                }`}
                onClick={toggleSlide}
            >
                <span className="text-6xl text-white group-hover:rotate-[9deg] hover:scale-95 w-full h-full justify-center flex items-center transition-all duration-500">
                    <FontAwesomeIcon icon={faSpotify} />
                </span>
                <div
                    className="lg:flex hidden text-white flex justify-center items-center transition-all duration-500"
                    onClick={handleNewReleasesClick} // Prevents toggleSlide from being triggered
                >
                    <NewReleases />
                </div>
            </div>

            {/* Spotify Logic Content */}
            <div className="relative z-0 w-full h-full pl-8 md:pr-6 pr-2">
                <SpotifyLogic />
            </div>
        </div>
    );
}


