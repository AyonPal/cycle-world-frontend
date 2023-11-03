import React, { useState, useEffect } from 'react';
import API from '../api';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Alert, Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Calculate() {
    const [destination, setDestination] = useState('');
    const [speed, setSpeed] = useState('');
    const [daily_cycle, setDailyCycle] = useState('');
    const [error, setError] = useState('');
    const [days, setDays] = useState(0);
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    const [spotList, setSpotList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const response = await API.get('/spots');
                setSpotList(response.data.data.spots);
            } catch (error) {
                console.error('Error fetching data list:', error);
            }
        };

        fetchSpots();
        getUserLocation()
    }, []);
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error getting location', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setDays(0)
        try {
            const response = await API.post('/calculate', { userLat: location.latitude, userLon: location.longitude, speed, daily_cycle, spotId: destination });
            console.log(response)
            if (response.data.error) {
                setError(response.data.error)
            }
            else {
                setError('')
            }

        } catch (err) {
            console.log(err)
            setError('Some error Occured')
        }
    };
    const handleEstimate = async (event) => {
        event.preventDefault();
        setDays(0)
        try {
            const response = await API.get('/estimate');
            if (response.data.error) {
                setError(response.data.error)
            }
            else {
                setError('')
                setDays(response.data.data.days)
            }

        } catch (err) {
            console.log(err)
            setError('Some error Occured')
        }
    };

    return (
        <>
            <List>
                {spotList.map((data) => (
                    <ListItem key={data.id} button onClick={() => navigate(`/details/${data.name}`)}>
                        <ListItemText primary={data.name} />
                    </ListItem>
                ))}
            </List>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="spot-label">Select Destination</InputLabel>
                    <Select
                        labelId="spot-label"
                        id="spot"
                        value={destination}
                        label="Select Destination"
                        onChange={(e) => setDestination(e.target.value)}
                    >
                        {spotList.map((data) => (
                            <MenuItem key={data.id} value={data.id}>
                                {data.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Speed"
                        type="number"
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Cycling per Day (in h)"
                        type="number"
                        value={daily_cycle}
                        onChange={(e) => setDailyCycle(e.target.value)}
                    />
                </FormControl>
                {error ? <Alert severity="error" color="error">
                    {error}
                </Alert> : null}
                {days ? <Alert severity="success" color="success">
                    {`It will take ${days} day(s) to reach Destination`}
                </Alert> : null}

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}
                >
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                    <Button type="button" onClick={handleEstimate} variant="contained" color="secondary">
                        Estimate
                    </Button>
                </Box>
            </form>
        </>
    );
}

export default Calculate;
