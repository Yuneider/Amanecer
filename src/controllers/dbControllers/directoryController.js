const directoryModel = require('../../models/directoryModel')
const directoryController = {}

directoryController.getDirectory = async () => {
    try {
        return await directoryModel.findAll()
    } catch (error) {
        throw new Error('❌ Error getting directory: ' + error.message)
    }
}

directoryController.getDirectory = async (id) => {
    try {
        return await directoryModel.findOne({
            where: {
                id: id
            }
        })
    } catch (error) {
        throw new Error('❌ Error getting directory: ' + error.message)
    }
}

directoryController.insertDirectory = async ({
    id, idType, username,
    name, phone, email,
    id_role
}) => {
    try {
        return valInsert = await directoryModel.create({
            id: id,
            idType: idType,
            username: username,
            id_role: id_role,
            name: name,
            phone: phone,
            email: email,
            afiliationDate: new Date()
        })
    } catch (error) {
        throw new Error('❌ Error inserting direcctory: ' + error.message)
    }
}

module.exports = directoryController