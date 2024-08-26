import { useEffect, useState } from 'react';
import axios from '../axiosConfig';  // Assuming axios is configured with the correct base URL

export default function SpotifyLogic() {
    const [lastPlayed, setLastPlayed] = useState(null);

    useEffect(() => {
        axios.get('/spotify/last-played')
            .then(response => {
                setLastPlayed(response.data);
            })
            .catch(error => {
                console.error('Error fetching last played track:', error);
            });
    }, []);

    return (
        <div className="flex w-full h-full rounded-lg bg-white shadow-lg border p-4">
            {lastPlayed ? (
                <div>
                    <h2 className="text-xl font-bold">{lastPlayed.name}</h2>
                    <p>{lastPlayed.artists.map(artist => artist.name).join(', ')}</p>
                    <p>{lastPlayed.album.name}</p>
                </div>
            ) : (
                <p>Loading last played track...</p>
            )}
        </div>
    );
}
