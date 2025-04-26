const controller = {}
const path = require('path')
const userController = require('../dbControllers/userController')

let navItemSelected

controller.index = (req, res) => {
    navItemSelected = 'login'
    res.render('login', { navItemSelected })
}

controller.sign_in = (req, res) => {
    navItemSelected = 'signin'
    res.render('signin', { navItemSelected })
}

controller.checkUser = userController.checkUser

module.exports = controller