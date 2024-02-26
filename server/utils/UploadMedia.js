const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.uploadMediaToCloudinary = async(file,folder) => {
    const options = {folder};

    console.log("file path", file.tempFilePath);
    
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

// exports.uploadMediaToCloudinary = async(file, folder) => {
//     const options = {folder};

//     options.resource_type = "auto";

//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }