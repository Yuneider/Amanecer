const controller = {}
const userController = require('../dbControllers/userController')
const pamatereController = require('../dbControllers/parameterController')
const mailer = require('../util/mailer')

const crypto = require('crypto')
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

controller.generateSecurityCode = async (req, res) => {
    try {
        // SECURITY CODE GENERATED AND UPDATED
        pamatereController.updateParameter(100, crypto.randomBytes(4).toString('hex'))
        // EMAIL PARAMETERS BETWEEN 100 AND 103 
        const securityCode = await pamatereController.getParameter(100)
        const to = await pamatereController.getParameter(101)
        const subject = await pamatereController.getParameter(102)
        const body = await pamatereController.getParameter(103)
        mailer.sendMail(to.get('value'), subject.get('value'), body.get('value') + securityCode.get('value'))
        res.json('✅ Procedure ended')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

controller.checkSignin = async (req, res) => {
    try {
        const {
            id, idType,
            name, phone,
            email, role,
            username, password,
            pillar, verificationCode
        } = req.body
        const securityCode = await pamatereController.getParameter(100)
        if (verificationCode.localeCompare(securityCode.get('value')) === 0) {
            navItemSelected = 'login'
            res.render('login', { navItemSelected })
        } else {
            //TODO: PENDIENTE DESARROLLAR SISTEMA DE ALERTAS SIN REDIRECCIÓN A NUEVA RUTA /
            res.status(500).send('IMPOSIBLE INGRESAR')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = controller