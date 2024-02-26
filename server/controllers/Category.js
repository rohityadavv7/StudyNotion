const Category = require("../models/Category");

//Create Tag
exports.createCategory = async(req,res) => {
    try{
        //data leke ao
        console.log("Id-> ",req.user.id)
        const {categoryName,categoryDescription} = req.body;

        //validation krlo
        if(!categoryName || !categoryDescription){
            return res.status(401).json({
                success:false,
                message:"all details mendatory",
            })
        }

        //category ki entry krdo
        const categoryDetails = await Category.create({
            categoryName:categoryName,
            categoryDescription:categoryDescription,
        });
        console.log(categoryDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:"Category created successfully!"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Category coult not be created, PLease try again!"
        })
    }
}

//get all tags
exports.showAllCategory = async(req,res) => {
    try{
        //data fetch krlo DB se
        const allCategory = await Category.find({},{categoryName:true,categoryDescription:true});

        //return respnonse
        return res.status(200).json({
            success:true,
            message:"All Categories fetched successfully!",
            allCategory
        })
    }catch(error){
        return res.status(500).jon({
            success:false,
            message:"Could not fetch Categories!"
        })
    }
}

//Category Page Details
exports.categoryPageDetails = async(req,res) => {
    try{
        //CategoryId leke ao
        const categoryId = req.body;

        //data leo selected category ka
        const selectedCategory = await Category.findById({categoryId})
                                    .populate("courses")
                                    .exec();

        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found"
            })
        }

        const differentCategory = await Category.find({_id:{$ne: categoryId}})
                                    .populate("courses")
                                    .exec();


        //Top Coursees
        // const TopCourses = await Category.find()

        //return response
        return res.status(200).json({
            success:true,
            message:"Successfull!",
            data:{
                selectedCategory,
                differentCategory
            }
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}