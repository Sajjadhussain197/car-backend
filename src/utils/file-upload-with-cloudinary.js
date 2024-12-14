import cloudinary from 'cloudinary';
import { response } from 'express';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) {
            console.log("no localfilepath")
            return null;
        } 
        
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        });
        console.log("file is uploaded successfully", response.url);
        
        fs.unlinkSync(localfilepath);
        return response;
    } catch (error) {
        fs.unlinkSync(localfilepath);
        console.log(error, "file uploading to cloudinary is failed");
        return null;
    }
}

module.exports = { uploadCloudinary };