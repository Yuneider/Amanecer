const express = require('express')
const router = express.Router()

router.get('/login',require('../controllers/authController').index)

router.get('/signin',require('../controllers/authController').sign_in)

//TODO: CREATE NEW SomethingRoutes.js
router.get('/landingPage',require('../controllers/authController').landginPage)

module.exports = router