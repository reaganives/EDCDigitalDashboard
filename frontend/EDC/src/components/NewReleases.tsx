import { useEffect, useState } from 'react';
import axios from '../axiosConfig';

// Define the type for each release object
interface Release {
    spotifyUrl: string;
    image: string;
    name: string;
    artists: string[];
}

export default function NewReleases() {
    // Use the Release type for the state
    const [releases, setReleases] = useState<Release[]>([]);

    useEffect(() => {
        axios.get('/spotify/new-releases', { withCredentials: true })
            .then(response => {
                setReleases(response.data.releases);
            })
            .catch(error => {
                console.error('Error fetching new releases:', error);
            });
    }, []);

    return (
        <div className="new-releases-card w-full font-roboto">
            <h2 className="text-md font-semibold md:mb-2 mb-px tracking-widest">Newest Releases:</h2>
            <ul className='flex md:gap-4 gap-2'>
                {releases.map((release, idx) => (
                    <li key={idx} className="mb-4 z-20">
                        <a href={release.spotifyUrl} target="_blank" rel="noopener noreferrer">
                            <img 
                                src={release.image} 
                                alt={release.name} 
                                className="md:w-8 md:h-8 w-6 h-6 opacity-85 grayscale hover:grayscale-0 hover:opacity-100 rounded-lg mt-1 hover:scale-125 transition-all duration-500 hover:contrast-125 hover:ring border border-white ease-in-out"
                            />
                        </a>
                        <div>
                            {/* Uncomment if needed */}
                            {/* <p className="font-semibold text-xs">{release.name}</p> */}
                            {/* <p className="text-xs">{release.artists.join(', ')}</p> */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

