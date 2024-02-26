const express = require("express");
const router = express.Router();

const{LogIn, SignUp, sendOTP, ChangePassword} = require("../controllers/Auth");

const{resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");

const{auth} = require("../middlewares/auth");

router.post("/login", LogIn);

router.post("/signup", SignUp);

router.post("/sendOtp", sendOTP);


// Route for Changing the password
router.post("/changepassword", auth, ChangePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router;