import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Stack,
    Typography,
    Paper,
    Checkbox
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import PaidIcon from '@mui/icons-material/Paid';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    pancard: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format")
        .required("PAN card is required"),
    upiId: Yup.string()
        .matches(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format")
        .required("UPI ID is required"),
});

const PayloadDialogForm = () => {
    const [open, setOpen] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [isDisabled, setisDisabled] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            pancard: "",
            upiId: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setSubmitted(true);

            try {
                await axios.post('http://localhost:5000/congrats', {
                    Username: values.name,
                    Pancard: values.pancard,
                    UpiId: values.upiId,
                });

                setTimeout(() => {
                    resetForm();
                    setSubmitted(false);
                    setOpen(false);
                    navigate('/dashboard');
                }, 8000);
            } catch (error) {
                console.error('Error submitting details:', error);
            }
        },
    });

    const handleClose = () => {
        navigate('/dashboard');
    };

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    backgroundColor: submitted ? "#000" : undefined,
                },
            }}
            BackdropProps={{
                sx: {
                    backgroundColor: submitted ? "#000" : "rgb(26, 25, 25)",
                },
            }}
        >
            {!submitted ? (
                <>
                    <DialogTitle variant="h5" sx={{ backgroundColor: "#1e1e1e", color: "white ", fontWeight: 'bold', textAlign: "center" }}>
                        <PaidIcon sx={{ fontSize: 23, color: "lightgreen", mr: 0.7 }} />
                        Payout
                    </DialogTitle>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ backgroundColor: "#121212", p: 3, boxShadow: "0 0 20px 5px rgba(0, 255, 0, 0.6)"}}>
                            <DialogContent>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Name"
                                    name="name"
                                    color="success"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    InputLabelProps={{ style: { color: "white" } }}
                                    InputProps={{
                                        style: { color: "#fff" },
                                        sx: {
                                            '& fieldset': { borderColor: "lightgreen" },
                                            '&:hover fieldset': { borderColor: "green" },
                                            '&.Mui-focused fieldset': { borderColor: "green" }
                                        }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="PAN Card"
                                    name="pancard"
                                    color="success"
                                    value={formik.values.pancard}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.pancard && Boolean(formik.errors.pancard)}
                                    helperText={formik.touched.pancard && formik.errors.pancard}
                                    InputLabelProps={{ style: { color: "white" } }}
                                    InputProps={{
                                        style: { color: "#fff" },
                                        sx: {
                                            '& fieldset': { borderColor: "lightgreen" },
                                            '&:hover fieldset': { borderColor: "green" },
                                            '&.Mui-focused fieldset': { borderColor: "green" }
                                        }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="UPI ID"
                                    color="success"
                                    name="upiId"
                                    value={formik.values.upiId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.upiId && Boolean(formik.errors.upiId)}
                                    helperText={formik.touched.upiId && formik.errors.upiId}
                                    InputLabelProps={{ style: { color: "white" } }}
                                    InputProps={{
                                        style: { color: "#fff" },
                                        sx: {
                                            '& fieldset': { borderColor: "lightgreen" },
                                            '&:hover fieldset': { borderColor: "green" },
                                            '&.Mui-focused fieldset': { borderColor: "green" }
                                        }
                                    }}
                                />
                                <Stack display="flex" direction="row" alignItems="center" onClick={() => setisDisabled(!isDisabled)}>
                                    <Checkbox defaultChecked sx={{ color: "lightgreen" }} />
                                    <Typography variant="body2" color="#ffffff">
                                        I agree to the Terms and Conditions
                                    </Typography>
                                </Stack>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" sx={{ backgroundColor: "#c62828", "&:hover": { backgroundColor: "#b71c1c" } }} onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" sx={{ backgroundColor: "green", "&:hover": { backgroundColor: "#2e7d32" } }} disabled={isDisabled}>
                                    Submit
                                </Button>
                            </DialogActions>
                        </Box>
                    </form>
                </>
            ) : (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10 }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            p: 4,
                            backgroundColor: "#1e1e1e",
                            borderRadius: 3,
                            textAlign: "center",
                            color: "lightgreen",
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            🎉 Congratulations!
                        </Typography>
                        <Typography variant="body1">
                            Your Details has been successfully submitted.
                        </Typography>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ marginTop: "20px", fontSize: "2rem" }}
                        >
                            💸
                        </motion.div>
                    </Paper>
                </motion.div>
            )}
        </Dialog>
    );
};

export default PayloadDialogForm;
