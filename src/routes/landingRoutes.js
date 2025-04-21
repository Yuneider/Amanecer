const express = require('express')
const router = express.Router()

router.get('/landingPage', require('../controllers/pageControllers/landingController').landginPage)

router.get('/getUsers', require('../controllers/pageControllers/landingController').getUsers)

module.exports = router