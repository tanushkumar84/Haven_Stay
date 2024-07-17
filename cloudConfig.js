const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'havenStay', // Ensure this is the correct folder name
        allowerdFormats: ["png", "jpg", "jpeg"], // Corrected spelling
    },
});

module.exports = {
    cloudinary,
    storage
};
