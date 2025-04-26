const User = require('../../models/userModel')
const userController = {}

userController.getUsers = async () => {
    try {
        return await User.findAll()
    } catch (error) {
        throw new Error('ERROR GETTING USERS: ' + error.message)
    }
}

userController.checkUser = async (req, res) => {
    const { username, password } = req.body
    console.log(`Logging user: ${username}`)

    const userLogin = await User.findOne({ username: username });

    if (userLogin && userLogin.password === password) {
        res.send('Login correcto')
    } else {
        res.send('Datos incorrectos')
    }

}

module.exports = userController