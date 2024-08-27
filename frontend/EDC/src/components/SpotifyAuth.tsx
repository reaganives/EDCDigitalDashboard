import React from 'react';

export default function SpotifyAuth() {
    const redirectToSpotify = () => {
        const clientId = 'e12d917e5afc43c281309b6366f05d76';
        const redirectUri = encodeURIComponent('http://localhost:4000/api/spotify/callback'); // Adjust based on your environment
        const scopes = encodeURIComponent('user-read-recently-played user-read-playback-state');
        
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
        window.location.href = authUrl;
    };

    return (
        <div className="spotify-auth">
            <button onClick={redirectToSpotify} className="btn btn-primary">
                Login with Spotify
            </button>
        </div>
    );
}
