// config.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: '',
  api_key: '',
  api_secret: ''
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'CrudUploads',
      allowedFormats: ["png","jpg","jpeg","pdf"],
    },
});


module.exports = {
    cloudinary,
    storage,
};