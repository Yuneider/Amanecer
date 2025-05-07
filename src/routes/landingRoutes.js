const express = require('express')
const router = express.Router()
const landingController = require('../controllers/pageControllers/landingController')

router.get('/landingPage', landingController.landginPage)

module.exports = router