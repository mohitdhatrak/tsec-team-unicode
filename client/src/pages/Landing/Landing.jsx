import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Navbar } from "../../components/Navbar";
import "./Landing.css";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useApp } from "../../context/app-context";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../utils/validateForm";
import axios from "axios";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 4 }}
            {...props}
        >
            {"Copyright © "}
            <Link
                color="inherit"
                href="https://github.com/mohitdhatrak/tsec-team-unicode"
            >
                Thrarter
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export function Landing() {
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

            <Grid
                container
                component="main"
                sx={{
                    height: "91.8vh",
                    backgroundColor: "#000000",
                }}
            >
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="logo"
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
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
                            sx={{ mt: 1, width: "80%" }}
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
                                                onClick={
                                                    handleClickShowPassword
                                                }
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
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
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
                                    <Link
                                        href="/forgot-password"
                                        variant="body2"
                                    >
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
                        <Copyright />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
