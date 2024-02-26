const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

//capture Payment
exports.capturePayment = async(req,res) => {
    try{
        //get userId and courseId
        const courseId = req.body; 
        const userId = req.user.id;

        //validation
        if(!userId || !courseId){
            return res.status(401).json({
                success:false,
                message:"All Details Mendatory!"
            })
        }

        //valid courseDetails
        let course;
        try{
            course = await Course.find(courseId);
            if(!course){
                return res.status(401).json({
                    success:false,
                    message:"course could not be found!"
                })
            }

            //User already enrolled or not
            const Uid = new mongoose.Types.ObjectId(userId);

            if(course.studentsEnrolled.includes(Uid)){
                return res.status(401).json({
                    success:false,
                    message:"Student already Enrolled!"
                });
            }
        }catch(error){
            return res.status(401).json({
                success:false,
                message:error.message,
            })
        }

        //Order create krdo
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount : amount*100,
            currency,
            reciept: Math.random(Date.now().toString()),
            notes:{
                courseId:courseId,
                userId,
            }
        };

        //create order ki function call
        try{
            //initiate payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
        }catch(error){
            return res.status(401).json({
                success:false,
                message:"Could not create order!"
            });
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Order created successfully",
            courseName : course.courseName,
            courseDescription : course.courseDescription,
            thumbnail : course.thumbnail,
            orderId : paymentResponse.id,
            currency : paymentResponse.currency,
            amount : paymentResponse.amount,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong, Please try again!"
        })
    }
}

//verify signature
exports.verifySignature = async(req,res) => {
    try{
        //secret key of server
        const webHookSecret = "12345678";

        //razorpay se response m se secret key nikalo
        const signature = req.headers["x-razorpay-signature"];

        //createHmac()
        const shasum = crypto.createHmac("sha256",webHookSecret);

        //update
        shasum.update(JSON.stringify(req.body));

        //digest
        const digest = shasum.digest("hex");

        //ab is digest ko signature se match kr skte h
        if(digest == signature){
            console.log("Payment is Authorized!");

            const {courseId, userId} = req.body.payload.payment.entity.notes;

            try{
                //find the course and enroll the student in it
                const enrolledCourse = await Course.findOneAndUpdate({id:courseId},{
                    $push:{
                        studentsEnrolled : userId,
                    }
                },{new:true});

                if(!enrolledCourse){
                    return res.status(401).json({
                        success:false,
                        message:"Course not Found!"
                    })
                }

                console.log(enrolledCourse);

                //find the student and add the course to their courses
                const enrolledStudent = await User.findOneAndUpdate({userId},{
                    $push:{
                        courses:courseId
                    }
                },{new:true});

                //congrates wala mail bhejo
                const mailResponse = await mailSender(
                    enrolledStudent.email,
                    "congratulations",
                    "Congratulations, you are onborded",
                );

                //response
                return res.status(200).json({
                    success:true,
                    message:"Signature Verified and Course Added",
                })
            }catch(error){
                return res.status(401).json({
                    success:false,
                    message:error.message,
                })
            }
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Invalid request!"
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong!"
        })
    }
}