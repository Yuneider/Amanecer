const parameter = require('../../models/parameterModel')
const parameterController = {}

parameterController.getParameters = async () => {
    try {
        return await parameter.findAll()
    } catch (error) {
        throw new Error('❌ Error getting parameters: ' + error.message)
    }
}

parameterController.getParameter = async (id) => {
    try {
        return await parameter.findByPk(id)
    } catch (error) {
        throw new Error('❌ Error getting parameters: ' + error.message)
    }
}

parameterController.updateParameter = async (p_id, p_value) => {
    try {
        parameter.update(
            { value: p_value },
            { where: { id: p_id } }
        )
    } catch (error) {
        throw new Error('❌ Error updating parameters: ' + error.message)
    }
}

module.exports = parameterController