const parameter = require('../../models/parameterModel')
const parameterController = {}

parameterController.getParameters = async () => {
    try {
        return await parameter.findAll()
    } catch (error) {
        throw new Error('❌ Error getting parameters: ' + error.message)
    }
}

module.exports = parameterController