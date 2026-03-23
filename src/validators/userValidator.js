/**
 * @file userValidator.js
 * @description Validadores para datos de usuario
 */

/**
 * Valida que los datos de login sean válidos
 * @param {Object} user - Objeto con credenciales del usuario
 * @param {string} user.username - Nombre de usuario
 * @param {string} user.password - Contraseña
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
const validateLoginInput = (user) => {
    const errors = [];
    
    if (!user) {
        errors.push('Los datos de usuario son requeridos');
        return { isValid: false, errors };
    }
    
    if (!user.username || typeof user.username !== 'string' || user.username.trim() === '') {
        errors.push('El usuario es requerido y debe ser texto');
    }
    
    if (!user.password || typeof user.password !== 'string' || user.password.length === 0) {
        errors.push('La contraseña es requerida');
    }
    
    if (user.username && user.username.length < 3) {
        errors.push('El usuario debe tener al menos 3 caracteres');
    }
    
    if (user.password && user.password.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Valida que los datos de registro sean válidos
 * @param {Object} user - Objeto con datos del usuario a registrar
 * @param {string} user.username - Nombre de usuario
 * @param {string} user.password - Contraseña
 * @param {string} user.pillar - Pilar del usuario
 * @param {string} user.verificationCode - Código de verificación
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
const validateRegistrationInput = (user) => {
    const errors = [];
    
    if (!user) {
        errors.push('Los datos de usuario son requeridos');
        return { isValid: false, errors };
    }
    
    const loginValidation = validateLoginInput(user);
    errors.push(...loginValidation.errors);
    
    if (!user.pillar || typeof user.pillar !== 'string' || user.pillar.trim() === '') {
        errors.push('El pilar es requerido');
    }
    
    if (!user.verificationCode || typeof user.verificationCode !== 'string') {
        errors.push('El código de verificación es requerido');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateLoginInput,
    validateRegistrationInput
};
