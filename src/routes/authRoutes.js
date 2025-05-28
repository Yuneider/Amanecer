const express = require('express')
const router = express.Router()
const authController = require('../controllers/pageControllers/authController')

router.get('/login', authController.index)

router.post('/checkUser', authController.checkUser)

router.get('/signin', authController.signin)

router.post('/checkSignin', authController.checkSignin)

router.post('/generateSecurityCode', authController.generateSecurityCode)

module.exports = router