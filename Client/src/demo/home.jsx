import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Image from '../TradingPhone.webp';


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
                pt: 2,
            }}>
                <Typography variant="h2" color="text.secondary">VILLEN</Typography>
                <Stack sx={{ display: 'inline' }}>
                    <Button variant="outlined" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handleHome}>Home</Button>
                    <Button variant="outlined" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handlewatchlist} >User Info</Button>
                    <Button variant="outlined" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handleClick}>Dashboard</Button>
                    <Button variant="contained" color="success" sx={{ fontSize: 'large' }} onClick={handleLogout}>LogOut</Button>
                </Stack>
            </Box>

            <hr />

            <Stack
                direction="row"
                spacing={4}
                sx={{
                    p: 3,
                }}
            >
                <Stack spacing={2} sx={{ p: 2, justifyItems: 'start' }}>
                    <Typography variant="h2" color="success.main"  >
                        Open Your
                    </Typography>
                    <Typography variant="h2" color="success.main" fontWeight={'bold'} >
                        Free Demat Account
                    </Typography>
                    <Typography variant="h5" color="text.secondary" lineHeight={2}>
                        Trade & Invest with Awesome Features!
                    </Typography>
                    <Stack direction="row" spacing={2} >
                        <Typography variant="h6" color="text.secondary" sx={{ border: '2px solid #4caf50', borderRadius: '10px', p: 2 }}>
                            <Typography component="span" variant="h3" fontWeight={'bold'}>
                                ₹0
                            </Typography>{" "}
                            Charges on Mutual Funds and IPO
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ border: '2px solid #4caf50', borderRadius: '10px', p: 2 }}>
                            <Typography component="span" variant="h3" fontWeight={'bold'}>
                                ₹20
                            </Typography>{" "}
                            Per order on Equity, F&O, Commodity and Currency
                        </Typography>

                    </Stack>
                    <Typography variant='h7' color='text.secondary'>
                        No hidden charges - ever! View all brokerage and fees upfront.
                    </Typography>

                </Stack>

                <img src={Image} alt="Trading" style={{ maxWidth: '40%', height: 'auto' }} />
            </Stack>

        </Container>
    )
}

export default Success;

