const express = require('express')
const router = express.Router()

router.get('/landingPage',require('../controllers/pageControllers/landingController').landginPage)

module.exports = router