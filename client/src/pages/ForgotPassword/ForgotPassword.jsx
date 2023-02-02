import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../components/Navbar";
import { validateForm } from "../../utils/validateForm";

export function ForgotPassword() {
    const [feedback, setFeedback] = useState("");
    const [sendOtp, setSendOtp] = useState(true);

    const navigate = useNavigate();

    const handleSend = async (event) => {
        event.preventDefault(); // prevents page refresh

        const formData = new FormData(event.currentTarget);

        const isValid = validateForm(formData, setFeedback, "login");

        if (isValid) {
            // frontend validation done, all fields are valid, do further process here

            try {
                const {
                    data: { userId, role, message },
                } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/sendOtp`,
                    {
                        email: formData.get("email"),
                        password: formData.get("password"),
                    },
                    { withCredentials: true }
                );

                // setFeedback(message);
                if (userId) {
                    // save the user to global state here, (useContext, useReducer)
                    setSendOtp(true);
                }
            } catch (error) {
                // console.log(error.response.data.message);
                setFeedback(error.response?.data.message);
            }
        }
    };

    const handleVerify = async (event) => {
        event.preventDefault(); // prevents page refresh

        const formData = new FormData(event.currentTarget);

        const isValid = validateForm(formData, setFeedback, "login");

        if (isValid) {
            // frontend validation done, all fields are valid, do further process here

            try {
                const {
                    data: { userId, role, message },
                } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/verifyOtp`,
                    {
                        email: formData.get("email"),
                        password: formData.get("password"),
                    },
                    { withCredentials: true }
                );

                // setFeedback(message);
                if (userId) {
                    // save the user to global state here, (useContext, useReducer)
                    navigate("/new-password");
                }
            } catch (error) {
                // console.log(error.response.data.message);
                setFeedback(error.response?.data.message);
            }
        }
    };

    return (
        <>
            <Navbar />

            <Container component="main" maxWidth="xs">
                {sendOtp ? (
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Forgot password
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleVerify}
                            noValidate
                            sx={{
                                mt: 3,
                                width: "80%",
                            }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="otp"
                                label="Enter OTP"
                                name="otp"
                                autoFocus
                                onChange={() => setFeedback("")}
                            />
                            <Stack spacing={2} alignItems="center">
                                {feedback === "" ? (
                                    ""
                                ) : (
                                    <Typography
                                        variant="body1"
                                        sx={{ mt: 1, color: "red" }}
                                    >
                                        {feedback}
                                    </Typography>
                                )}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2 }}
                                    className="primary-btn"
                                >
                                    Verify OTP
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Forgot password
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSend}
                            noValidate
                            sx={{
                                mt: 3,
                                width: "80%",
                            }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={() => setFeedback("")}
                            />
                            <Stack spacing={2} alignItems="center">
                                {feedback === "" ? (
                                    ""
                                ) : (
                                    <Typography
                                        variant="body1"
                                        sx={{ mt: 1, color: "red" }}
                                    >
                                        {feedback}
                                    </Typography>
                                )}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    className="primary-btn"
                                >
                                    Send OTP
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                )}
            </Container>
        </>
    );
}
