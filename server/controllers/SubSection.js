const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
require("dotenv").config();
const {uploadMediaToCloudinary} = require("../utils/UploadMedia");

//create SubSection
exports.createSubSection = async(req,res) => {
    try{
        //data leke ao
        const{title,description,timeDuration,sectionId} = req.body;

        //video leke ao
        const video = req.files.videoFile;

        //validation kro
        if(!title || !description || !timeDuration || !sectionId){
            return res.status(401).json({
                success:false,
                message:"All details Mendatory!"
            })
        }

        //upload krdo cloudinary p
        const videoUploadDetails = await uploadMediaToCloudinary(video,process.env.FOLDER_NAME);

        //subsection create kro
        const newSubSection = await SubSection.create({
            title:title,
            description:description,
            timeDuration:timeDuration,
            video:videoUploadDetails.secure_url,
        })

        //Section wale schema m, SubSection ki ID insert kro
        const updatedSection = await Section.findByIdAndUpdate({id:sectionId},{
            $push:{
                subSection:newSubSection._id,
            }
        },{new:true}).populate("SubSection").exec();


        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection created Successfully!",
            updatedSection
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Sub Section could not be created!"
        })
    }
}

//TODO: update SubSection, Delete SubSection

