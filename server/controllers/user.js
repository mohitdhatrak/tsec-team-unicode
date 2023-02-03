const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

const User = require("../models/user.model");
const nodemailer = require("nodemailer");
app.use(express.json());
const generateOtp = require("../utils/otp");
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

const SecretKey = process.env.SECRET_KEY;
const geocoder_api_key = process.env.GEOCODER_API_KEY;

const newUser = async (req, res) => {
    const { username, password, email, pincode, mobile } = req.body;
    if (!username || !password || !email || !pincode || !mobile)
        return res
            .status(400)
            .json({ message: "Please fill the necessary details " });
    const user = new User(req.body);
    try {
        await user.save();
        var mailOptions = {
            from: "try.user99@gmail.com",
            to: user.email,
            subject: "Succesfully Registered",
            text: "Your account has been created successfully, we hope you enjoy your stay!",
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
        res.status(200).json({ message: "Success", userId: user._id });
    } catch (error) {
        res.status(500).json({
            message:
                error.message || "There was some error while authentication",
        });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Please Fill the Details" });
    try {
        const userData = await User.findOne({ email: req.body.email });
        if (!userData)
            return res.status(400).json({ message: "User not found" });
        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        );
        if (!userData || !validPassword)
            res.status(400).json({ message: "Invalid credentials" });
        else {
            const token = jwt.sign({ email: req.body.email }, SecretKey);
            res.cookie("jsonwebtoken", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            return res
                .status(200)
                .json({ message: "Login Successful", userId: userData._id });
        }
    } catch (error) {
        res.status(404).json({
            message:
                error.message || "There was some error while authentication",
        });
    }
};

const forgotPass = async (req, res) => {
    const { email } = req.body;
    if (!req.body.email)
        return res
            .status(400)
            .json({ message: "Please provide registered emailId" });
    try {
        const userData = await User.findOne({ email: req.body.email });
        if (!userData)
            return res.status(400).json({ message: "no user found" });
        const otp = generateOtp();
        await User.findByIdAndUpdate(userData._id, { otp: otp });
        var mailOptions = {
            from: "try.user99@gmail.com",
            to: userData.email,
            subject: "OTP for your account at Thrarther",
            text: `OTP to reset password is ${otp}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
        res.status(200).json({ message: "OTP sent on registered email" });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const userData = await User.findOne({ email: email });
        if (!otp) res.status(400).json({ error: "pls enter otp!!!" });
        else if (otp == userData.otp) {
            userData.password = "";
            return res.status(200).json({ message: "otp verified" });
        } else {
            return res.status(400).json({ message: "invalid otp" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const newPass = async (req, res) => {
    try {
        const { password, cpassword, email } = req.body;
        const userData = await User.findOne({ email: email });
        if (!password || !cpassword)
            return res.status(400).json({ message: "pls enter details" });
        if (password != cpassword)
            return res
                .status(400)
                .json({ message: "password and confirm password dont match" });
        userData.password = password;
        await userData.save();
        res.status(200).json({ message: "password updated" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const logout = async (req, res) => {
    res.clearCookie("jsonwebtoken", { path: "/" });
    res.status(200).json({ message: "User logged out successfully" });
};

const distance = async (req, res) => {
    const lat = req.userData.location.coordinates[0];
    const lng = req.userData.location.coordinates[1];
    const users = await User.find();

    const filteredUsers = users.filter((user) => {
        const distance = calculateDistance(
            req.userData.lat,
            req.userData.lng,
            user.lat,
            user.lng
        );
        return distance <= 5;
    });

    // Return the filtered users
    return res.json(filteredUsers);
};

function calculateDistance(lat1, lng1, lat2, lng2) {
    const earthRadius = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
}

const userPage = async (req, res) => {
    res.status(200).json(req.userData);
};
module.exports = {
    newUser,
    userLogin,
    forgotPass,
    verifyOtp,
    newPass,
    logout,
    distance,
    userPage,
};
