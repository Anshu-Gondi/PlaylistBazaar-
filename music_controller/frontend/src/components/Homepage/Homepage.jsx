import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const Homepage = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/rooms/')
            .then((response) => setRooms(response.data))
            .catch((error) => console.error('Error fetching rooms:', error));
    }, []);

    return (
        <div className="homepage-container">
            <h1 className="homepage-title">Available Rooms</h1>
            <ul className="room-list">
                {rooms.map((room) => (
                    <li key={room.id} className="room-card">
                        <div className="room-code">Room Code: {room.code}</div>
                        <div className="room-host">Host: {room.host}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Homepage;
