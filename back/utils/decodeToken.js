const jwt = require('jsonwebtoken')

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = decodeToken