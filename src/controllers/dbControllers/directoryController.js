const Directory = require('../../models/directoryModel')
const directoryController = {}

directoryController.getDirectory = async () => {
    try {
        return await Directory.findAll()
    } catch (error) {
        throw new Error('❌ Error getting directory: ' + error.message)
    }
}

module.exports = directoryController