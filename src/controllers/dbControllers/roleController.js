const role = require('../../models/roleModel')
const roleController = {}

roleController.getRoles = async () => {
    try {
        return await role.findAll()
    } catch (error) {
        throw new Error('❌ Error getting roles: ' + error.message)
    }
}

module.exports = roleController