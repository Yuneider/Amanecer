const controller = {}
const path = require('path')
const userController = require('../dbControllers/userController')

controller.landginPage = (req, res) => {
    res.render('landginPage')
}

controller.getUsers = async (req, res) => {
    try {
        const users = await userController.getUsers()
        if (users.length == 0) {
            res.send('❌ No users found')
        } else {
            res.json(users)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = controller