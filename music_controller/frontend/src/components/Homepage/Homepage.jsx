import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import {
    Container,
    Typography,
    Grid,
    Button,
    ButtonGroup,
} from "@mui/material";
import "./style.css";

const Homepage = () => {
    const [roomCode, setRoomCode] = useState(null); // To track if the user is already in a room
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already in a room
        axios
            .get("/api/user-in-room")
            .then((response) => {
                if (response.data.code) {
                    setRoomCode(response.data.code);
                    navigate(`/room/${response.data.code}`);
                }
            })
            .catch((error) => console.error("Error checking room:", error));
    }, [navigate]);

    return (
        <Container maxWidth="md" className="homepage-container">
            <Typography variant="h3" align="center" gutterBottom className="homepage-title">
                Welcome to the Homepage
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
                Please choose an option below
            </Typography>

            {roomCode ? (
                <Typography variant="h6" align="center" color="textSecondary">
                    You are already in Room {roomCode}.
                </Typography>
            ) : (
                <>
                    <Grid item xs={12} align="center">
                        <ButtonGroup disableElevation variant="contained" color="primary">
                            <Button color="primary" to="/joinroom" component={Link}>
                                Join a Room
                            </Button>
                            <Button color="secondary" to="/Createroom" component={Link}>
                                Create a Room
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default Homepage;
