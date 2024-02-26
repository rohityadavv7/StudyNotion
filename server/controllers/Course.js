const User = require("../models/User");
const Category = require("../models/Category");
const { uploadMediaToCloudinary } = require("../utils/UploadMedia");
const Course = require("../models/Course");

//Create Course
exports.createCourse = async(req,res) => {
    try{

        //data le ao
        console.log("Hello");
        const {courseName, 
            courseDescription, 
            whatWillYouLearn,
            price, 
            tag,
            category,
            status,
            instructions} = req.body;
        
        //file le ao
        const thumbnail = req.files.thumbnailImage;

        // console.log(req.user);

        //valiation
        if(!courseName || !courseDescription || !whatWillYouLearn
            || !price || !tag || !category ){
                return res.status(401).json({
                    success:false,
                    message:"All details are Mendatory!"
                })
        }
        console.log("hello guys")

        // if(!status || status === undefined){
        //     status = "Draft"
        // }
        //TODO: Verify krna h ise ek baar
        //check for Istructor
        const email = req.user.email;
        console.log(email);
        const InstructorDetails = await User.findOne({email});
        
        console.log("instructor Details -> ", InstructorDetails);

        if(!InstructorDetails){
            return res.status(401).json({
                success:false,
                message:"Intructor Details not Found!!"
            })
        }
        console.log("category->",category);
        //category to verify krlo
        const categoryDetails = await Category.findById({_id:req.body.category});

        console.log("category Details-> ",categoryDetails);

        if(!categoryDetails){
            return res.status(401).json({
                success:false,
                message:"Inavlid Category",
            })
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadMediaToCloudinary(thumbnail,process.env.FILE_NAME);

        
        console.log("creating");
        //Create an entry for course
        const newCourse = await Course.create({
            courseName:courseName,
            courseDescription:courseDescription,
            instructor:InstructorDetails._id,
            whatWillYouLearn:whatWillYouLearn,
            price:price,
            category:categoryDetails._id,
            tag:tag,
            thumbnail:thumbnailImage.secure_url,
            instructions:instructions
        });

        console.log("course Details-> ", newCourse);
        //ab Instructor k courses m ye new course add kro
        await User.findByIdAndUpdate({_id: InstructorDetails._id},{
            $push:{
                courses:newCourse._id,
            }
        },{new:true});
        
        //category wale schema ko bhi update kro
        await Category.findByIdAndUpdate({id:categoryDetails._id},{
            $push:{
                courses:newCourse._id
            }
        },{new:true});
        
        //return response
        return res.status(200).json({
            success:true,
            message:"New Course created Successfully!!"
        })
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Course could not be created!"
        })
    }
}

// show all course
exports.showAllCourses = async(req,res) => {
    try{
        //data leke ao
        const AllCourses = await Course.find({},{
            courseName:true,
            courseDescription:true,
            instructor:true,
            whatYouWillLearn:true,
            ratingAndReviews:true,
            studentsEnrolled:true
        }).populate("Instructor").exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"All courses fetched Successfully!"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Could not get all Courses, Please try again"
        })
    }
}

//get Course Details
exports.getCourseDetails = async(req,res) => {
    try{
        //course Id leke ao
        const courseId = req.body;

        //validation
        if(!courseId){
            return res.status(401).json({
                success:false,
                message:"Course Id not found"
            })
        }

        //course details nikaal lo
        const CourseDetails = await Course.findById({courseId})
                                .populate({
                                    path:"Instructor",
                                    populate:{
                                        path:"additionalDetails"
                                    }
                                })
                                .populate("Category")
                                .populate("ratingAnddReviews")
                                .populate({
                                    path:"courseContent",
                                    populate:{
                                        path:"SubSection"
                                    }
                                })
                                .exec();
                                      
        
        //validation
        if(!CourseDetails){
            return res.status(401).json({
                success:false,
                message:"Course Details not Found!"
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully!"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Course details could not be fetched!"
        })
    }
}