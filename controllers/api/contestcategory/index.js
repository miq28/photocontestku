const { ContestCategory } = require('../../../model')
const jwt = require('../../../middleware/authJwt');
const cuid = require('cuid');
const validator = require('../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../middleware/modifyImagePath');
const { generateSlug, totalUniqueSlugs } = require("random-word-slugs");
const winston = require('../../../utils/winstonlogger')

// create one type of membership
const createContestCategory = async (req, res, next) => {
    try {
        const { name } = req.body
        const id =  name.replace(/\s+/g, '') + '_' + cuid.slug();
        const option = {
            data: {
                id, name
            }
        }

        const result = await ContestCategory.create(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/contestcategory

    // Create a membership
    routes.post('/',
        jwt.verifyJWT,
        // validator.ValidateCreateContestCategory,
        // validator.CheckValidatorResult,
        createContestCategory
    )
}