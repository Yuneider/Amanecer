const controller = {}
const userController = require('../dbControllers/userController')
const pamatereController = require('../dbControllers/parameterController')
const mailer = require('../util/mailer')

const crypto = require('crypto')
const directoryController = require('../dbControllers/directoryController')
let navItemSelected

controller.index = (req, res) => {
    navItemSelected = 'login'
    res.render('login', { navItemSelected })
}

controller.signin = async (req, res) => {
    try {
        generateSecurityCode()
        navItemSelected = 'signin'
        res.render('signin', { navItemSelected })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

controller.checkUser = async (req, res) => {
    try {
        const user = req.body
        const validUser = await userController.checkUser(user)
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

generateSecurityCode = async () => {
    try {
        // SECURITY CODE GENERATED AND UPDATED
        const securityCode = crypto.randomBytes(4).toString('hex')
        // EMAIL PARAMETERS BETWEEN 100 AND 103
        await pamatereController.updateParameter(100, securityCode)
        const to = await pamatereController.getParameter(101)
        const subject = await pamatereController.getParameter(102)
        const body = await pamatereController.getParameter(103)
        mailer.sendMail(to.value, subject.value, body.value + securityCode)
    } catch (error) {
        throw new Error('❌ Error generating security code ' + error.message)
    }
}

controller.checkSignin = async (req, res) => {
    const user = req.body
    user.id_role = 1
    try {
        const securityCode = await pamatereController.getParameter(100)
        if (!user.verificationCode.localeCompare(securityCode.value) === 0) {
            throw new Error('❌ Wrong security code')
        }
        if (await userController.getUser(user.username)) {
            throw new Error('❌ User already registered')
        }
        if (await directoryController.getDirectory(user.id)) {
            throw new Error('❌ Directory already registered')
        }
        await userController.insertUser(user)
        await directoryController.insertDirectory(user)
        navItemSelected = 'login'
        res.render('login', { navItemSelected })
    } catch (error) {
        //TODO: SISTEMA PARA MOSTRAR ERRORES / ALERTAS
        res.status(500).send(error.message)
    }
}

module.exports = controller