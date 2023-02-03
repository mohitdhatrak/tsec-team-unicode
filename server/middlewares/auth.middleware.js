const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jsonwebtoken;
        if (!token) {
            throw new Error("Login first");
        }
        //verify returns our decrypted payload
        const decryptedPayload = jwt.verify(token, process.env.SECRET_KEY);
        //A.B is how you access an array A of objects B
        const userData = await User.findOne({ email: decryptedPayload.email });
        if (!userData) {
            throw new Error("user not found");
        }
        //setting our req parameters which can be accessed as and when needed later
        req.userData = userData;
        next();
    } catch (err) {
        res.status(401).json({ error: "Authorization not given" });
    }
};

module.exports = authenticate;
