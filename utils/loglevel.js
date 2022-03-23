// https://stackoverflow.com/a/36222827
const log = require('loglevel')

if (process.env.NODE_ENV !== 'production') {
  log.setLevel('debug')
} else {
  log.setLevel('error')
}

exports.default = { log }