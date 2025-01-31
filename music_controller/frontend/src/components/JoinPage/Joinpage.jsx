import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

function JoinPage() {
    const [rooms, setRooms] = useState([]);
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/rooms/')
            .then(response => setRooms(response.data))
            .catch(error => console.error('Error fetching rooms:', error));
    }, []);

    const joinRoom = (code) => {
        axios.post('http://127.0.0.1:8000/api/join-room/', { code })
            .then(response => {
                console.log(response.data.message);
                navigate(`/room/${code}`); // Navigate to the Room page
            })
            .catch(error => console.error('Error joining room:', error.response.data));
    };

    return (
        <div className="join-container">
            <div className="header-container">
                <h1>Join a Room</h1>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter Room Code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                />
                <button className="btn" onClick={() => joinRoom(roomCode)}>Join Room</button>
            </div>

            <h2>Available Rooms</h2>
            <div className="room-list-container">
                <ul className="room-list">
                    {rooms.map((room) => (
                        <li key={room.id} className="room-item">
                            <span><strong>Room Code:</strong> {room.code}</span>
                            <span><strong>Host:</strong> {room.host}</span>
                            <button className="btn join-btn" onClick={() => joinRoom(room.code)}>Join</button>
                        </li>
                    ))}
                </ul>
            </div>

            <button className="btn back-btn" onClick={() => navigate('/')}>Back to Home</button>
        </div>
    );
}

export default JoinPage;
