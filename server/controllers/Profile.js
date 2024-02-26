const User = require("../models/User");
const Profile = require("../models/Profile");
const {uploadMediaToCloudinary} = require("../utils/UploadMedia")


//update Profile(additionalDetails add krni h User m)
exports.updateProfile =  async(req,res) => {
    try{
        //data leke ao
        const {gender , contactNumber, about = "", dateOfBirth = ""} = req.body;

        //user ki id leke ao
        const UserId = req.user.id;

        //validation
        if(!dateOfBirth || !contactNumber){
            return res.status(401).json({
                success:false,
                message:"All details Mendatory"
            })
        }

        //user id se Profile ID ( additionalDetails ki ID ) leke ao
        const userDetails = await User.findById(UserId);
        const profileId = userDetails.additionalDetails;

        //Uss ID k coressponding Profile find kro
        const profileDetails =  await Profile.findById(profileId);

        //Update kro
        profileDetails.gender = gender;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;

        //Save kro
        profileDetails.save();

        console.log(profileDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Profile Details Updtaed Successfully!!"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Profile details could not be updated!",
            message:error.message
        })
    }
}

//deleteProfile
exports.deleteAccount = async(req,res) => {
    try{
        //Id leke ao
        const UserId = req.user.id;

        //find by id and delete lgado
        await User.findByIdAndDelete(UserId);

        //return response
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully!!"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User could not be deleted, Please try again!"
        })
    }
}

//get All User Data
exports.getAllUserDetails = async(req,res) => {
    try{
        //Id leke ao
        const UserId = req.user.id;
        console.log(UserId);
        //find by Id lgado
        const allUserDetails = await User.findById({UserId})
                                .populate("additionalDetails").exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"All User Details fetched Successfully!",
            allUserDetails
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User Details could not be Fetched, Please try again!"
        })
    }
}

//update Profile Picture
exports.updateDisplayPicture = async (req, res) => {

    try {
      console.log("Updating Profile Picture");

      const displayPicture = req.files.displayPicture;

      const userId = req.user.id;
      console.log(userId);

      const image = await uploadMediaToCloudinary(
        displayPicture,
        "StudyNotion",
      )
      console.log("Uploaded")
      console.log(image);

      const updatedProfile = await User.findByIdAndUpdate(
        {_id: userId },
        { image: image.secure_url },
        { new: true }
      )

      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "cannot upload Image",
        error:error.message
      })
    }
}; 

//get enrolled Courses
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id;
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};