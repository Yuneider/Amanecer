const express = require('express')
const router = express.Router()

router.get('/',require('../controllers/index.controller').index)

router.get('/sign_in',require('../controllers/index.controller').sign_in)

module.exports = router