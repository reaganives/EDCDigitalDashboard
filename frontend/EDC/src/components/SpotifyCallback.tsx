import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate instead of useHistory
import axios from '../axiosConfig';  // Your configured axios instance

export default function SpotifyCallback() {
    const navigate = useNavigate();  // Updated to use useNavigate

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // Send the authorization code to the backend to exchange for tokens
            axios.get(`/api/spotify/callback?code=${code}`)
                .then(response => {
                    console.log('Tokens received:', response.data);
                    navigate('/');  // Use navigate instead of history.push('/')
                })
                .catch(error => {
                    console.error('Error during Spotify authorization:', error);
                });
        }
    }, [navigate]);

    return (
        <div className="spotify-callback">
            <p>Authorizing with Spotify...</p>
        </div>
    );
}

