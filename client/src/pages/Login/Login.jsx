import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Checkbox, FormControlLabel, Link, Grid } from "@mui/material";
import { Navbar } from "../../components/Navbar";
import { validateForm } from "../../utils/validateForm";
import { useApp } from "../../context/app-context";

export function Login() {
    const [feedback, setFeedback] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { setCurrentUser } = useApp();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevents page refresh

        const formData = new FormData(event.currentTarget);

        const isValid = validateForm(formData, setFeedback, "login");

        if (isValid) {
            // frontend validation done, all fields are valid, do further process here

            try {
                const {
                    data: { userId, message },
                } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/user/userLogin`,
                    {
                        email: formData.get("email"),
                        password: formData.get("password"),
                    },
                    { withCredentials: true }
                );

                // setFeedback(message);
                if (userId) {
                    // save the user to global state here, (useContext, useReducer)
                    localStorage.setItem("currentUser", JSON.stringify(userId));
                    setCurrentUser(userId);
                    navigate("/home");
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
                        Log in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
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
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
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
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
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
                                Log In
                            </Button>
                        </Stack>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgot-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
