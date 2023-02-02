import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "./context/app-context";

const theme = createTheme({
    palette: {
        primary: { main: "#000", contrastText: "#33eaff" },
        // secondary: cyan,
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <AppProvider>
                <Router>
                    <CssBaseline />
                    <App />
                </Router>
            </AppProvider>
        </ThemeProvider>
    </React.StrictMode>
);
