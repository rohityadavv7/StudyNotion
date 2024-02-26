const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
// exports.auth = async(req,res,next) => {
//     try{
//         //token leke ao
//         const token = req.body.token || req.cookie.token || 
//                         req.header("Authorisation").replace("Bearer ","");

//         //token chekc krlo
//         if(!token || token === undefined){
//             return res.status(401).json({
//                 success:false,
//                 message:"Token Missing!"
//             })
//         }
//         console.log(token);

//         try{
//             //token verify
//             const decode =  jwt.verify(token, process.env.JWT_SECRET);
//             console.log(decode);

//             req.user = decode;

//         }catch(error){
//             return res.status(401).json({
//                 success:false,
//                 message:"Token cannot be verified!"
//             })
//         }
//         next();
//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Token cannot be verified, please try again later!"
//         })
//     }
// }

exports.auth = async (req, res, next) => {
    console.log("in Auth")
    try{
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorisation").replace("Bearer ", "");

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decode -> ",decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

//isStudent
exports.isStudent = async(req,res,next) => {
    try{
        //accountType verify krlo
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"Protected route for Students only"
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again!"
        })
    }
}

//isInstructor
exports.isInstructor = async(req,res,next) => {
    console.log("in Middleware");
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"Protected route for Instructors only"
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, Please try again!"
        })
    }
}

//is Admin
exports.isAdmin = async(req,res,next) => {
    console.log("in Admiin");
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"Protected route for Admins only"
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, Please try again!"
        })
    }
}