var cloudinary = require('cloudinary')
const myUtils = require('../../utils')
const fs = require('fs/promises');
const winston = require('../../utils/winstonlogger');

async function upload(req, res, next) {
    try {
        if (!req.files)
            return next();

        await Promise.all(
            req.files.map(async (f) => {
                const localFilePath = f.sharp.fullPath;

                const projectName = process.env.PROJECT_NAME;
                const userDir = req.user.userName;

                // let remoteFolder;
                winston.info(req.baseUrl)
                // check route name to decide the final folder to store

                let str;
                if (req.baseUrl.match(/photo/i)) str = 'photos'
                if (req.baseUrl.match(/profile/i)) str = 'profile'
                if (req.baseUrl.match(/contest\/community/i)) str = 'contest/community'
                if (req.baseUrl.match(/contest\/premium/i)) str = 'contest/premium'

                const remoteFolder = myUtils.posixPath([projectName, userDir, str]);

                // https://cloudinary.com/documentation/image_upload_api_reference#upload_optional_parameters
                const uploadOptions = {
                    folder: remoteFolder,
                    use_filename: true,
                    unique_filename: false,
                    exif: true,
                    colors: true
                };

                const cloudUpload = async () => cloudinary.v2.uploader.upload(
                    localFilePath,
                    uploadOptions
                );

                const uploadResult = await cloudUpload();

                const exif = uploadResult.exif;

                if (exif && exif.GPSLatitude) {
                    let [latD, latM, latS] = exif.GPSLatitude.split(',');
                    const latRef = exif.GPSLatitudeRef === 'N' ? 1 : -1;
                    latD = eval(latD);
                    latM = eval(latM);
                    latS = eval(latS);

                    let [lonD, lonM, lonS] = exif.GPSLongitude.split(',');
                    const lonRef = exif.GPSLongitudeRef === 'E' ? 1 : -1;
                    lonD = eval(lonD);
                    lonM = eval(lonM);
                    lonS = eval(lonS);

                    const lat = (latD + latM / 60 + latS / 3600) * latRef;
                    const lon = (lonD + lonM / 60 + lonS / 3600) * lonRef;

                    exif.lat = lat;
                    exif.lon = lon;
                }

                delete uploadResult.exif.MakerNote;
                delete uploadResult.exif.UserComment;

                f.cloudinary = uploadResult;
                winston.info('uploadResult %O', uploadResult);
            })
        );
        req.files && req.files.destination ?
            fs.rmdir((req.files)[0].destination, { recursive: true }) :

            next();
    } catch (err) {
        err.code = 'CLOUDINARY';
        next(err);
    }
}

module.exports = {
    upload
}
