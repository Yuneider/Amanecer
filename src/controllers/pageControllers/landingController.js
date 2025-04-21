const controller = {}
const path = require('path')
const { getUsers } = require('../dbControllers/userController')

controller.landginPage = (req, res) => {
    res.render('landginPage')
}

controller.getUsers = getUsers

module.exports = controller