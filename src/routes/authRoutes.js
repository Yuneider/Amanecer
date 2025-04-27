const express = require('express')
const router = express.Router()
const authController = require('../controllers/pageControllers/authController')

router.get('/login', authController.index)

router.post('/checkUser', authController.checkUser)

router.get('/signin', authController.signin)

router.post('/checkSignin', authController.checkSignin)

router.get('/getDirectory', authController.getDirectory)

module.exports = router