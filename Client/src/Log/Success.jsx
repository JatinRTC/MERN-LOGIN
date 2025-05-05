import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Success = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/dashboard');
    }

    const handlewatchlist = () => {
        navigate('/watchlist');
    }

    const handleLogout = () => {
        navigate('/');
    }
    const handleHome = () => {
        navigate('/home');
    }

    return (
        <Container sx={{
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt:2,
            }}>
                    <Typography variant="h2" color="text.secondary">VILLEN</Typography>
                    <Stack sx={{ display: 'inline'}}>
                    <Button variant="outlined" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handleHome}>Home</Button>
                    <Button variant="outlined" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handlewatchlist} >User Info</Button>
                    <Button variant="outlined" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handleClick}>Dashboard</Button>
                    <Button variant="contained" color="success" sx={{  fontSize: 'large' }} onClick={handleLogout}>LogOut</Button>
                    </Stack>
            </Box>

            <Box sx={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '65vh',
                }
            }>
                <Stack sx={{ display: 'flex', direction: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h4" color="success"> Login Page Success !!!</Typography>
                    <Typography variant="h6" color="text.secondary"> You have successfully completed the process. Great job!</Typography>
                </Stack >
            </Box>
        </Container>
    )
}

export default Success;

