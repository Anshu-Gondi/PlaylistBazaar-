import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import './style.css';

function Room() {
    const { code } = useParams();
    const [room, setRoom] = useState(null);
    const [song, setSong] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);  // Set initial state to null

    // Fetch room details
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/get-room/?code=${code}`)
            .then(response => setRoom(response.data))
            .catch(error => console.error('Error fetching room:', error.response?.data));
    }, [code]);

    // Check if user is authenticated with Spotify
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/spotify/is-authenticated')
            .then(response => {
                setIsAuthenticated(response.data.status);  // Update authentication state
                if (!response.data.status) {
                    axios.get('http://127.0.0.1:8000/spotify/get-auth-url').then(res => {
                        window.location.href = res.data.url;
                    });
                }
            });
    }, []);

    // Fetch the current song every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('http://127.0.0.1:8000/spotify/current-song')
                .then(response => {
                    if (response.status === 200) {
                        setSong(response.data);
                    }
                })
                .catch(error => console.error('Error fetching song:', error.response?.data));
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    // If authentication is still unknown, show nothing (prevents flashing)
    if (isAuthenticated === null) return null;

    return (
        <div className="room-container">
            <h1 className="room-title">Room {room?.code}</h1>
            <div className="room-info">
                <p><strong>Host:</strong> {room?.host}</p>
                <p><strong>Guest Can Pause:</strong> {room?.guest_can_pause ? 'Yes' : 'No'}</p>
                <p><strong>Votes to Skip:</strong> {room?.votes_to_skip}</p>
            </div>

            {/* Show authentication message if not authenticated */}
            {!isAuthenticated && <p className="auth-message">Authenticating with Spotify...</p>}

            {/* Show MusicPlayer only if authenticated */}
            {isAuthenticated && song && <MusicPlayer {...song} />}
        </div>
    );
}

export default Room;
