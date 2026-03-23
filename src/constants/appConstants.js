/**
 * @file appConstants.js
 * @description Constantes globales de la aplicación
 * @requires dotenv
 */

const APP_CONFIG = {
    PORT: process.env.PORT || 3307,
    HOST: process.env.HOST || 'localhost',
    DATABASE: process.env.DATABASE || 'amanecer',
    DB_USER: process.env.USER || 'root',
    DB_PASSWORD: process.env.PASSWORD || '',
    NODE_ENV: process.env.NODE_ENV || 'development'
};

const SECURITY_CONFIG = {
    SECURITY_CODE_LENGTH: 4,
    PARAMETER_EMAIL_RANGE: { MIN: 100, MAX: 103 },
    DEFAULT_USER_ROLE: 1
};

const VIEW_NAMES = {
    LOGIN: 'login',
    SIGNIN: 'signin',
    LANDING: 'landginPage'
};

const ALERT_TYPES = {
    DANGER: 'danger',
    SUCCESS: 'success',
    WARNING: 'warning',
    INFO: 'info'
};

const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Usuario o contraseña incorrectos',
    USER_ALREADY_EXISTS: 'Usuario ya registrado',
    DIRECTORY_EXISTS: 'Directorio ya registrado',
    INVALID_SECURITY_CODE: 'Código de seguridad inválido',
    DB_CONNECTION_ERROR: 'Error conectando a la base de datos',
    INTERNAL_ERROR: 'Error interno del servidor'
};

module.exports = {
    APP_CONFIG,
    SECURITY_CONFIG,
    VIEW_NAMES,
    ALERT_TYPES,
    ERROR_MESSAGES
};
