const express = require('express')
const router = express.Router()
const getController = require('../controllers/pageControllers/getController')

router.get('/getDirectory', getController.getDirectory)

router.get('/getUsers', getController.getUsers)

router.get('/getParameters', getController.getParameters)

router.get('/getRoles', getController.getRoles)

module.exports = router