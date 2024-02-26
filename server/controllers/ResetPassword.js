const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");

//resetPasswordToken
exports.resetPasswordToken = async(req,res) => {
    try{
        //data le ao
        const email = req.body.email;

        //validation
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered!!"
            })
        }
        
        console.log("user -> ",user);
        //generate token 
        const token = crypto.randomBytes(20).toString("hex");

        //update token and expiration time in User Schems
        const updatedDetails = await User.findOneAndUpdate({email},
                                    {
                                        token:token,
                                        resetPasswordExpires : Date.now()+3600000,
                                    },
                                    {new:true});
                                    
        //generate Url
        const URL = `http://localhost:3000/update-password/${token}`;
        console.log(URL);

        //send Mail
        await mailSender(email,
                        "Password Reset Link",
                        `Reset Your Password Here : ${URL}`);

        //return response
        return res.status(200).json({
            success:true,
            message:"Email sent Successfully, Please check your Email!",
            updatedDetails
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went Wrong, Please try again!!"
        })
    }
}

//resetPassword
exports.resetPassword = async(req,res) => {
    try{
        //data le aao
        const{password, confirmPassword, token} = req.body;

        //validation
        if(!password || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:"enter all the details carefully!"
            })
        }

        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Passwords do not match"
            })
        }
        const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}

        if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}

        //password hash krlo
        const hashedPassword = await bcrypt.hash(password,10);

        //user ko leke ao DB m se with the help of token
        const user = await User.findOne(
            {token:token},
            { password: hashedPassword},
            {new: true});

        //if no entry -> invalid token
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid token",
            })
        }
        
        //response send krdo
        return res.status(200).json({
            success:true,
            message:"Password changed successfully!"
        })
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while changing password, Try again!"
        })
    }
}