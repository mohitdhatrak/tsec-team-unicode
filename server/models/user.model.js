const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const geocoder = require("../utils/api");
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password must contain minimum 8 characters"],
        },
        email: {
            type: String,
            required: true,
            unique: [true, "This email address already exists!"],
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email-Id");
                }
            },
        },
        BuildingNo: {
            type: String,
        },
        pincode: {
            type: Number,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
            unique: [true, "mobile no. exists"],
            length: [10, "Mobile Number must be 10 digits "],
        },

        tokens: [
            {
                token: {
                    type: String,
                },
            },
        ],
        otp: {
            type: Number,
            expires: "30s",
            index: true,
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
            },
            coordinates: {
                type: [Number],
                index: "2dsphere",
            },
            formattedAddress: String,
        },
    },
    { timestamps: true }
);

userSchema.post("save", function (doc, next) {
    console.log("new User created", doc);
    next();
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 9);
    }
    const loc = await geocoder.geocode(this.pincode);
    this.location = {
        type: "Point",
        coordinates: [loc[0].latitude, loc[0].longitude],
    };
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
