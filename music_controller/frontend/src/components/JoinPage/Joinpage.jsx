import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

function JoinPage() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Fetch room data from the Django backend
        axios
            .get('http://127.0.0.1:8000/api/rooms/')
            .then((response) => setRooms(response.data))
            .catch((error) => console.error('Error fetching rooms:', error));
    }, []);

    return (
        <div>
            <h1>Join Room</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        Room Code: {room.code}, Host: {room.host}
                        {/* You can add a "Join" button here */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JoinPage;
