const express = require('express')
const router = express.Router()

router.get('/login',require('../controllers/pageControllers/indexController').index)

router.get('/signin',require('../controllers/pageControllers/indexController').sign_in)

module.exports = router