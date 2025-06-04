const parameterModel = require('../../models/parameterModel')
const parameterController = {}

parameterController.getParameters = async () => {
    try {
        return await parameterModel.findAll()
    } catch (error) {
        throw new Error('❌ Error getting parameters: ' + error.message)
    }
}

parameterController.getParameter = async (id) => {
    try {
        return await parameterModel.findByPk(id)
    } catch (error) {
        throw new Error('❌ Error getting parameters: ' + error.message)
    }
}

parameterController.updateParameter = async (p_id, p_value) => {
    try {
        parameterModel.update(
            { value: p_value },
            { where: { id: p_id } }
        )
    } catch (error) {
        throw new Error('❌ Error updating parameters: ' + error.message)
    }
}

module.exports = parameterController