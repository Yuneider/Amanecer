const express = require('express')
const router = express.Router()

router.get('/',require('../controllers/index.controller').index)

module.exports = router