const path = require('path')
const winston = require('../utils/winstonlogger')
const fs = require('fs/promises')
const cloudinary = require('cloudinary')

const posixPath = (arr) => {
    return path
        .join(...arr)
        .split(path.sep)
        .join(path.posix.sep)
}

async function delCloudPhoto(public_id) {
    return await cloudinary.uploader.destroy(public_id,
        function (result) {
            winston.info('%o', result);
            return result
       });
}


module.exports = {
    posixPath,
    delCloudPhoto
}