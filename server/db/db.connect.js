const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
    try {
        const connection = await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        if (connection) {
            console.log("Successfully connected to the database");
        }
    } catch (error) {
        console.error("Mongoose connection failed", error);
    }
};

module.exports = { connectToMongoDB };
