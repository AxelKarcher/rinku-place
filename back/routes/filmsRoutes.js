const express = require('express')

const {getFilms, putFilm, updateFilm, deleteFilm} = require('../controllers/filmsController')

const router = express.Router()

router.route('/get').get(getFilms)
router.route('/put').put(putFilm)
router.route('/update').patch(updateFilm)
router.route('/delete').delete(deleteFilm)

module.exports = router