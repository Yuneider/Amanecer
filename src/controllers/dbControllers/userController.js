const user = require('../../models/userModel')
const userController = {}

userController.getUsers = async () => {
    try {
        return await user.findAll()
    } catch (error) {
        throw new Error('❌ Error getting users: ' + error.message)
    }
}

userController.checkUser = async (username, password) => {
    console.log('⚠️  Logging user: ' + username)
    const userLogin = await user.findOne({ where: { username: username } });
    if (userLogin && userLogin.password === password) {
        return true
    } else {
        return false
    }
}



module.exports = userController