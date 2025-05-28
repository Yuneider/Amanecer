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
        pamatereController.updateParameter(1, crypto.randomBytes(4).toString('hex'))
        // EMAIL PARAMETERS 
        //TODO: OBTENER PARAMETROS DE LA BASE DE DATOS
        const to = 'yparada22@gmail.com'
        const subject = 'Prueba'
        const body = 'Esto es una prueba'
        mailer.sendMail(to, subject, body)
        res.json('✅ Parameter updated')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

controller.checkSignin = (req, res) => {
    try {
        const {
            id, idType,
            name, phone,
            email, role,
            username, password,
            pillar, verificationCode
        } = req.body
        //TODO: VALIDAR SI EL CÓDIGO INGRESADO CONCUERDA CON EL CÓDIGO UBICADO EN LA TABLA DE PARAMETROS
        navItemSelected = 'login'
        res.render('login', { navItemSelected })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = controller