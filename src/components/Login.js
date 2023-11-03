import React, { useState } from 'react';
import { TextField, Button, Alert, FormControl, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await API.post('/auth', { username, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/');

            } else {
                setError(response.data.error)
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <FormControl fullWidth margin='normal'>
                <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

            </FormControl>
            <FormControl fullWidth margin='normal'>

                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            {error ? <Alert severity="error" color="error">
                {error}
            </Alert> : null}
            <Box sx={{ display: "flex", justifyContent: 'center' }}>

                <Button type="submit">Login</Button>
            </Box>
        </form>
    );
}

export default Login;
