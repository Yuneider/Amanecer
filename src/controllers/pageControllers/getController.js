const controller = {}
const userController = require('../dbControllers/userController')
const directoryController = require('../dbControllers/directoryController')
const parameterController = require('../dbControllers/parameterController')

controller.getDirectory = async (req, res) => {
    try {
        const directory = await directoryController.getDirectory()
        if (directory.length == 0) {
            res.send('❌ No directory found')
        } else {
            res.json(directory)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
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

controller.getParameters = async (req, res) => {
    try {
        const parameters = await parameterController.getParameters()
        if (parameters.length == 0) {
            res.send('❌ No parameters found')
        } else {
            res.json(parameters)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = controller