const { Membership } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt');
const idGenerator = require('../../../utils/IdGenerator');
const validator = require('../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../middleware/modifyImagePath');
const { generateSlug, totalUniqueSlugs } = require("random-word-slugs");
const winston = require('../../../utils/winstonlogger')

// create one type of membership
const createMembership = async (req, res, next) => {
    try {

        // insert id to req.body
        // id is combination of name + slug
        const { name } = req.body
        req.body = {
            id: idGenerator.simple(name),
            ...req.body
        }
        const option = {
            data: req.body
        }

        // console.log('option', option)

        const result = await Membership.create(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/membership

    // Create a membership
    routes.post('/',
        verifyJWT,
        validator.ValidateCreateMembership,
        validator.CheckValidatorResult,
        createMembership
    )
}