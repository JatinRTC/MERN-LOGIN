import React, { useState } from 'react';
import { Box, Typography, Stack, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/login', { email, password });
            const { status, email: userEmail } = res.data;

            if (status === 'exist') {
                localStorage.setItem('userEmail', userEmail);
                navigate('/success');
            } else if (status === 'notexist') {
                alert("User not found!");
            } else if (status === 'wrongpassword') {
                alert("Incorrect password!");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong during login.");
        }

    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
            <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3, textAlign: 'center' }}>
                <Typography variant="h4" color="info.main" fontWeight="bold" gutterBottom>
                    LOGIN FORM
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Please fill in this form to login.
                </Typography>

                <form onSubmit={handleLogin}>
                    <Stack spacing={2} mt={2}>
                        <TextField
                            label="Email"
                            type="email"
                            variant="filled"
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="filled"
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            variant="contained"
                            color="info"
                            sx={{ fontSize: 'large' }}
                            type="submit" 
                            fullWidth
                        >
                            Login
                        </Button>
                    </Stack>
                </form>

                <Stack direction="row" justifyContent="space-between" mt={2}>
                    <Button variant="text" color="success" onClick={() => navigate('/registor')}>
                        Create an Account
                    </Button>
                    <Button variant="text" color="error">Forgot Password?</Button>
                </Stack>
            </Paper>
        </Box>

    );
};

export default Login;
