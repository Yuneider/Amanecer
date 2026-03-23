/**
 * @file errorHandler.js
 * @description Middleware centralizado para manejo de errores
 */

const { ERROR_MESSAGES, ALERT_TYPES } = require('../constants/appConstants');

/**
 * Middleware de manejo centralizado de errores
 * @param {Error} err - Error capturado
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Siguiente middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error('❌ Error capturado:', {
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString()
    });
    
    // Error con estado personalizado
    const statusCode = err.statusCode || 500;
    const message = err.message || ERROR_MESSAGES.INTERNAL_ERROR;
    
    // Enviar respuesta de error
    res.status(statusCode).json({
        success: false,
        error: message,
        timestamp: new Date().toISOString()
    });
};

/**
 * Middleware para capturar rutas no encontradas
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Siguiente middleware
 */
const notFound = (req, res, next) => {
    const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Crea un error personalizado
 * @param {string} message - Mensaje de error
 * @param {number} statusCode - Código de estado HTTP
 * @returns {Error} Error personalizado
 */
const createError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

module.exports = {
    errorHandler,
    notFound,
    createError
};
