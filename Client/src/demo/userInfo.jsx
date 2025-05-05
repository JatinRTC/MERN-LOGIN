import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Stack,
    TableContainer,
    TableHead,
    TableRow,
    Table,
    Typography,
    TextField,
    TableCell,
    TableBody,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Watchlist = () => {
    const [data, setData] = useState([]);
    const [balance, setBalance] = useState({});
    const [enabledMap, setEnabledMap] = useState({});
    const navigate = useNavigate();
    const loggedInEmail = localStorage.getItem('userEmail');

    const handleClick = () => navigate('/dashboard');
    const handleWatchlist = () => navigate('/watchlist');
    const handleHome = () => navigate('/home');
    const handleLogout = () => navigate('/');

    // Fetch user data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/signup');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching signup data:', error);
            }
        };

        fetchData();
    }, []);

    // Fetch enable states from MongoDB
    useEffect(() => {
        const fetchEnableStates = async () => {
            try {
                const res = await axios.get('http://localhost:5000/payload');
                const map = {};
                res.data.forEach(item => {
                    map[item.email] = item.isEnabled;
                });
                setEnabledMap(map);
            } catch (err) {
                console.error('Error fetching enabled states:', err);
            }
        };

        fetchEnableStates();
    }, []);

    // Toggle enable state
    const handleEnableClick = async (email) => {
        const newState = !enabledMap[email];

        try {
            const res = await axios.post('http://localhost:5000/payload', {
                email,
                isEnabled: newState,
            });

            if (res.data.message === 'Status updated') {
                setEnabledMap(prev => ({ ...prev, [email]: newState }));
            }
        } catch (err) {
            console.error('Error updating enable state:', err);
        }
    };

    const handleSubmit = async (email) => {
        if (email !== loggedInEmail) return;

        try {
            const res = await axios.post('http://localhost:5000/balance', {
                email,
                balance: balance[email]
            });

            if (res.data === 'balanceUpdated') {
                navigate('/dashboard');
            } else if (res.data === 'exist') {
                alert('Balance already exists for this user!');
            } else {
                alert('Failed to add balance.');
            }
        } catch (err) {
            console.error(err);
            alert('Error connecting to MongoDB');
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2 }}>
                <Typography variant="h2" color="text.secondary">VILLEN</Typography>
                <Stack sx={{ display: 'inline' }}>
                    <Button variant="outlined" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handleHome}>Home</Button>
                    <Button variant="outlined" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handleWatchlist}>User Info</Button>
                    <Button variant="outlined" color="success" sx={{ mr: 2, fontSize: 'large' }} onClick={handleClick}>Dashboard</Button>

                    <Button variant="contained" color="success" sx={{ fontSize: 'large' }} onClick={handleLogout}>LogOut</Button>
                </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}>
                <TableContainer sx={{ padding: '30px', overflow: 'auto' }}>
                    <Table>
                        <TableHead>
                            {['Sno.', 'Full Name', 'Email', 'AadharCard', 'Pancard', 'Password', 'Value', 'Enable/Disable', 'AddValue'].map((header) => (
                                <TableCell
                                    key={header}
                                    align="center"
                                    sx={{ fontWeight: 'bold', border: '1px solid grey', fontSize: 'large' }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell align="center" sx={{ border: '1px solid grey' }}>{index + 1}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid grey' }}>{item.fullname}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid grey' }}>{item.email}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid grey' }}>{item.aadharcard}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid grey' }}>{item.pancard}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid grey' }}>{item.password}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid grey' }}>
                                        <TextField
                                            type="number"
                                            sx={{ fontSize: 'large', p: 1, width: '100px' }}
                                            value={balance[item.email] || ''}
                                            onChange={(e) =>
                                                setBalance({ ...balance, [item.email]: e.target.value })
                                            }
                                        />
                                    </TableCell>

                                    <TableCell align="center" sx={{ border: '1px solid grey' }}>
                                        <Button
                                            variant="contained"
                                            sx={{ fontSize: 'large' }}
                                            color={enabledMap[item.email] ? "error" : "success"}
                                            onClick={() => handleEnableClick(item.email)}
                                        >
                                            {enabledMap[item.email] ? 'Disable' : 'Enable'}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid grey' }}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{ fontSize: 'large' }}
                                            onClick={() => handleSubmit(item.email)}
                                        >
                                            Add Value
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default Watchlist;
