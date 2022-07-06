const decodeToken = require('../utils/decodeToken')

const parseHeaders = (req) => {
  return decodeToken(req.headers.authorization.split(' ')[1]).id
}

module.exports = parseHeaders