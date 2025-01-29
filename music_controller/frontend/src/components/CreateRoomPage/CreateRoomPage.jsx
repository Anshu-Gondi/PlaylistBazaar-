import { useState } from "react";
import axios from "axios";
import "./style.css";

function CreateRoomPage() {
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://127.0.0.1:8000/api/create-room/", { // Updated API URL
                guest_can_pause: guestCanPause,
                votes_to_skip: votesToSkip,
            })
            .then((response) => {
                setMessage(`Room created! Code: ${response.data.code}`);
            })
            .catch((error) => {
                console.error("Error creating room:", error);
                setMessage("Failed to create room. Please try again.");
            });
    };

    return (
        <div>
            <h1>Create Room</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Allow Guests to Pause:
                    <input
                        type="checkbox"
                        checked={guestCanPause}
                        onChange={(e) => setGuestCanPause(e.target.checked)}
                    />
                </label>
                <br />
                <label>
                    Votes Required to Skip:
                    <input
                        type="number"
                        value={votesToSkip}
                        onChange={(e) => setVotesToSkip(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <br />
                <button type="submit">Create Room</button>
            </form>
        </div>
    );
}

export default CreateRoomPage;
