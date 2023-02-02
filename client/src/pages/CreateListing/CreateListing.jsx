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

export function CreateListing() {
  const [errorForFile, setErrorForFile] = useState(" ");
  const imageUrls = []

  const validateFileType = (event) => {
    for (var i = 0; i < event.target.files.length; i++) {
      var filename = event.target.files[i].name;
      var extensionName =
        filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
        filename;
      if (extensionName != "jpg" && extensionName != "png") {
        //toastify error
        setErrorForFile("");
        console.log("qwqwe")
        break;
      } else if (false) {
        
      } else {
        setErrorForFile(event.target.files.length + " files selected");
      }
    }
  };

  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    var imageFiles = document.getElementById("image");

    for (const file of imageFiles.files) {
        var formDataa = new FormData();
        formDataa.append("file", file)
        formDataa.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET)
  
        const url = "https://api.cloudinary.com/v1_1/" + process.env.REACT_APP_CLOUD_NAME + "/image/upload"
        const resp = await fetch(url,
          {
            method: "POST",
            body: formDataa
          })
  
        if (resp.status === 200) {
          const respInJSON = await resp.json()
          const url = respInJSON.secure_url
          console.log(url)
          imageUrls.push(url)
        } else {
          alert("There was an error in uploading the iamge please try again!")
          return;
        }
      }
  
    
    
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const image = formData.get("image");
    const rules = formData.get("rules");
    const location = formData.get("location");
    const beginDate = formData.get("beginDate");
    const endDate = formData.get("endDate");
    const transport = formData.get("transport");
    const ammenities = formData.get("ammenities");
    
    
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover
        theme="dark"
        pauseOnFocusLoss
      />
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
            Rental details
          </Typography>
          <Box
            component="form"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              onChange={() => setFeedback("")}
              autoFocus
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price per night"
              name="price"
              onChange={() => setFeedback("")}
            />
            <div className="parent">
              <label htmlFor="image" id="vohvalalabel">
                {" "}
                Upload image(s) of product(s){" "}
              </label>
              <input
                onChange={validateFileType}
                type="file"
                accept="image/png,image/jpeg"
                multiple
                id="image"
                name="image"
              ></input>
              <span
                className="Error"
                dangerouslySetInnerHTML={{ __html: errorForFile }}
              ></span>
            </div>
            <MultipleCheckbox purpose="rules" label="Rules" />
            <FormHelperText id="component-helper-text" sx={{ ml: 1, mb: -1 }}>
              Add other rules, separate by comma
            </FormHelperText>
            <TextField
              margin="normal"
              fullWidth
              id="otherRules"
              label="Other rules"
              name="otherRules"
              onChange={() => setFeedback("")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              onChange={() => setFeedback("")}
            />
            {/* availability dates */}
            <FormHelperText id="component-helper-text" sx={{ ml: 1, mb: -1 }}>
              Available from date
            </FormHelperText>
            <TextField
              margin="normal"
              required
              fullWidth
              type="date"
              id="beginDate"
              name="beginDate"
              onChange={() => setFeedback("")}
            />
            <FormHelperText id="component-helper-text" sx={{ ml: 1, mb: -1 }}>
              Available till date
            </FormHelperText>
            <TextField
              margin="normal"
              required
              fullWidth
              type="date"
              id="endDate"
              name="endDate"
              onChange={() => setFeedback("")}
            />
            <FormHelperText id="component-helper-text" sx={{ ml: 1, mb: -1 }}>
              How can I get there?
            </FormHelperText>
            <MultipleCheckbox purpose="transport" label="Transport" />
            <MultipleCheckbox purpose="ammenities" label="Ammenities" />
            <Stack spacing={2} alignItems="center" sx={{ mb: 10 }}>
              {feedback === "" ? (
                ""
              ) : (
                <Typography variant="body1" sx={{ mt: 1, color: "red" }}>
                  {feedback}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                className="primary-btn"
              >
                List rental
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
}
