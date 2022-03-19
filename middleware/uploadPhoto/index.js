// https://stackoverflow.com/a/68249579

const multer = require('./multer')
const cloudinary = require('./cloudinary')
const {Router} = require('express')

const combined = Router().use([
    multer.uploadMultiplePhotos,
    multer.resizeImagesFromDisk,
    cloudinary.upload
])

module.exports = combined