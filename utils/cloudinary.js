import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ 
    cloud_name: 'duw3mtrbh', 
    api_key: '193239827981742', 
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});
const uploadMedia = async (file) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: "auto", 
        });
        return uploadResponse;
    } catch (e) {
        console.log(e);
    }
};

const deleteMediaFromCloudinary = async (publicId, type = "image") => {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: type });
    } catch (e) {
        console.log(e);
    }
};

module.exports = { uploadMedia, deleteMediaFromCloudinary };