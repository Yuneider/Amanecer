/**
 * @file logger.js
 * @description Sistema de logging para la aplicación
 */

/**
 * Formatea y registra mensajes en consola
 * @param {string} level - Nivel de log (INFO, WARN, ERROR, SUCCESS)
 * @param {string} message - Mensaje a registrar
 * @param {Object} data - Datos adicionales (opcional)
 */
const log = (level, message, data = null) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}`;
    
    if (data) {
        console.log(logMessage, data);
    } else {
        console.log(logMessage);
    }
};

const logger = {
    info: (msg, data) => log('INFO', msg, data),
    warn: (msg, data) => log('WARN', msg, data),
    error: (msg, data) => log('ERROR', msg, data),
    success: (msg, data) => log('SUCCESS', msg, data)
};

module.exports = logger;
