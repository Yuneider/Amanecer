/**
 * @file authController.js
 * @description Controlador de autenticación (login/signin)
 * 
 * Maneja:
 * - Páginas de login/signin
 * - Verificación de credenciales
 * - Generación de códigos de seguridad
 * - Creación de nuevos usuarios
 */

const userController = require('../dbControllers/userController');
const parameterController = require('../dbControllers/parameterController');
const directoryController = require('../dbControllers/directoryController');
const mailer = require('../util/mailer');
const logger = require('../../middleware/logger');
const { validateLoginInput, validateRegistrationInput } = require('../../validators/userValidator');
const { SECURITY_CONFIG, VIEW_NAMES, ALERT_TYPES, ERROR_MESSAGES } = require('../../constants/appConstants');
const crypto = require('crypto');

const controller = {};

/**
 * Renderiza la página de login
 * @param {Object} req - Objeto request
 * @param {Object} res - Objeto response
 */
controller.index = (req, res) => {
    const navItemSelected = VIEW_NAMES.LOGIN;
    logger.info('Acceso a página de login');
    res.render(VIEW_NAMES.LOGIN, { navItemSelected });
};

/**
 * Renderiza la página de signin (registro)
 * @param {Object} req - Objeto request
 * @param {Object} res - Objeto response
 * @async
 */
controller.signin = async (req, res) => {
    try {
        await generateSecurityCode();
        const navItemSelected = VIEW_NAMES.SIGNIN;
        logger.info('Acceso a página de signin');
        res.render(VIEW_NAMES.SIGNIN, { navItemSelected });
    } catch (error) {
        logger.error('Error en página de signin', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Verifica las credenciales del usuario
 * @param {Object} req - Objeto request con datos POST
 * @param {string} req.body.username - Nombre de usuario
 * @param {string} req.body.password - Contraseña
 * @param {Object} res - Objeto response
 * @async
 */
controller.checkUser = async (req, res) => {
    try {
        const user = req.body;
        
        // Validar datos de entrada
        const validation = validateLoginInput(user);
        if (!validation.isValid) {
            logger.warn('Datos de login inválidos', validation.errors);
            return res.status(400).render(VIEW_NAMES.LOGIN, {
                navItemSelected: VIEW_NAMES.LOGIN,
                alert: {
                    type: ALERT_TYPES.DANGER,
                    msg: validation.errors[0]
                }
            });
        }
        
        // Verificar usuario
        logger.info(`Verificando usuario: ${user.username}`);
        const validUser = await userController.checkUser(user);
        
        if (validUser) {
            logger.success(`✅ Login exitoso para: ${user.username}`);
            res.render(VIEW_NAMES.LANDING, { navItemSelected: VIEW_NAMES.LANDING });
        } else {
            logger.warn(`Intento de login fallido para: ${user.username}`);
            res.render(VIEW_NAMES.LOGIN, {
                navItemSelected: VIEW_NAMES.LOGIN,
                alert: {
                    type: ALERT_TYPES.DANGER,
                    msg: ERROR_MESSAGES.INVALID_CREDENTIALS
                }
            });
        }
    } catch (error) {
        logger.error('Error verificando usuario', error.message);
        res.status(500).json({ success: false, error: ERROR_MESSAGES.INTERNAL_ERROR });
    }
};

/**
 * Genera un código de seguridad y lo envía por correo
 * @returns {Promise<void>}
 * @throws {Error} Si hay error en la generación o envío del código
 * @private
 */
const generateSecurityCode = async () => {
    try {
        // Generar código de 4 caracteres hexadecimales
        const securityCode = crypto
            .randomBytes(SECURITY_CONFIG.SECURITY_CODE_LENGTH)
            .toString('hex');
        
        // Guardar código en parámetros de BD
        const paramId = SECURITY_CONFIG.PARAMETER_EMAIL_RANGE.MIN;
        await parameterController.updateParameter(paramId, securityCode);
        
        // Obtener datos de correo
        const toParam = await parameterController.getParameter(101);
        const subjectParam = await parameterController.getParameter(102);
        const bodyParam = await parameterController.getParameter(103);
        
        // Enviar correo con código
        const to = toParam.value;
        const subject = subjectParam.value;
        const body = bodyParam.value + securityCode;
        
        await mailer.sendMail(to, subject, body);
        logger.success('✅ Código de seguridad enviado por correo');
    } catch (error) {
        logger.error('Error generando código de seguridad', error.message);
        throw new Error('Error generando código de seguridad: ' + error.message);
    }
};

/**
 * Verifica el registro de un nuevo usuario
 * @param {Object} req - Objeto request con datos POST
 * @param {string} req.body.username - Nombre de usuario
 * @param {string} req.body.password - Contraseña
 * @param {string} req.body.pillar - Pilar del usuario
 * @param {string} req.body.verificationCode - Código de verificación
 * @param {Object} res - Objeto response
 * @async
 */
controller.checkSignin = async (req, res) => {
    try {
        const user = req.body;
        user.id_role = SECURITY_CONFIG.DEFAULT_USER_ROLE;
        
        // Validar datos de entrada
        const validation = validateRegistrationInput(user);
        if (!validation.isValid) {
            logger.warn('Datos de registro inválidos', validation.errors);
            return res.status(400).render(VIEW_NAMES.SIGNIN, {
                navItemSelected: VIEW_NAMES.SIGNIN,
                alert: {
                    type: ALERT_TYPES.DANGER,
                    msg: validation.errors[0]
                }
            });
        }
        
        // Verificar código de seguridad
        logger.info(`Verificando registro de usuario: ${user.username}`);
        const securityCodeParam = await parameterController.getParameter(101);
        
        if (user.verificationCode !== securityCodeParam.value) {
            logger.warn('Código de seguridad inválido');
            throw new Error(ERROR_MESSAGES.INVALID_SECURITY_CODE);
        }
        
        // Verificar que el usuario no exista
        if (await userController.getUser(user.username)) {
            logger.warn(`Usuario ya existe: ${user.username}`);
            throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
        }
        
        // Verificar que el directorio no exista
        if (await directoryController.getDirectory(user.id)) {
            logger.warn(`Directorio ya existe para: ${user.id}`);
            throw new Error(ERROR_MESSAGES.DIRECTORY_EXISTS);
        }
        
        // Crear usuario y directorio
        await userController.insertUser(user);
        await directoryController.insertDirectory(user);
        
        logger.success(`✅ Nuevo usuario registrado: ${user.username}`);
        res.render(VIEW_NAMES.LOGIN, { navItemSelected: VIEW_NAMES.LOGIN });
    } catch (error) {
        logger.error('Error en registro de usuario', error.message);
        res.status(500).render(VIEW_NAMES.SIGNIN, {
            navItemSelected: VIEW_NAMES.SIGNIN,
            alert: {
                type: ALERT_TYPES.DANGER,
                msg: error.message || ERROR_MESSAGES.INTERNAL_ERROR
            }
        });
    }
};

module.exports = controller;
