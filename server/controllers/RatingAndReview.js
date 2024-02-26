const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Course");
const mongoose  = require("mongoose");


//create rating and Reviews
exports.createRatingAndReviews = async(req,res) => {
    try{
        //user id leke ao
        const userId = req.user.id;
        
        //rating and reviews leke ao
        const {courseId, rating, review} = req.body;

        //check kro k user course m enrolled h k nhi
        const courseDetails = await Course.findById({courseId},{studendsEnrolled:{$elematch:{$eq:userId}}});

        if(!courseDetails){
            return res.status(401).json({
                success:false,
                message:"Student is not enrolled in course!"
            })
        }

        //check if already reviewed
        const alreadyReviewed = await RatingAndReview.findOne({
            User:userId,
            course:courseId
        })

        if(alreadyReviewed){
            return res.status(401).json({
                success:false,
                message:"Already reviewed!"
            })
        }

        //if not then create review
        const ratingAndReviews = await RatingAndReview.create({
            rating,review,
            course:courseId,
            User:userId
        })

        //update these rating and reviews in Course
        const updatedCOurse = await Course.findByIdAndUpdate({courseId},{
            $push:{
                ratingAndReviews:ratingAndReviews.id
            }
        },{new:true});

        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review Created Successfully!"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Could not create Category, Please try again!"
        })
    }
}

//get Average Rating
exports.getAverageRating = async(req,res) => {
    try{
        //data leke ao
        const{courseId} = req.body;

        //average rating leke ao
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating: {$avg: "$rating"}
                }
            }
        ])

        //return average rating as response
        if(result.length > 0){
            
            return res.status(200).json({
                success:true,
                message:result[0].averageRating,
            })
        }

        //if no rating
        return res.status(200).json({
            success:true,
            message:"Average is 0, Not Ratings Yet!",
            averageRating:0
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Average Rating could not be fetched!"
        })
    }
}

//get all Rating ans Reviews
exports.getAllRatingAndReviews = async(req,res) => {
    try{
        //get Rating and Reviews
        const allRatingAndReviews = await RatingAndReview.find({}).sort({rating:"desc"})
                                    .populate({
                                        path:"User",
                                        select:"FirstName LastName email image"
                                    })
                                    .populate({
                                        path:"Course",
                                        select:"courseName"
                                    })
                                    .exec();
        
        //return response
        return res.status(200).json({
            success:true,
            message:"All Details Fetched Successfully!"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}