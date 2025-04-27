const controller = {}
const path = require('path')
const userController = require('../dbControllers/userController')

let navItemSelected

controller.index = (req, res) => {
    navItemSelected = 'login'
    res.render('login', { navItemSelected })
}

controller.signin = (req, res) => {
    navItemSelected = 'signin'
    res.render('signin', { navItemSelected })
}

controller.checkUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const validUser = await userController.checkUser(username, password)
        console.log('❓ validUser: ' + validUser)
        if (validUser) {
            res.render('landginPage')
        } else {
            res.status(500).send('❌ User not valid')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

controller.checkSignin = (req, res) => {
    res.send('checkSignin')
}

module.exports = controller