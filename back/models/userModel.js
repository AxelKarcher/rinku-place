const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userModel = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true
    },
    mail: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }
)

const User = mongoose.model('User', userModel)

module.exports = User