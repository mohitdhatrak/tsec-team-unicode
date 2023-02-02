const express = require("express");
const router = new express.Router();

const {
    newUser,
    userLogin,
    forgotPass,
    verifyOtp,
    newPass,
    logout,
    distance,
    userPage
} = require("../controllers/user");
const authenticate=require('../middlewares/auth.middleware')
router.post("/newUser", newUser);
router.post("/userLogin", userLogin);
router.post("/forgotPass", forgotPass);
router.post("/verifyOtp", verifyOtp);
router.post("/newPass", newPass);
router.get('/logout',logout)
router.get('/distance',authenticate,distance)
router.get('/userPage',authenticate,userPage)
module.exports = router;
