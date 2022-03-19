const cuid = require('cuid')
// helper function
/* Parse string tags and convert to object to feed to prisma */
const parseTagsToArray = (commaSeparatedString, tagFieldStr) => {
    const splittedTag = commaSeparatedString.split(',')
    if (splittedTag.length < 2) return [] // return empty array
    let array = []
    for (let i = 0; i < splittedTag.length; i++) {
        let obj = {}
        const tag = splittedTag[i].trim().toLowerCase()        
        obj[tagFieldStr] = tag
        array.push({
            where: obj,
            create: obj
        })
    }
    return array
    /* return value is an array, something like this
    [
        {
            where: { name: 'sport' },
            create: { name: 'sport' },
        },
        {
            where: { name: 'mountain' },
            create: { name: 'mountain' },
        },
    ]
    */
}

module.exports = parseTagsToArray;