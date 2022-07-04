const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
  const {pseudo, mail, password} = req.body
  const userExists = await User.findOne({mail})

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({pseudo, mail, password})

  if (user) {
    res.status(201).json({
      _id: user._id,
      pseudo: user.pseudo,
      mail: user.mail,
    })
  } else {
    res.status(400)
    throw new Error('Error')
  }
})

module.exports = {registerUser}