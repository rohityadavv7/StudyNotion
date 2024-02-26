const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth")

const {updateProfile, getAllUserDetails, updateDisplayPicture,
     getEnrolledCourses, deleteAccount } = require("../controllers/Profile");


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateProfilePicture", auth, updateDisplayPicture)

module.exports = router;