const Parameter = require('../../models/parameterModel')
const parameterController = {}

parameterController.getParameters = async () => {
    try {
        return await Parameter.findAll()
    } catch (error) {
        throw new Error('❌ Error getting parameters: ' + error.message)
    }
}

module.exports = parameterController