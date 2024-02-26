const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
require("dotenv").config();


//SEND OTP
exports.sendOTP = async(req,res) => {
    try{
        //data fetch krlo
        const {email} = req.body;
        console.log("email is-> ",email);

        //existing user check krlo (Validation)
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User Already Registered",
            })
        }

        //otp generate krlo
        var otp =  otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        console.log("OTP generated-> ",otp);

        const result = await OTP.findOne({otp : otp});

        //unique otp h k nhi , check krlo
        while(result){
            otp = otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false,
            })

            result = await OTP.findOne({otp : otp});
        }

        //OTP ki DB m entry create krlo
        const otpPayload = {
            email,otp
        }

        console.log("Payload -> ", otpPayload);

        const otpBody = await OTP.create(otpPayload);
        
        console.log("OTP body -> ",otpBody);

        //res bhejdo
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//SIGN UP
exports.SignUp = async(req,res) => {
    try{
        //data fetch krke le aao
        const{firstName, lastName,
        email,ContactNumber,password,
        confirmPassword,accountType,otp} = req.body;
        
        console.log("first");
        //validate krlo
        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(403).json({
                success:false,
                message:"Enter all Details",
            });
        }

        console.log("second");

        //compare krlo password or Confirmpassword ko
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password and Confirm Password do not match",
            })
        }

        console.log("third")
        //check for existing user
        const user = await User.findOne({email});

        if(user){
            return res.status(401).json({
                success:false,
                message:"User already registered, Please Login",
            });
        }

        //OTP leke aao DB se and then match krlo user n jo otp dala usse
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
                        
        console.log("otp is-> ",recentOtp);

        //validate krlo recent otp ko bhi
        if(recentOtp.length === 0){
            return res.status(403).json({
                success:false,
                message:"OTP Not Found",
            })
        }else if(otp !== recentOtp[0].otp){
            return res.status(401).json({
                success:false,
                message:"Invalid OTP",
            });
        }
        console.log("otp validation successfull");

        //password hash krlo
        const hashedPassword = await bcrypt.hash(password,10);


        let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        //DB m entry create krlo
        const profileDetails = await Profile.create({
            gender:null,
            about:null,
            dateOfBirth:null,
            contactNumber:null
        });

        const userDetails = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            approved: approved,
            additionalDetails:profileDetails._id,
            image:`https:api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
            // image:`https://api.dicebear.com/7.x/fun-emoji/svg`
            // image:`https://api.dicebear.com/7.x/thumbs/svg`

        })

        //response bhejdo
        return res.status(200).json({
            success:true,
            userDetails,
            message:"user Registered Successfully",
     
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User Cannot be Regisered, Please try again later",
        })

    }
}

//LOG IN
// exports.LogIn = async(req,res) => {
//     try{
//         //data fetch krke le aao
//         const {email,password} = req.body;

//         //validation lgado
//         if(!email || !password){
//             return res.status(401).json({
//                 success:false,
//                 message:"Enter all the details carefully"
//             })
//         }

//         //existing user k lie check krlo
//         const user = await User.findOne({ email }).populate("additionalDetails");
        
//         if(!user){
//             return res.status(403).json({
//                 success:false,
//                 message:"User not registered, Sign up first!!"
//             })
//         }

//         //password compare krne k baad , token generate krlo
//         if(await bcrypt.compare(password, user.password)){

//             // token generate krdo
//             const payload = {
//                 email: user.email,
//                 id: user._id,
//                 accountType : user.accountType
//             }
//             console.log(user._id);

//             const token = jwt.sign(payload,process.env.JWT_SECRET,{

//                 expiresIn : "24h",

//             })

//             //user m daaldo
//             // user = user.toObject();

//             user.token = token;

//             //password ko undefined krdo
//             user.password = undefined;

//             //cookie ko response m bhejdo
//             const options = {
//                 expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//                 httpOnly:true,
//             }

//             res.cookie("token", token, options).status(200).json({
//                 success:true,
//                 token,
//                 user,
//                 message:"Logged in successfully!",
//             })
//         }
//         else{
//             return res.status(403).json({
//                 success:false,
//                 message:"Invalid Password!!"
//             })
//         }

