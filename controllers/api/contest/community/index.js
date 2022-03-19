const { ContestCategory, CommunityContest } = require('../../../../model')
const jwt = require('../../../../middleware/authJwt');
const idGenerator = require('../../../../utils/idGenerator');
const validator = require('../../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../../middleware/modifyImagePath');
const { generateSlug, totalUniqueSlugs } = require("random-word-slugs");
const parseTags = require('../../../../utils/tagToArray')
const uploadPhoto = require('../../../../middleware/uploadPhoto')
const winston = require('../../../../utils/winstonlogger')
const myUtils = require('../../../../utils')
const { toBoolean } = require('validator')

// create one type of membership
const createCommunityContest = async (req, res, next) => {
    try {
        if (!req.files || req.files.length < 1) throw new Error('Cover photo is required.')
        const { title } = req.body
        const id = idGenerator.simple(title)
        const tagArray = parseTags(req.body.tags, 'name')

        const option = {
            data: { ...req.body }
        }

        option.data.id = id
        option.data.createdById = req.user.id

        option.data.coverPhoto = {
            create: {
                coverId: id,
                asset_id: req.files[0].cloudinary.asset_id,
                public_id: req.files[0].cloudinary.public_id,
                url: req.files[0].cloudinary.url,
                secure_url: req.files[0].cloudinary.secure_url
            }
        }

        option.data.tags = { connectOrCreate: tagArray }

        option.include = {
            createdBy: {
                select: {
                    userName: true,
                    profile: {
                        select: {
                            profilePhoto: true
                        }
                    }
                }
            },
            coverPhoto: true,
            constestCategory: {
                select: {
                    name: true
                }
            }
        }

        winston.info('OPTION %O', option)
        winston.info(option, option)

        const result = await CommunityContest.create(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const deleteCommunityContestById = async (req, res, next) => {
    try {
        const option = {
            where: { id: req.body.id },
            include: {
                coverPhoto: true
            }
        }
        let result = await CommunityContest.findUnique(option)
        winston.info('result %O', result)
        if (!result) throw new Error('Delete failed. Contest not found')
        const json = await myUtils.delCloudPhoto(result.coverPhoto.public_id)
        if (json.result === 'ok') {
            result = await CommunityContest.delete(option)
            req.result = result
            next()
        } else {
            throw new Error(`Delete contest photo failed. status: ${json.result}`)
        }
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const {isActive, skip, take} = req.query
        
        const option = {
            skip: skip ? parseInt(skip) : 0,
            take: take ? parseInt(take) : 5,
            where: {
                id: req.body.id,
                isActive: isActive ? toBoolean(isActive) : true
            },
            include: {
                coverPhoto: true,
                createdBy: {
                    select: {
                        userName: true,
                        membership: {
                            select: {
                                name: true
                            }
                        },
                        profile: {
                            select: {
                                profilePhoto: true
                            }
                        }
                    }
                }
            }
        }
        let result = await CommunityContest.findMany(option)
        winston.info('result %O', result)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/contest/community

    routes.post('/',
        jwt.verifyJWT,
        uploadPhoto,
        validator.ValidateCreateCommunityContest,
        validator.CheckValidatorResult,
        createCommunityContest
    )

    routes.delete('/',
        jwt.verifyJWT,
        deleteCommunityContestById
    )

    routes.get('/',
        getAll
    )
}