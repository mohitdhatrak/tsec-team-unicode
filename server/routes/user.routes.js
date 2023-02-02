const express = require("express");
const router = new express.Router();

const {
    newUser,
    userLogin,
    forgotPass,
    verifyOtp,
    newPass,
} = require("../controllers/user");

router.post("/newUser", newUser);
router.post("/userLogin", userLogin);
router.post("/forgotPass", forgotPass);
router.post("/verifyOtp", verifyOtp);
router.post("/newPass", newPass);

module.exports = router;
