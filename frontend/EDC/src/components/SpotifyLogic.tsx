import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import SoundLogo from './SoundLogo';

// Define the type for the last played track
interface LastPlayedTrack {
    name: string;
    artists: string[];
    album: string;
    image: string;
    spotifyUrl: string;
}

export default function SpotifyLogic() {
    const [lastPlayedTrack, setLastPlayedTrack] = useState<LastPlayedTrack | null>(null);

    useEffect(() => {
        axios.get('/spotify/last-played', { withCredentials: true })
            .then(response => {
                setLastPlayedTrack(response.data);
            })
            .catch(error => {
                console.error('Error fetching last played track:', error);
            });
    }, []);

    return (
        <div className="spotify-card bg-white w-full h-full relative overflow-hidden flex items-center justify-between">
            {lastPlayedTrack ? (
                <>
                    {/* Left Section: Album Image */}
                    <div className="relative z-10">
                        <a href={lastPlayedTrack.spotifyUrl} target='_blank' rel="noopener noreferrer">
                            <img
                                src={lastPlayedTrack.image}
                                alt={`${lastPlayedTrack.album} album cover`}
                                className="md:w-40 md:h-40 w-24 h-24 rounded-lg object-cover"
                            />
                        </a>
                    </div>

                    {/* Right Section: Track Information */}
                    <div className="flex flex-col items-start justify-center text-[#191414] w-2/3 ml-4 relative z-10">
                        {/* Make track name clickable */}
                        <h2 className="md:text-2xl text-xl font-bold leading-tight mb-1">
                            <a 
                                href={lastPlayedTrack.spotifyUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:underline"
                            >
                                {lastPlayedTrack.name}
                            </a>
                        </h2>
                        <p className="md:text-base text-sm text-gray-500 mb-1">{lastPlayedTrack.artists.join(', ')}</p>
                        <p className="md:text-sm text-xs text-gray-600">{lastPlayedTrack.album}</p>
                    </div>

                    {/* Spotify Icon in Background */}
                    <div className="absolute right-[-40px] bottom-[-40px] text-black/85 opacity-80 z-0">
                        <FontAwesomeIcon icon={faSpotify} size="10x" />
                    </div>

                    {/* Badge for Last Played */}
                    <div className="absolute hidden md:flex top-4 right-4 text-sm text-[#1DB954]/70 font-semibold font-noto tracking-widest pr-8 py-1 rounded-full z-1">
                        <span>Last Played</span>
                    </div>
                    <div className="absolute hidden md:flex bottom-48 right-0 text-sm text-[#1DB954]/70 font-semibold px-3 py-1 rounded-full z-1 scale-75">
                        <SoundLogo />
                    </div>
                </>
            ) : (
                <p>Loading last played track...</p>
            )}
        </div>
    );
}









