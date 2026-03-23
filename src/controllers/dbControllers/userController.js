/**
 * @file userController.js
 * @description Controlador para operaciones de usuarios en la base de datos
 * 
 * Responsabilidades:
 * - Obtener usuarios (único o todos)
 * - Verificar credenciales
 * - Crear nuevos usuarios
 * - Eliminar usuarios
 */

const userModel = require('../../models/userModel');
const logger = require('../../middleware/logger');

const userController = {};

/**
 * Obtiene todos los usuarios de la base de datos
 * 
 * @async
 * @returns {Promise<Array>} Lista de todos los usuarios
 * @throws {Error} Si hay error en la consulta
 */
userController.getUsers = async () => {
    try {
        logger.info('Obteniendo todos los usuarios');
        const users = await userModel.findAll();
        logger.success(`✅ ${users.length} usuarios obtenidos`);
        return users;
    } catch (error) {
        logger.error('Error obteniendo usuarios', error.message);
        throw new Error('Error obteniendo usuarios: ' + error.message);
    }
};

/**
 * Obtiene un usuario específico por nombre de usuario
 * 
 * @async
 * @param {string} username - Nombre de usuario a buscar
 * @returns {Promise<Object|null>} Objeto usuario o null si no existe
 * @throws {Error} Si hay error en la consulta
 */
userController.getUser = async (username) => {
    try {
        if (!username) {
            throw new Error('El nombre de usuario es requerido');
        }
        
        logger.info(`Buscando usuario: ${username}`);
        const user = await userModel.findOne({
            where: { username: username }
        });
        
        if (user) {
            logger.success(`✅ Usuario encontrado: ${username}`);
        } else {
            logger.warn(`Usuario no encontrado: ${username}`);
        }
        
        return user;
    } catch (error) {
        logger.error('Error obteniendo usuario', error.message);
        throw new Error('Error obteniendo usuario: ' + error.message);
    }
};

/**
 * Verifica las credenciales de un usuario (login)
 * 
 * ⚠️ IMPORTANTE: Las contraseñas se comparan en texto plano
 * TODO: Implementar encriptación con bcrypt
 * 
 * @async
 * @param {Object} credentials - Objeto con credenciales
 * @param {string} credentials.username - Nombre de usuario
 * @param {string} credentials.password - Contraseña
 * @returns {Promise<boolean>} true si credenciales son válidas, false en caso contrario
 * @throws {Error} Si hay error en la consulta
 */
userController.checkUser = async ({ username, password }) => {
    try {
        if (!username || !password) {
            logger.warn('Faltan credenciales para verificación');
            return false;
        }
        
        logger.info(`Verificando credenciales de: ${username}`);
        const userLogin = await userModel.findOne({
            where: { username: username }
        });
        
        if (userLogin && userLogin.password === password) {
            logger.success(`✅ Login válido para: ${username}`);
            return true;
        } else {
            logger.warn(`❌ Credenciales inválidas para: ${username}`);
            return false;
        }
    } catch (error) {
        logger.error('Error verificando usuario', error.message);
        throw new Error('Error verificando usuario: ' + error.message);
    }
};

/**
 * Crea un nuevo usuario en la base de datos
 * 
 * @async
 * @param {Object} userData - Datos del nuevo usuario
 * @param {string} userData.username - Nombre de usuario
 * @param {string} userData.password - Contraseña
 * @param {string} userData.pillar - Pilar del usuario
 * @returns {Promise<Object>} Usuario creado
 * @throws {Error} Si hay error en la creación
 */
userController.insertUser = async ({ username, password, pillar }) => {
    try {
        if (!username || !password || !pillar) {
            throw new Error('Los datos del usuario son incompletos');
        }
        
        logger.info(`Creando nuevo usuario: ${username}`);
        const newUser = await userModel.create({
            username: username,
            password: password,
            pillar: pillar
        });
        
        logger.success(`✅ Usuario creado: ${username}`);
        return newUser;
    } catch (error) {
        logger.error('Error creando usuario', error.message);
        throw new Error('Error creando usuario: ' + error.message);
    }
};

/**
 * Elimina un usuario de la base de datos
 * 
 * @async
 * @param {string} username - Nombre del usuario a eliminar
 * @returns {Promise<number>} Número de usuarios eliminados (typically 0 or 1)
 * @throws {Error} Si hay error en la eliminación
 */
userController.deleteUser = async (username) => {
    try {
        if (!username) {
            throw new Error('El nombre de usuario es requerido');
        }
        
        logger.info(`Eliminando usuario: ${username}`);
        const deletedCount = await userModel.destroy({
            where: { username: username }
        });
        
        if (deletedCount > 0) {
            logger.success(`✅ Usuario eliminado: ${username}`);
        } else {
            logger.warn(`Usuario no encontrado para eliminar: ${username}`);
        }
        
        return deletedCount;
    } catch (error) {
        logger.error('Error eliminando usuario', error.message);
        throw new Error('Error eliminando usuario: ' + error.message);
    }
};

module.exports = userController;
