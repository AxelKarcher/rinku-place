const asyncHandler = require('express-async-handler')

const parseHeaders = require('../utils/parseHeaders')
const User = require('../models/userModel')

const getFilms = asyncHandler(async (req, res) => {
  const id = parseHeaders(req)
  const films = await User.findOne({_id: id})

  films.toArray((err, response) => {console.log('HOP:', JSON.stringify(response))})

  res.send('OK')
  // films.toArray((err, response) => {
  //   res.send(JSON.stringify(response))
  // })
})

const putFilm = asyncHandler(async (req, res) => {
  films.insertOne(req.body)
  res.send('OK')
})

const updateFilm = asyncHandler(async (req, res) => {
  let id = req.params.id

  films.updateOne({_id: mongo.ObjectId(id)}, {$set: req.body})
  res.send('OK')
})

const deleteFilm = asyncHandler(async (req, res) => {
  films.deleteOne({_id: mongo.ObjectId(req.params.id)})
  res.send('OK')
})

module.exports = {getFilms, putFilm, updateFilm, deleteFilm}