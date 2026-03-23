/**
 * @file database.js
 * @description Configuración y conexión a la base de datos MySQL con Sequelize
 * 
 * Este módulo:
 * - Configura la conexión a MySQL usando Sequelize ORM
 * - Lee las credenciales de variables de entorno
 * - Exporta funciones para conectar y sincronizar con la BD
 */

require('dotenv').config();

const { Sequelize } = require('sequelize');
const logger = require('../middleware/logger');

// ============================================
// VARIABLES DE ENTORNO
// ============================================

const HOST = process.env.HOST || 'localhost';
const DATABASE = process.env.DATABASE || 'amanecer';
const USER = process.env.USER || 'root';
const PASSWORD = process.env.PASSWORD || '';

// ============================================
// USAR CONFGURACIÓN DE BASE DE DATOS
// ============================================

/**
 * Instancia de Sequelize para conexión MySQL
 * 
 * Configuración:
 * - dialect: 'mysql' - Especifica MySQL como BD
 * - logging: false - Desactiva logs SQL en consola (cambiar a console.log para debug)
 * - host: Servidor de BD
 */
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    logging: false // Cambiar a console.log para ver queries SQL
});

// ============================================
// FUNCIONES DE CONEXIÓN
// ============================================

/**
 * Conecta a la base de datos y verifica la conexión
 * Ejecutar al iniciar la aplicación
 * 
 * @async
 * @returns {Promise<void>}
 * @throws {Error} Si la conexión falla, termina el proceso
 */
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        logger.success('✅ Conectado a la base de datos');
    } catch (error) {
        logger.error('❌ Error conectando a la BD', error.message);
        process.exit(1); // Terminar el proceso si no hay conexión
    }
};

// ============================================
// EXPORTAR MÓDULO
// ============================================

module.exports = {
    sequelize,      // Instancia Sequelize para usar en modelos
    connectDB       // Función para conectar a la BD
};
