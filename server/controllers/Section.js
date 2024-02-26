const Section = require("../models/Section");
const Course = require("../models/Course");

//create section
exports.createSection = async(req,res) => {
    try{
        //data leke ao
        const {sectionName,courseId} = req.body;

        //validation lgao
        if(!sectionName || !courseId){
            return res.status(401).json({
                success:false,
                message:"All details mendatory!",
            })
        }

        //section create krdo
        const newSection = await Section.create({
            sectionName:sectionName
        })

        //Course k schema m , section_id push krdo
        const updatedCourse = await Course.findByIdAndUpdate({id:courseId},{
            $push:{
                courseContent:newSection._id,
            }
        },{
            new:true
        }).populate("Section").exec();


        //return response
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully!!"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Could not create Section!"
        })
    }
}

//update Section
exports.updateSection = async(req,res) => {
    try{
        //data leke ao
        const {sectionName,sectionId} = req.body;

        //validation kro
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success:false,
                message:"All details Mendatory!"
            })
        }

        //findbyidandupdate krdo
        const updatedSection = await Section.findByIdAndUpdate({id:sectionId},{
            sectionName:sectionName,
        },{new:true}).populate("Section").exec();


        //response bhejdo
        return res.status(200).json({
            success:true,
            message:"Section updated Successfully!"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Section Could not be Updated, Please try again!"
        })
    }
}

//delete section
exports.deleteSection = async(req,res) => {
    try{
        //data leke ao
        const{sectionId}  = req.body;

        //validate kro
        if(!sectionId){
            return res.status(401).json({
                success:false,
                message:"All details mendatory!"
            })
        }

        //findbyidanddelete lgado
        const deletedSection = await Section.findByIdAndDelete({sectionId});

        //reurn response
        return res.status(200).json({
            success:true,
            message:"Section deleted Successfully!!",
            deletedSection
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Section could not be Deleted!, Please try again!"
        })
    }
}