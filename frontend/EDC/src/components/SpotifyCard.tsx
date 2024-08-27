import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import SpotifyLogic from './SpotifyLogic';

export default function SpotifyCard() {
    return (
        <div className="relative bg-white flex rounded-3xl shadow-lg h-full overflow-hidden">
            {/* Green Cover Div */}
            <div className="absolute bg-[#1DB954] top-0 left-0 w-full h-full hover:translate-x-[95%] hover:rounded-none cursor-pointer transition-all duration-500 rounded-3xl z-10 flex items-center justify-center">
                <span className="text-6xl text-white">
                    <FontAwesomeIcon icon={faSpotify} />
                </span>
            </div>

            {/* Spotify Logic Content */}
            <div className="relative z-0 w-full h-full pl-8 pr-6">
                <SpotifyLogic />
            </div>
        </div>
    );
}
