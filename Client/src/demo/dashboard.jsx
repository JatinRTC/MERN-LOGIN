import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography, Card, CardContent } from '@mui/material';
import { useEffect } from 'react';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import axios from 'axios';

const Dashboard = () => {
    const [balance, setBalance] = React.useState(0);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const navigate = useNavigate();
    const email = localStorage.getItem('userEmail');
    const handleClick = () => {
        navigate('/dashboard');
    }
    const handlewatchlist = () => {
        navigate('/watchlist');
    }

    const handleHome = () => {
        navigate('/home');
    }
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const email = localStorage.getItem('userEmail');
                const response = await axios.get(`http://localhost:5000/balance?email=${email}`);
                setBalance(response.data.balance || 0);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        navigate('/');
    };

    useEffect(() => {
        const fetchEnableStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/payload`);
                const user = response.data.find(user => user.email === email);
                if (user) {
                    setIsEnabled(user.isEnabled);
                }
            } catch (error) {
                console.error('Error fetching enable status:', error);
            }
        };

        fetchEnableStatus();
    }, [email]);

    const handlePayout = () => {
        if (isEnabled) {
            navigate('/payload');
        } else {
            alert('You are not enabled for payout.');
        }
    };


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
                    <Button variant="outlined" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handlewatchlist} >User Info </Button>
                    <Button variant="outlined" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handleClick}>Dashboard</Button>
                    <Button variant="contained" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handleLogout}>LogOut</Button>

                </Stack>
            </Box><hr />

            <Box mt={6} >
                <Card
                    sx={{
                        minWidth: 100,
                        maxWidth: 350,
                        borderRadius: 3,
                        boxShadow: 4,
                        backgroundColor: '#a3c485',
                        border: '1px solid #4caf50',
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ fontWeight: 'bold', color: '#4b5f4b', mb: 2 }}
                        >
                            Account Summary 
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{ color: '#555', mt: 1 }}
                        >
                            Current Balance
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'medium',
                                color: '#2e7d32',
                            }}
                        >
                            ₹ {balance}
                        </Typography>
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            disabled={!isEnabled}
                            onClick={handlePayout}
                            sx={{ fontSize: 'large' }}
                        >
                            <PriceChangeIcon sx={{ mr: 1 }} />
                            Payout
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}

export default Dashboard;


