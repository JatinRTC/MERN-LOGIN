import React, { useState , useEffect } from 'react';
import { Box, TextField, Button, Stack, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    fullname: "",
    aadharcard: "",
    email: "",
    pancard: "",
    password: "",
};

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem('formdata');
        if (savedData) {
          setFormData(JSON.parse(savedData));
        }
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);
    
        localStorage.setItem('formdata', JSON.stringify(updatedData));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/signup', formData);
            if (res.data === 'exist') {
                alert('User already exists');
            } else if (res.data === 'notexist') {
                setOpen(true);
                setTimeout(() => navigate('/'), 1500);
            }
        } catch (err) {
            console.error(err);
            alert('Connect Mongodb to creating account');
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
            <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
                <Typography variant="h4" color="success.main" fontWeight="bold" textAlign={'center'} gutterBottom>
                    SIGN UP
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            name="fullname"
                            label="Fullname"
                            type="text"
                            color="success"
                            fullWidth
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="aadharcard"
                            label="Aadharcard"
                            type="number"
                            color="success"
                            fullWidth
                            value={formData.aadharcard}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            color="success"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="pancard"
                            label="Pancard"
                            type="text"
                            color="success"
                            fullWidth
                            value={formData.pancard}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            color="success"
                            fullWidth
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <Button variant="contained" color="success" type="submit">Sign Up</Button>
                        <Button variant="text" onClick={() => navigate('/')}>Already have an account?</Button>
                    </Stack>
                </form>
            </Paper>
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert severity="success" onClose={() => setOpen(false)}>Successfully Signed Up!</Alert>
            </Snackbar>
        </Box>
    );
};

export default Signup;