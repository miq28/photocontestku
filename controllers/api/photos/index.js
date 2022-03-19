const { Photo, User, prisma } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt')
const { modifyImagePath, modifyImagePath2ndLayer } = require('../../../middleware/modifyImagePath')
const { generateSlug, totalUniqueSlugs } = require("random-word-slugs");
const { DateTime } = require("luxon");
const tagToArray = require('../../../utils/tagToArray')
const combinedUploadPhoto = require('../../../middleware/uploadPhoto')

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const randomSlugsOption = {
    format: "sentence",
    partsOfSpeech: ["adjective", "noun", "adjective"],
    categories: {
        adjective: ["color", "appearance"],
        noun: ["animals"],
    },
};

//API to upload a photo (or many photos) to a collection/galery User
async function storePhototoDB(req, res, next) {
    var results = []
    try {

        for (let i = 0; i < req.files.length; i++) {

            const file = req.files[i]

            let option = {}

            let { title, description, isPrivate,
                tag, albumtitle } = req.body

            const userId = req.user.id
            const photoId = file.cloudinary.original_filename

            const photoDetail = {
                fileName: file.cloudinary.original_filename,
                originalName: file.originalname,
                mimeType: file.mimetype,
                encoding: file.encoding,
                size: file.cloudinary.bytes,
                width: file.cloudinary.width,
                height: file.cloudinary.height,
                isPrivate: isPrivate || false,
                cameraMake: file.exif.cameraMake,
                cameraModel: file.exif.cameraModel,
                shutterSpeed: file.exif.shutterSpeed,
                aperture: file.exif.aperture,
                focalLength: file.exif.focalLength,
                equiv35: eval(file.cloudinary.exif.FocalLengthIn35mmFilm),
                iso: file.exif.iso,
                lat: file.cloudinary.exif.lat,
                lon: file.cloudinary.exif.lon,
                dtOriginal: file.cloudinary.exif.DateTimeOriginal ?
                    DateTime.fromFormat(
                        file.cloudinary.exif.DateTimeOriginal,
                        'yyyy:MM:dd hh:mm:ss'
                    ).toISO() : null
            }

            // handle title
            let photoTitle;
            if (title && Array.isArray(title)) {
                if (title[i].length < 2) photoTitle = generateSlug(2, { format: "title" })
                else photoTitle = title[i]
            } else if (title) {
                photoTitle = title
            } else {
                photoTitle = file.originalname.split('.')[0]
            }


            // handle description
            let photoDesc;
            if (description && Array.isArray(description)) {
                if (description[i].length < 2) {
                    photoDesc = generateSlug(3, { format: "sentence" })
                } else {
                    photoDesc = description[i]
                }
            } else if (description) {
                if (description.length < 2) {
                    photoDesc = generateSlug(3, { format: "sentence" })
                } else {
                    photoDesc = description
                }
            } else {
                photoDesc = generateSlug(3, { format: "sentence" })
            }

            option.data = {
                id: photoId,
                title: photoTitle,
                description: photoDesc,
                path: file.cloudinary.secure_url,
                asset_id: file.cloudinary.asset_id,
                public_id: photoId,
                user: { connect: { id: req.user.id } },
                photoDetail: {
                    connectOrCreate: {
                        where: {
                            photoId: photoId
                        },
                        create: {
                            ...photoDetail
                        }
                    }
                }
            }

            // check if album title is specified
            albumtitle && albumtitle.trim() ?
                option.data.albums = {
                    connectOrCreate: {
                        where: {
                            // user: {id: userid},
                            title: albumtitle
                        },
                        create: {
                            userId: userId,
                            title: albumtitle
                        }
                    }
                } : option.data.albums = {}

            // handle tags
            const tagFieldInDb = 'name' // must match field name 'name' in Tag table
            let tagArray;
            if (tag) {
                let tagStr;
                if (Array.isArray(tag)) tagStr = tag[i]
                else tagStr = tag
                let tagArray = tagToArray(tagStr, tagFieldInDb)
                option.data.tags = { connectOrCreate: tagArray }
            }
            // tag && tag.trim() ?
            //     option.data.tags = { connectOrCreate: tagArray } : false
            option.include = {
                photoDetail: true,
                albums: true,
                tags: true,
            }

            // add photo to db
            const result = await Photo.create(option)
            results.push(result)
        }

        req.result = results
        next()
    } catch (err) {
        err.code = arguments
            .callee
            .toString()
            .match(/function ([^\(]+)/)[1]
        next(err)
    }
}

const getAllPhotosInDatabaseWithLimit = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit)

        limit ? limit : 100;
        limit <= 100 ? limit : 100;

        let option = {
            skip: 0,
            take: limit
        }
        option.include = {
            photoDetail: true,
            albums: true,
            tags: true
        }

        option.orderBy = [
            {
                updatedAt: 'desc',
            }
        ]
        let result = await Photo.findMany(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

//API to get all photos from a specific user
const getPhotosByUserId = async (req, res, next) => {
    try {
        const id = req.params.id
        let { skip, take } = req.query
        if (!skip) skip = 0
        if (!take) take = 100

        skip = parseInt(skip)
        take = parseInt(take)

        if (take > 100) take = 100

        let result = await Photo.findMany({
            skip,
            take,
            where: { userId: id },
        })

        let count = await Photo.count({
            where: { userId: id },
        })
        // console.log('count', count)
        req.result = result
        req.result.count = count
        next()
    } catch (err) {
        next(err)
    }
}

// //API to get all photos from a specific user
// const getPhotosByUserId = async (req, res, next) => {
//     try {
//         const id = req.params.id
//         let { skip, take } = req.query
//         if (!skip) skip = 0
//         if (!take) take = 100

//         skip = parseInt(skip)
//         take = parseInt(take)

//         if (take > 100) take = 100
//         let option = {}
//         option.skip = skip
//         option.take = take
//         // option._count = {
//         //     id: true
//         // }

//         option.where = { userId: id }
//         option.include = {
//             // _count: true,
//             // id: true,            
//             tags: true,
//             albums: true
//         }
//         // option.select = {
//         //     _count: true,
//         // }
//         let result = await Photo.findMany(option)
//         const count = await Photo.count()
//         req.result = result
//         next()
//     } catch (err) {
//         next(err)
//     }
// }

//API to get a spesific photos from a specific user
const getOnePhotoUser = async (req, res, next) => {
    try {
        const photoId = req.params.photoId
        let option = {}
        option.where = { id: photoId }
        option.include = {
            photoDetail: true,
            albums: true,
            tags: true
        }
        let result = await Photo.findUnique(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const updatePhotoDetail = async (req, res, next) => {
    try {
        const { id, title, description, tag } = req.body
        let option = {}
        option.where = { id: id }
        option.data = { title, description }

        // handle tags
        const tagFieldInDb = 'name' // must match field name 'name' in Tag table
        let tagArray;
        if (tag) {
            // console.log('tag', tag[i], i)
            tagArray = parseTagsToArray(tag, tagFieldInDb)
            console.log(tagArray)
            option.data.tags = { connectOrCreate: tagArray }
        }

        option.include = { tags: true }

        const result = await Photo.update(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/photos/
    routes.get('/',
        getAllPhotosInDatabaseWithLimit,
        modifyImagePath
    )

    routes.get('/user/:id',
        getPhotosByUserId,
        // modifyImagePath
    )
    routes.get('/:photoId',
        getOnePhotoUser,
        modifyImagePath
    )

    routes.post('/upload/',
        verifyJWT,
        combinedUploadPhoto,
        storePhototoDB
    )
    routes.put('/',
        verifyJWT,
        updatePhotoDetail
    )

}