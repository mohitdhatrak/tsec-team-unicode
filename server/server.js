const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const user = require("./routes/user.routes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { connectToMongoDB } = require("./db/db.connect");
const product = require("./routes/product.route");

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const whitelist = ["https://thrarter.netlify.app/"];

const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
    credentials: true,
};

if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: true, credentials: true }));
} else {
    app.use(cors(corsOptions));
}

connectToMongoDB();

app.use("/user", user);
app.use("/product", product);
app.use((req, res, next) => {
    res.status(404).json({
        error: "not found",
    });
});

module.exports = app;

app.listen(5000, () => console.log("server listening on 5000"));
