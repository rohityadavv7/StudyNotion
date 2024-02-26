const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
        index:true,
    },
    Rating:{
        type:Number,
        required:true,
    },
    Review:{
        type:String,
        required:true,
        trim:true,
    }
})

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema);