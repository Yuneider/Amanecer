const User = require('../../models/userModel')
const userController = {}

userController.getUsers = async () => {
    try {
        return await User.findAll()
    } catch (error) {
        throw new Error('❌ Error getting users: ' + error.message)
    }
}

userController.checkUser = async (username, password) => {
    console.log('⚠️  Logging user: ' + username)
    const userLogin = await User.findOne({ where: { username: username } });
    if (userLogin && userLogin.password === password) {
        return true
    } else {
        return false
    }

}

module.exports = userController