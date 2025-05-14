const directory = require('../../models/directoryModel')
const directoryController = {}

directoryController.getDirectory = async () => {
    try {
        return await directory.findAll()
    } catch (error) {
        throw new Error('❌ Error getting directory: ' + error.message)
    }
}

module.exports = directoryController