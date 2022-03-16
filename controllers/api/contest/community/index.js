const { Album } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt');
const { randomUUID } = require('crypto');
const { ValidateCreateAlbum, CheckValidatorResult, createAlbumSchema } = require('../../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../../middleware/modifyImagePath');
const { generateSlug, totalUniqueSlugs } = require("random-word-slugs");

// Create an album
const createOne = async (req, res, next) => {
    try {
        const { title, description, coverPhotoId, isPrivate, isDownloadable } = req.body
        const id = req.user.id
        let option = {}
        option.data = {
            id: randomUUID(),
            title: title,
            description: description? description : generateSlug(10, { format: "sentence" }),
            coverPhotoId: coverPhotoId? coverPhotoId :  'defaultAlbumCover',
            user: {
                connect: { id: id }
            },
            isPrivate: isPrivate? isPrivate: false,
            isDownloadable: isDownloadable? isDownloadable: true
        }
        const result = await Album.create(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}