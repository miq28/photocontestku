const validator = require('validator')
const cuid = require('cuid');

const simple = (str) =>  {
    const blacklist = `<,>&!'"\/`
    str = validator.blacklist(str, blacklist)
    return str.replace(/\s+/g, '').toLowerCase() + cuid.slug()
};

module.exports = {
    simple
}