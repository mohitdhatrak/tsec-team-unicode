import { Box, Container } from "@mui/system";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const buttonStyle = { margin: "20px auto", borderRadius: 10, padding: 150 };

export function Home() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    return (
        <>
            <Container component="main" maxWidth="ms">
                <Box
                    sx={{
                        marginTop: 22,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                    }}
                >
                    <Link to="/view-listing">
                        <Button variant="contained" style={buttonStyle}>
                            <h1>Buy</h1>
                        </Button>
                    </Link>
                    <Link to="/create-listing">
                        <Button variant="contained" style={buttonStyle}>
                            <h1>Sell</h1>
                        </Button>
                    </Link>
                </Box>
            </Container>
        </>
    );
}
