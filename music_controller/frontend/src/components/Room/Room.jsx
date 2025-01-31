import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function Room() {
    const { code } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/get-room/?code=${code}`)
            .then(response => setRoom(response.data))
            .catch(error => console.error('Error fetching room:', error.response.data));
    }, [code]);

    if (!room) return <h1 className="loading">Loading...</h1>;

    return (
        <div className="room-container">
            <h1 className="room-title">Room {room.code}</h1>
            <div className="room-info">
                <p><strong>Host:</strong> {room.host}</p>
                <p><strong>Guest Can Pause:</strong> {room.guest_can_pause ? 'Yes' : 'No'}</p>
                <p><strong>Votes to Skip:</strong> {room.votes_to_skip}</p>
            </div>
        </div>
    );
}

export default Room;
