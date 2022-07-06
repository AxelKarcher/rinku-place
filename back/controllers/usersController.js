const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async (req, res) => {
  const {pseudo, mail, password} = req.body
  const doPseudoExists = await User.findOne({pseudo})
  const doMailExists = await User.findOne({mail})

  if (doPseudoExists || doMailExists) {
    res.status(400)
    throw new Error('Pseudo or mail already used')
  }

  const user = await User.create({pseudo, mail, password})

  if (user) {
    res.status(201).json({
      _id: user._id,
      pseudo: user.pseudo,
      mail: user.mail,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Error')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const {pseudo, password} = req.body
  const user = await User.findOne({pseudo})

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      pseudo: user.pseudo,
      mail: user.mail,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Pseudo or password invalid')
  }
})

module.exports = {registerUser, loginUser}