const asyncHandler = require('express-async-handler')

// const filmModel = require('../models/filmModel')
const User = require('../models/userModel')

const getFilms = asyncHandler(async (req, res) => {
  films.find({}).toArray((err, response) => {
    res.send(JSON.stringify(response))
  })
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