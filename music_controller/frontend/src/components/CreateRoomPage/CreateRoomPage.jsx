import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
import "./style.css";

function CreateRoomPage() {
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/create-room/", {
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
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Typography component="h4" variant="h4" style={{ textAlign: "center" }}>
                    Create A Room
                </Typography>
            </Grid>
            {message && (
                <Grid item xs={12}>
                    <Typography color="secondary" style={{ textAlign: "center" }}>
                        {message}
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormHelperText style={{ textAlign: "center" }}>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup
                        row
                        value={guestCanPause.toString()}
                        onChange={(e) => setGuestCanPause(e.target.value === "true")}
                        style={{ justifyContent: "center" }}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary" />}
                            label="No Control"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <TextField
                        required
                        type="number"
                        value={votesToSkip}
                        onChange={(e) => setVotesToSkip(Number(e.target.value))}
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                        }}
                    />
                    <FormHelperText style={{ textAlign: "center" }}>
                        Votes Required To Skip Song
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button color="primary" variant="contained" onClick={handleSubmit}>
                    Create A Room
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button color="secondary" variant="contained" component={Link} to="/">
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}

export default CreateRoomPage;
