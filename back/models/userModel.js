const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const filmModel = require('./filmModel')

const userModel = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      unique: true
    },
    mail: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    films: {
      type: [filmModel]
    }
  }
)

userModel.pre('save', async function (next) {
  if (!this.isModified('password')) {next()}

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userModel)

module.exports = User