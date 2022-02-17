const multer = require('multer');
const fs = require('fs/promises')
const path = require('path');
const crypto = require('crypto');
var cuid = require('cuid');
const { sprintf } = require('sprintf-js');

// https://github.com/expressjs/multer#diskstorage
const storeOnDisk = multer.diskStorage({
    destination: async function (req, file, cb) {
        try {
            const userId = req.user.id;
            const basePath = './public/tmp'
            const userDir = sprintf('%010s', userId)

            // join the path to become ./public/tmp/eccbc87e4b5ce2fe28308fd9f2a7baf3
            const finalPath = path.join(basePath, userDir)
            await fs.mkdir(finalPath, { recursive: true })
            // if no error, callback will execute to create folder
            cb(null, finalPath);
        } catch (err) {
            throw new Error(err)
        }
    },
    filename: function (req, file, cb) {
        // get file extension
        let extension = ''; // set default extension (if any)
        if (file.originalname.split(".").length > 1) // checking if there is an extension or not.
            extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);

        // change stored file name to random hash string
        const finalFileName = cuid() + extension;
        // create file name
        cb(null, finalFileName)
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
    fileSize: 2000000 // 2000000 bytes = 2 MB
}

let option = new Object
option.storage = storeOnDisk
option.fileFilter = fileFilter
option.limits = fileLimit

let upload = multer(option);

// file field name from Front-end FORM must match this value!!
const formFieldName = 'user-photo'

let uploadSinglePhoto = upload.single(formFieldName)

module.exports = {
    uploadSinglePhoto
}
