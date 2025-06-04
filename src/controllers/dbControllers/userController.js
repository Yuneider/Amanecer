const userModel = require('../../models/userModel')
const userController = {}

userController.getUsers = async () => {
    try {
        return await userModel.findAll()
    } catch (error) {
        throw new Error('❌ Error getting users: ' + error.message)
    }
}

userController.getUser = async (username) => {
    try {
        return await userModel.findOne({
            where: {
                username: username
            }
        })
    } catch (error) {
        throw new Error('❌ Error getting user: ' + error.message)
    }
}

userController.checkUser = async ({ username, password }) => {
    console.log('⚠️  Logging user: ' + username)
    const userLogin = await userModel.findOne({ where: { username: username } });
    if (userLogin && userLogin.password === password) {
        return true
    } else {
        return false
    }
}

userController.insertUser = async ({ username, password, pillar }) => {
    try {
        return await userModel.create({
            username: username,
            password: password,
            pillar: pillar
        })
    } catch (error) {
        throw new Error('❌ Error inserting user: ' + error.message)
    }
}

userController.deleteUser = async (username) => {
    try {
        return await userModel.destroy({
            where: {
                username: username
            }
        })
    } catch (error) {
        throw new Error('❌ Error deleting user: ' + error.message)
    }
}

module.exports = userController