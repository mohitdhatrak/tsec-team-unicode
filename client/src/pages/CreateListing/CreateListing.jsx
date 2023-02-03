import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { MultipleCheckbox } from "../../components/MultipleCheckbox";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import { Navbar } from "../../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import {
    Avatar,
    FormControl,
    Grid,
    InputLabel,
    ListSubheader,
    MenuItem,
    Paper,
    Select,
    Slider,
} from "@mui/material";
import { algorithmForCost } from "../../utils/algorithmForCost";
import { useNavigate } from "react-router-dom";

export function CreateListing() {
    const [errorForFile, setErrorForFile] = useState(" ");
    const imageUrls = [];

    const validateFileType = (event) => {
        for (var i = 0; i < event.target.files.length; i++) {
            var filename = event.target.files[i].name;
            var extensionName =
                filename.substring(
                    filename.lastIndexOf(".") + 1,
                    filename.length
                ) || filename;
            if (extensionName !== "jpg" && extensionName !== "png") {
                //toastify error
                setErrorForFile("");
                console.log("qwqwe");
                break;
            } else if (false) {
            } else {
                setErrorForFile(event.target.files.length + " files selected");
            }
        }
    };

    const [feedback, setFeedback] = useState("");
    const [estimatedCost, setEstimatedCost] = useState(0);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        var imageFiles = document.getElementById("image");

        for (const file of imageFiles.files) {
            const formImage = new FormData();
            formImage.append("file", file);
            formImage.append(
                "upload_preset",
                process.env.REACT_APP_UPLOAD_PRESET
            );

            const url =
                "https://api.cloudinary.com/v1_1/" +
                process.env.REACT_APP_CLOUD_NAME +
                "/image/upload";
            const resp = await fetch(url, {
                method: "POST",
                body: formImage,
                credentials: "omit",
            });

            if (resp.status === 200) {
                const respInJSON = await resp.json();
                const url = respInJSON.secure_url;
                console.log(url);
                imageUrls.push(url);
            } else {
                alert(
                    "There was an error in uploading the iamge please try again!"
                );
                return;
            }
        }

        const formData = new FormData(event.currentTarget);

        const productName = formData.get("productName");
        const productAge = formData.get("productAge");
        const condition = formData.get("condition");
        const price = formData.get("price");
        const description = formData.get("description");

        if (productName.trim() === "" || condition.trim() === "") {
            setFeedback("Please fill all mandatory fields");
        } else {
            const value = await algorithmForCost(
                productName,
                productAge,
                condition
            );
            setEstimatedCost(value);

            try {
                const {
                    data: { message },
                } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/product/newProduct`,
                    {
                        prodName: productName,
                        yearsUsed: productAge,
                        userPrice: price,
                        description,
                        algoPrice: estimatedCost,
                        url: imageUrls,
                    },
                    { withCredentials: true }
                );

                // setFeedback(message);
                if (message === "Success") {
                    // save the user to global state here, (useContext, useReducer)
                    // localStorage.setItem("currentUser", JSON.stringify(userId));
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

            <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
                <Paper style={{ padding: 30 }}>
                    <Box
                        sx={{
                            marginTop: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <SellIcon />
                        </Avatar> */}
                        <Typography component="h1" variant="h5">
                            List Item
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="productName"
                                        required
                                        fullWidth
                                        id="ProductName"
                                        label="Product Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Category
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="category"
                                            label="Category"
                                        >
                                            <MenuItem value={10}>
                                                Electronics
                                            </MenuItem>
                                            <MenuItem value={20}>Toys</MenuItem>
                                            <MenuItem value={30}>
                                                Furniture
                                            </MenuItem>
                                            <MenuItem value={40}>
                                                Books
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography>Age of Product :</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ width: 300 }}>
                                        <Slider
                                            aria-label="Years"
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={1}
                                            max={10}
                                            name="productAge"
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="price"
                                        required
                                        fullWidth
                                        id="Price"
                                        label="Your price"
                                        onChange={() => setFeedback("")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        sx={{ minWidth: 120 }}
                                        fullWidth
                                    >
                                        <InputLabel htmlFor="grouped-select">
                                            Maintainance
                                        </InputLabel>
                                        <Select
                                            defaultValue=""
                                            id="grouped-select"
                                            label="Maintainance"
                                            name="condition"
                                        >
                                            <MenuItem value={1}>
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Flawless
                                                </span>
                                            </MenuItem>
                                            <ListSubheader>
                                                {" "}
                                                (No signs of usage)
                                            </ListSubheader>
                                            <MenuItem value={2}>
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Good
                                                </span>
                                            </MenuItem>
                                            <ListSubheader>
                                                {" "}
                                                (Normal signs of usage)
                                            </ListSubheader>
                                            <MenuItem value={3}>
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Mediocre
                                                </span>
                                            </MenuItem>
                                            <ListSubheader>
                                                {" "}
                                                (Major Scratches/Dents)
                                            </ListSubheader>
                                            <MenuItem value={4}>
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Below
                                                </span>
                                            </MenuItem>
                                            <ListSubheader>
                                                {" "}
                                                (Physcial damage)
                                            </ListSubheader>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* <Button
                                type="submit"
                                //   fullWidth
                                width="60%"
                                variant="contained"
                                color="success"
                                alignItems="center"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Our estimation
                            </Button> */}
                            <FormHelperText
                                id="component-helper-text"
                                sx={{ ml: 1, mt: 2, mb: 2, fontSize: "1rem" }}
                            >
                                Our price estimation in rupees:
                            </FormHelperText>
                            <TextField
                                id="outlined-read-only-input"
                                label="Estimated price"
                                defaultValue={0}
                                value={estimatedCost}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                minRows={3}
                                id="description"
                                label="Description"
                                name="description"
                                onChange={() => setFeedback("")}
                            />
                            <div className="parent">
                                <label htmlFor="image" id="vohvalalabel">
                                    {" "}
                                    Upload image of product
                                </label>
                                <input
                                    // onChange={validateFileType}
                                    type="file"
                                    accept="image/png,image/jpeg"
                                    // multiple
                                    id="image"
                                    name="image"
                                    // required
                                ></input>
                                <span
                                    className="Error"
                                    dangerouslySetInnerHTML={{
                                        __html: errorForFile,
                                    }}
                                ></span>
                            </div>
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
                                color="primary"
                                alignItems="center"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                List item
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item></Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}
