// https://express-validator.github.io/docs/
// https://github.com/validatorjs/validator.js
const { body, check, oneOf, checkSchema, validationResult } = require('express-validator');

/**
 * MANDATORY FIELDS
 * This fields must exist in the request
 * otherwise the valiation cannot pass
 */
const usernameChain =
    body('userName')
        .trim()
        .exists()
        .withMessage('field not exist')
        .notEmpty()
        .withMessage('cannot be empty')
        .isLength({ min: 3, max: 32 })
        .withMessage('minimum 3 and maximum 32 characters')
        .isAlphanumeric()
        .withMessage('only alphanumeric are allowed')
const emailChain =
    body('email')
        .exists()
        .withMessage('field not exist')
        .isLength({ min: 5, max: 32 })
        .withMessage('minimum 5 and maximum 32 characters')
        .isEmail()
        .withMessage('format is not valid')
        .normalizeEmail({
            all_lowercase: true,
            gmail_remove_dots: false,
        })
const passwordChain =
    body('password')
        .trim()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage('minimum 8 characters, 1 lowercase, 1 uppercase, and 1 symbol ')
const usernameChainLoose =
    body('userName')
        .exists()
        .withMessage('field not exist')
        .notEmpty()
        .withMessage('cannot be empty')
const passwordChainLoose =
    body('password')
        .exists()
        .withMessage('field not exist')
        .notEmpty()
        .withMessage('cannot be empty')
const titleChain =
    check('title')
        .trim()
        .escape()
        .exists()
        .isLength({ min: 3, max: 32 })
        .withMessage("must be between 3 and 32 characters")
        .matches(/^[A-Za-z0-9 .,'!&?]+$/)
        .withMessage('only alphanumeric are allowed');
const descriptionChain =
    check('description')
        .exists()
        .withMessage('field not exist')
        .trim()
        .isLength({ min: 0, max: 254 })
const monthlyFee =
    check('monthlyFee')
        .exists()
        .withMessage('field not exist')
        .isDecimal()
        .withMessage('must be a decimal number')
        .toFloat()
const maxEntriesPerContest =
    check('maxEntriesPerContest')
        .exists()
        .withMessage('field not exist')
        .isInt()
        .withMessage('must be an integer')
        .toInt()
const maxContestEntry =
    check('maxContestEntry')
        .exists()
        .withMessage('field not exist')
        .isInt()
        .withMessage('must be an integer')
        .toInt()
const discountPhotoAward =
    check('discountPhotoAward')
        .exists()
        .withMessage('field not exist')
        .isDecimal()
        .withMessage('must be a decimal number')
        .toFloat()
const canCreateOwnContest =
    check('canCreateOwnContest')
        .exists()
        .withMessage('field not exist')
        .isBoolean()
        .withMessage('must be a boolean')
        .toBoolean()
const canEnterSubscriberOnlyContests =
    check('canEnterSubscriberOnlyContests')
        .exists()
        .withMessage('field not exist')
        .isBoolean()
        .withMessage('must be a boolean')
        .toBoolean()
const isFlagNotOnBrief =
    check('isFlagNotOnBrief')
        .exists()
        .withMessage('field not exist')
        .isBoolean()
        .withMessage('must be a boolean')
        .toBoolean()
const canGetDiscountsWithTopBrands =
    check('canGetDiscountsWithTopBrands')
        .exists()
        .withMessage('field not exist')
        .isBoolean()
        .withMessage('must be a boolean')
        .toBoolean()
const canCreateOwnCustomUrl =
    check('canCreateOwnCustomUrl')
        .exists()
        .withMessage('field not exist')
        .isBoolean()
        .withMessage('must be a boolean')
        .toBoolean()
const supportType =
    body('supportType')
        .exists()
        .withMessage('field not exist')
        .notEmpty()
        .withMessage('cannot be empty')
        .isIn(['BASIC', 'PRIORITY'])
        .withMessage('is not in the list')
const isActive =
    check('isActive')
        .optional()
        .isBoolean()
        .withMessage('must be a boolean')
        .toBoolean()
const nameContestCategory =
    body('name')
        .exists()
        .withMessage('field not exist')
        .escape()
        .trim()
        .isLength({ min: 3, max: 32 })
        .withMessage('minimum 3 and maximum 32 characters')
        .isAscii()
        .withMessage('only Ascii characters are allowed')

/**
 * OPTIONAL FIELDS
 * If these fields do not exist in the request
 * validation will still be passed
 */
const nameChain =
    body('name')
        .trim()
        .escape()
        .exists()
        .withMessage('field not exist')
        .isLength({ min: 3, max: 32 })
        .withMessage('minimum 3 and maximum 32 characters')
        .isAlphanumeric('en-US', { ignore: " " })
        .withMessage('only alpha characters are allowed')
const roleChain =
    body('role')
        .optional()
        .isAlpha('en-US', null)
        .withMessage('only alpha characters are allowed')
const addressChain =
    check('address')
        .optional()
        .trim()
        .isLength({ min: 2, max: 254 })
// .isAlphanumeric('en-US', { ignore: " ,\." })
const profilePhotoChain =
    check('profilePphoto')
        .optional()
        .trim()
        .isLength({ min: 2, max: 254 })
        .isAlphanumeric('en-US')
const coverPhotoChain =
    check('coverPhoto')
        .optional()
        .trim()
        .isLength({ min: 2, max: 254 })
        .isAlphanumeric('en-US')


/**
 * VALIDATION MIDDLEWARES
 * These will passed to app.use(...) or router.use(...)
 */
const ValidateLogin = [
    usernameChainLoose,
    passwordChainLoose
]
const ValidateSignup = [
    usernameChain,
    emailChain,
    passwordChain
]
const ValidateUpdateProfile = [
    nameChain,
    addressChain,
    profilePhotoChain,
    coverPhotoChain
]
const ValidateCreateAlbum = [
    titleChain,
    descriptionChain
]
const ValidateCreateMembership = [
    nameChain,
    monthlyFee,
    maxEntriesPerContest,
    maxContestEntry,
    discountPhotoAward,
    canCreateOwnContest,
    canEnterSubscriberOnlyContests,
    isFlagNotOnBrief,
    canGetDiscountsWithTopBrands,
    canCreateOwnCustomUrl,
    supportType,
    isActive
]
const ValidateCreateContestCategory = [
    nameContestCategory
]

/**
 * Validation check result routine
 * This shall be put after the validation middlewares
 * to check whether there is/are validation errors or not
 * If error exist, it will throw error with with typeof Array
 */
const CheckValidatorResult = (async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw errors.array()
        }
        next()
    } catch (err) {
        next(err)
    }
})

/**
 * EXPORTED middlewares
 * self-explanatory
 */
module.exports = {
    ValidateSignup,
    ValidateLogin,
    ValidateUpdateProfile,
    ValidateCreateAlbum,
    ValidateCreateMembership,
    ValidateCreateContestCategory,
    CheckValidatorResult
}
