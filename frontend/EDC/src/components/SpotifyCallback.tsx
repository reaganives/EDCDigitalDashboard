import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SpotifyCallback() {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     // Assuming the backend has already handled the token exchange, 
    //     // you can redirect to the desired page.
    //     navigate('/');  // Redirect to the homepage or another page after successful authorization
    // }, [navigate]);

    return (
        <div className="spotify-callback">
            <p>Authorizing with Spotify...</p>
        </div>
    );
}


