import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from "@fortawesome/free-brands-svg-icons"

export default function SpotifyCard() {
    return (
        <div className="bg-white flex rounded-3xl shadow-lg h-full overflow-hidden">
            <div className="bg-green-200 w-full h-full hover:translate-x-[92%] hover:rounded-none cursor-pointer transition-all duration-500 rounded-3xl">
                <span className="text-6xl text-white flex justify-center items-center w-full h-full">
                    <FontAwesomeIcon icon={faSpotify} />
                </span>
            </div>
        </div>
    )
}