const express = require('express')
const router = express.Router()

router.get('/login',require('../controllers/authController').index)

router.get('/signin',require('../controllers/authController').sign_in)

module.exports = router