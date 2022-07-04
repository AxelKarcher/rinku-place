const express = require('express')

const {registerUser} = require('../controllers/usersController')

const router = express.Router()

router.route('/register').post(registerUser)

module.exports = router