import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../components/Navbar";
import { validateForm } from "../../utils/validateForm";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export function NewPassword() {
    const [feedback, setFeedback] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevents page refresh

        const formData = new FormData(event.currentTarget);
        const password = formData.get("password");
        const cPassword = formData.get("confirmPassword");

        if (password?.trim() === "" || cPassword?.trim() === "") {
            setFeedback("Please fill all compulsory fields!");
        } else if (password !== cPassword) {
            setFeedback("Passwords do not match!");
        } else {
            // frontend validation done, all fields are valid, do further process here

            try {
                const {
                    data: { message },
                } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/user/newPass`,
                    {
                        email: location.state,
                        password,
                        cPassword,
                    },
                    { withCredentials: true }
                );

                // setFeedback(message);
                if (message === "password updated") {
                    // save the user to global state here, (useContext, useReducer)
                    navigate("/login");
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
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        New password
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            mt: 3,
                            width: "80%",
                        }}
                    >
                        <FormControl
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                name="password"
                                label="Password"
                                onChange={() => setFeedback("")}
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showConfirmPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={
                                                handleClickShowConfirmPassword
                                            }
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                name="confirmPassword"
                                label="Confirm Password"
                                onChange={() => setFeedback("")}
                            />
                        </FormControl>
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
                                Set password
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
