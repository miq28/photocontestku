// https://github.com/validatorjs/validator.js
const { body, check, oneOf, checkSchema, validationResult } = require('express-validator')

const title =
    check('title')
        .exists()
        .withMessage('field not exist')
        .trim()
        // .escape()
        // .blacklist('/')
        .isLength({ min: 3, max: 32 })
        .withMessage("must be between 3 and 32 characters")
        .matches(/^[A-Za-z0-9 .,'/!&?]+$/)
        .withMessage('character not allowed');
const constestCategoryId =
    check('constestCategoryId')
        .exists()
        .withMessage('field not exist')
const startAt =
    check('startAt')
        .exists()
        .withMessage('field not exist')
        .isISO8601()
        .withMessage('date must be in ISO 8601 format')
        .isAfter()
        .withMessage('date must be after now()')
const endAt =
    check('endAt')
        .exists()
        .withMessage('field not exist')
        .isISO8601()
        .withMessage('date must be in ISO 8601 format')
        .isAfter()
        .withMessage('date must be after now()')
const ratingStartAt =
    check('ratingStartAt')
        .exists()
        .withMessage('field not exist')
        .isISO8601()
        .withMessage('date must be in ISO 8601 format')
        .isAfter()
        .withMessage('date must be after now()')
const ratingEndtAt =
    check('ratingEndtAt')
        .exists()
        .withMessage('field not exist')
        .isISO8601()
        .withMessage('date must be in ISO 8601 format')
        .isAfter()
        .withMessage('date must be after now()')
// const coverPhotoPath =
//     check('coverPhotoPath')
//         .exists()
//         .withMessage('field not exist')
const isJudged =
    check('isJudged')
        .optional()
        .isBoolean()
        .withMessage('must be a boolean')
        .toBoolean()
const brief =
    body('brief')
        .optional()
        .trim()
        .escape()
        .isLength({ max: 1000 })
        .withMessage('maximum 1000 characters')
const tags =
    body('tags')
        .optional()
        .trim()
        .escape()
        .isLength({ max: 1000 })
        .withMessage('maximum 1000 characters')
const likes =
    check('likes')
        .optional()
        .isInt()
        .withMessage('must be an integer')
        .toInt()
const isActive =
    check('isActive')
        .optional()
        .isBoolean()
        .withMessage('must be a boolean')
        .toBoolean()

const createCommunityContest = [
    title,
    constestCategoryId,
    startAt,
    endAt,
    ratingStartAt,
    ratingEndtAt,
    // coverPhotoPath,
    isJudged,
    brief,
    tags,
    likes,
    isActive
]

module.exports = {
    createCommunityContest
}
