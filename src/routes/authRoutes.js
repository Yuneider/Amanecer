const express = require('express')
const router = express.Router()
const controller = require('../controllers/pageControllers/indexController')

router.get('/login', controller.index)

router.post('/checkUser', controller.checkUser)

router.get('/signin', controller.sign_in)

module.exports = router