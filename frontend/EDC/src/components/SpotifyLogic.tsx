import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import SoundLogo from './SoundLogo';

export default function SpotifyLogic() {
    const [lastPlayedTrack, setLastPlayedTrack] = useState(null);

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
                        <img
                            src={lastPlayedTrack.image}
                            alt={`${lastPlayedTrack.album} album cover`}
                            className="w-40 h-40 rounded-lg object-cover"
                        />
                    </div>

                    {/* Right Section: Track Information */}
                    <div className="flex flex-col items-start justify-center text-[]#191414] w-2/3 ml-4 relative z-10">
                        <h2 className="text-2xl font-bold leading-tight mb-1">{lastPlayedTrack.name}</h2>
                        <p className="text-md text-gray-500 mb-1">{lastPlayedTrack.artists.join(', ')}</p>
                        <p className="text-sm text-gray-600">{lastPlayedTrack.album}</p>
                    </div>

                    {/* Spotify Icon in Background */}
                    <div className="absolute right-[-40px] bottom-[-40px] text-black opacity-80 z-0">
                        <FontAwesomeIcon icon={faSpotify} size="10x" />
                    </div>

                    {/* Badge for Last Played */}
                    <div className="absolute flex top-4 right-4 text-sm bg-white text-[#1DB954] font-semibold font-noto tracking-widest px-3 py-1 rounded-full z-10">
                     <span>Last Played</span>
                    </div>
                    <div className="absolute flex bottom-44 right-4 text-sm text-[#1DB954] font-semibold px-3 py-1 rounded-full z-10">
                        <SoundLogo />
                    </div>
                </>
            ) : (
                <p>Loading last played track...</p>
            )}
        </div>
    );
}







