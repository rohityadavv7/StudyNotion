const express = require("express")
const router = express.Router();

const {createCourse, showAllCourses, getCourseDetails} = require("../controllers/Course");

// router.post("/createCourse", createCourse);

//categories Controllers Import
const {showAllCategory,
     categoryPageDetails,
      createCategory} = require("../controllers/Category");


//Sections Controllers Import
const{
    createSection,
    updateSection,
    deleteSection
} = require("../controllers/Section");

//Sub-Section controllers Import 
const {
    createSubSection
} = require("../controllers/SubSection");


//Rating Controllers Import
const{
    createRatingAndReviews,
    getAverageRating,
    getAllRatingAndReviews
} = require("../controllers/RatingAndReview");

//Importing middlewares
const {auth, isInstructor, isStudent, isAdmin} = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************


//course can only be created by instructor
router.post("/createCourse", auth, isInstructor,createCourse);

//Add section to course
router.post("/addSection", auth,isInstructor, createSection);

//update a Section
router.post("/updateSection", auth, isInstructor, updateSection);

//delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);

//add a Sub-Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);

// //edit a Sub-Section
// router.post("/updateSubSection", auth, isInstructor, updateSubSection);

// //Delete Sub-Section
// router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

//get All Registered Courses
router.get("/getAllCourses", showAllCourses);

//get Details of a Specific Course
router.get("/getCourseDetails", getCourseDetails);


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRatingAndReviews);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingAndReviews);


module.exports = router