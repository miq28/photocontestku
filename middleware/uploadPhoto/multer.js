const multer = require('multer');
const sharp = require("sharp");
var cloudinary = require('cloudinary')
var exif = require('exif-reader');
const fs = require('fs/promises')
const path = require('path');
const myUtils = require('../../utils')
const crypto = require('crypto');
var cuid = require('cuid');
const { sprintf } = require('sprintf-js');
const winston = require('../../utils/winstonlogger');

const storeOnMemory = multer.memoryStorage()

// https://github.com/expressjs/multer#diskstorage
const storeOnDisk = multer.diskStorage({
    destination: async function (req, file, cb) {
        try {
            // const userId = req.user.id;
            const basePath = myUtils.posixPath(['./public/tmp'])
            // const userDir = sprintf('%010s', userId)

            // join the path to become ./public/tmp/eccbc87e4b5ce2fe28308fd9f2a7baf3
            let finalPath = ``;
            // check route name to decide the final folder to store
            // if (req.baseUrl.includes('photo')) finalPath = path.join(basePath, userDir, "photos")
            // if (req.baseUrl.includes('profile')) finalPath = path.join(basePath, userDir, "profile")

            // finalPath = path.join(basePath, 'tmp')
            finalPath = myUtils.posixPath([basePath, req.user.userName])
            await fs.mkdir(finalPath, { recursive: true })
            // if no error, callback will execute to create folder
            cb(null, finalPath);
        } catch (err) {
            // res.status(500).send('Error uploading photo.')
            throw err
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// https://github.com/expressjs/multer#filefilter
function fileFilter(req, file, cb) {

    // filter file mime type (only jpg or png are allowed)
    // Currently multer only check mime-type based on file extension
    // multer v2 (beta) will have features to check mime-type if no file extension
    if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    } else {
        cb(new Error(`Unknown file mime type for file ${file.originalname}. Only PNG or JPG are allowed.`))
    }
}

const fileLimit = {
    fileSize: 5 * 1024 * 1024, // 5MB; For multipart forms, the max file size (in bytes)
    fields: 20,     // Max number of non-file fields
    files: 3,       //For multipart forms, the max number of file fields
}

let option = new Object
const multerStorage = multer.memoryStorage();
option.storage = storeOnDisk
// option.storage = storeOnMemory
option.fileFilter = fileFilter
option.limits = fileLimit

let upload = multer(option);

// file field name from Front-end FORM must match this value!!
const formFieldName = 'photo'

let uploadSinglePhoto = upload.single(formFieldName)
const uploadMultiplePhotos = upload.array(formFieldName, 3);

async function resizeImagesFromDisk (req, res, next) {
    try {
        if (!req.files) return next();
        // req.body.images = [];
        await Promise.all(
            req.files.map(async file => {
                // const filename = file.originalname.replace(/\..+$/, "");
                // const userId = req.user.userName;
                // const basePath = file.destination
                // const userDir = sprintf('%010s', userId)

                // const userDir = userId
                // const sharpPath = myUtils.posixPath([basePath, userDir])

                const sharpPath = file.destination

                // rename file
                let extension = ''; // set default extension (if any)
                let sharpFileName;
                const arr = file.originalname.split(".")
                extension = arr[arr.length - 1]
                sharpFileName = arr[0] + '_' + cuid.slug()
                const sharpFullFileName =  sharpFileName + '.' + extension// with extension

                let sharpFullPath = myUtils.posixPath([sharpPath, sharpFullFileName])

                await fs.mkdir(sharpPath, { recursive: true })
                winston.info(file.path)
                const image = sharp(file.path)
                await image
                    .metadata()
                    .then(function (metadata) {
                        if (metadata) {
                            if (metadata.exif) {
                                var parsed = exif(metadata.exif);
                                // console.log('EXIF', parsed)
                                const metaExif = {
                                    cameraMake: parsed.image.Make,
                                    cameraModel: parsed.image.Model,
                                    aperture: `f/${parsed.exif.FNumber}`,
                                    shutterSpeed: `1/${Math.round(1 / parsed.exif.ExposureTime)}`,
                                    focalLength: parsed.exif.FocalLength,
                                    iso: parsed.exif.ISO
                                }
                                file.exif = metaExif
                                console.log({ EXIF: metaExif })
                            }
                        }
                        return image
                            .resize({
                                width: null,
                                height: 1600,
                                fit: 'cover',
                                withoutEnlargement: true,
                                fastShrinkOnLoad: true                                
                            })
                            .withMetadata()
                            // .webp()
                            // .toFormat("jpeg")
                            // .jpeg({ quality: 90 })
                            // const fullNewPath = path.join(newPath, file.filename)
                            .toFile(sharpFullPath)
                    })
                    // .cloudinary.uploader.upload(newPath)
                    .then(sharpResult => {
                        winston.info(sharpPath);
                        winston.info(sharpFullPath)
                        file.path = myUtils.posixPath([file.path])
                        file.sharp = sharpResult;
                        file.sharp.destination = sharpPath;
                        file.sharp.fileName = sharpFileName
                        file.sharp.fullPath = sharpFullPath;
                    })
            })
        );
        console.log(req.files)
        next();
    } catch (err) {
        // if (req.files)
        err.code = arguments
            .callee
            .toString()
            .match(/function ([^\(]+)/)[1]
        next(err)
    }
};


// const getResult = async (req, res) => {
//     if (req.files.length <= 0) {
//         return res.send(`You must select at least 1 image.`);
//     }
//     const images = req.files
//         .map(image => console.log(image))
//     // .join("");
//     return res.send(`Images were uploaded:${images}`);
// };


module.exports = {
    uploadSinglePhoto,
    uploadMultiplePhotos,
    resizeImagesFromDisk,
}
