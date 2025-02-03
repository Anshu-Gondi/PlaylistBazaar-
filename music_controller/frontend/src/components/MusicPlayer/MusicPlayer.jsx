import PropTypes from 'prop-types'; // Import PropTypes
import './style.css';
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import axios from 'axios';

function MusicPlayer({ title, artist, duration, time, image_url, is_playing }) {
    const songProgress = (time / duration) * 100;

    const handlePlayPause = () => {
        const endpoint = is_playing ? 'pause' : 'play';
        axios.put(`http://127.0.0.1:8000/spotify/${endpoint}`)
            .catch(error => console.error('Error controlling playback:', error));
    };

    const handleSkip = () => {
        axios.post(`http://127.0.0.1:8000/spotify/skip`)
            .catch(error => console.error('Error skipping song:', error));
    };

    return (
        <Card className="music-player-card">
            <Grid container alignItems="center">
                <Grid item xs={4}>
                    <img src={image_url} alt="Album Cover" height="100%" width="100%" />
                </Grid>
                <Grid item xs={8} className="music-info">
                    <Typography component="h5" variant="h5">{title}</Typography>
                    <Typography color="textSecondary" variant="subtitle1">{artist}</Typography>
                    <div>
                        <IconButton onClick={handlePlayPause}>
                            {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <IconButton onClick={handleSkip}>
                            <SkipNextIcon />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    );
}

// ✅ Add PropTypes for validation
MusicPlayer.propTypes = {
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    is_playing: PropTypes.bool.isRequired,
};

export default MusicPlayer;
