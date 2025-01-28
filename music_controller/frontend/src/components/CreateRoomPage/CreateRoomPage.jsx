import { useState } from 'react';
import axios from 'axios';
import './style.css';

function CreateRoomPage() {
    const [roomCode, setRoomCode] = useState('');
    const [host, setHost] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Sending POST request to create a new room
        axios
            .post('http://127.0.0.1:8000/api/rooms/', {
                code: roomCode,
                host: host
            })
            .then((response) => {
                console.log('Room created:', response.data);
                // You can redirect or show a success message
            })
            .catch((error) => console.error('Error creating room:', error));
    };

    return (
        <div>
            <h1>Create Room</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Room Code:
                    <input
                        type="text"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Host:
                    <input
                        type="text"
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Create Room</button>
            </form>
        </div>
    );
}

export default CreateRoomPage;