//         //response m cookie pass krdo
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong, try again later!",
//             error: error.message,
//         })
//     }
// }

//LOGIN
// exports.LogIn = async (req, res) => {
// 	try {
// 		// Get email and password from request body
// 		const { email, password } = req.body;
//         console.log("password->", password);

// 		// Check if email or password is missing
// 		if (!email || !password) {
// 			// Return 400 Bad Request status code with error message
// 			return res.status(400).json({
// 				success: false,
// 				message: `Please Fill up All the Required Fields`,
// 			});
// 		}
//         console.log("first");
// 		// Find user with provided email
// 		const user = await User.findOne({ email }).populate("additionalDetails");

//         console.log("user", user);

// 		// If user not found with provided email
// 		if (!user) {
// 			// Return 401 Unauthorized status code with error message
// 			return res.status(401).json({
// 				success: false,
// 				message: `User is not Registered with Us Please SignUp to Continue`,
// 			});
// 		}

// 		// Generate JWT token and Compare Password
// 		if (await bcrypt.compare(password, user.password)) {

//             //token create krlo
//             console.log("in");
//             const payload = {
//                 email: user.email,
//                 id: user._id,
//                 accountType: user.accountType
//             }
// 			const token = jwt.sign(payload,process.env.JWT_SECRET,
// 				{
// 					expiresIn: "24h",
// 				}
// 			);
//             console.log("token is-> ", token);
// 			// Save token to user document in database
// 			user.token = token;
// 			user.password = undefined;
// 			// Set cookie for token and return success response
// 			const options = {
// 				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
// 				httpOnly: true,
// 			};
// 			res.cookie("token", token, options).status(200).json({
// 				success: true,
// 				token,
// 				user,
// 				message: `User Login Success`,
// 			});
// 		} else {
// 			return res.status(401).json({
// 				success: false,
// 				message: `Password is incorrect`,
// 			});
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		// Return 500 Internal Server Error status code with error message
// 		return res.status(500).json({
// 			success: false,
// 			message: `Login Failure Please Try Again`,
// 		});
// 	}
// };

exports.LogIn = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;
        console.log("password-> ", password);

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email }).populate("additionalDetails");
        console.log("user-> ",user)

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

        console.log(user.password);

		// Generate JWT token and Compare Password
		if(bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};


//CHANGE PASSWORD
exports.ChangePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res.status(401).json({
                success: false,
                message: "The password is incorrect"
            });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);

		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);

			console.log("Email sent successfully:", emailResponse.response);
		
        } catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);

			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res.status(200).json({
            success: true, 
            message: "Password updated successfully" 
        });

	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		
        return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};


//CHANGE PASSWORD
// exports.ChangePassword = async(req,res) => {
//     try{
//         //fetch user details 
//         const userDetails = await User.findById(req.user.id);

//         //data fetch krlo
//         const {oldPassoword, newPassword, confirmnewPassword} = req.body;

//         //validation lgado data p
//         if(!oldPassoword || !newPassword || !confirmnewPassword){
//             return res.status(401).json({
//                 success:true,
//                 message:"enter the details carefully!!"
//             })
//         }

//         //agr oldpass match krjae DB m jopass h usse, to new pass ko DB m update krdo, and mail bhi send krdo
//         if(await bcrypt.compare(userDetails.password,oldPassoword)){
            
//             //new password DB m update krdo
//             userDetails.password = newPassword;

//             //mail send krdo
//             try{
//                 const response = mailSender(User.email, "StudyNotion || by Babbar", "Password changed successfully!");
//             }catch(error){
//                 console.log("mail could not be sent", error);
//                 throw error;
//             }

//             return res.status(200).json({
//                 success:true,
//                 message:"Password changed Successfully!!"
//             })

//         }
//         else{
//             return res.status(403).json({
//                 success:false,
//                 message:"Invalid Password!",
//                 error:error.message,
//             })
//         }

//     }catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Please try again later!!",
//             error:error.message
//         })
//     }
// }
