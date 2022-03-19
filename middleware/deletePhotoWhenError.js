const { Router } = require('express')
const cloudinary = require('cloudinary')
const fs = require('fs/promises')
const winston = require('../utils/winstonlogger')

async function deleteCloudinary(err, req, res, next) {
    try {
        // if (!err) next()
        if (!req.files || req.files.length < 1) {
            next(err)
        }
        else if (req.files.length < 1) {
            winston.info('%o', err);
            next(err)
        }
        else {
            winston.info('3333  %o', err);

            await Promise.all(
                req.files.map(async f => {
                    winston.info('FILE %o', f);
                    if (f.cloudinary) {
                        winston.info('Deleting cloudinary..')
                        await cloudinary.uploader.destroy(f.cloudinary.public_id,
                            function (result) {
                                winston.info('%o', result);
                                next(err)
                            });
                    }
    
                }))
    
                winston.info('req.files %O', req.files);
            
            // detele temporary folder
            await fs.rmdir((req.files)[0].destination, { recursive: true })
            next(err)
        }        
     } catch (err) {
        next(err)
    }
}


const combined = Router().use([
    deleteCloudinary
])

module.exports = deleteCloudinary