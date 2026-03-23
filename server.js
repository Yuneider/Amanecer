//*====================================
//* TO START XAMPP => sudo /opt/lampp/lampp start
//* TO CHECK XAMPP => sudo /opt/lampp/lampp status
//* TO START SERVER => npm start
//*====================================

/**
 * @file server.js
 * @description Punto de entrada de la aplicación Amanecer
 * 
 * Este archivo:
 * - Carga variables de entorno
 * - Inicializa la aplicación Express
 * - Conecta a la base de datos
 * - Sincroniza modelos de Sequelize
 * - Inicia el servidor en el puerto especificado
 */

require('dotenv').config()

const app = require('./src/app')
const { connectDB, sequelize } = require('./src/config/database')
const logger = require('./src/middleware/logger')

const PORT = process.env.PORT || 3307

// ============================================
// INICIALIZACIÓN
// ============================================

/**
 * Inicia la aplicación
 */
const startServer = async () => {
    try {
        logger.info('🚀 Iniciando aplicación Amanecer...')
        
        // Conectar a base de datos
        logger.info('Conectando a base de datos...')
        await connectDB()
        
        // Sincronizar modelos Sequelize con la BD
        logger.info('Sincronizando base de datos...')
        await sequelize.sync()
        logger.success('✅ Base de datos sincronizada')
        
        // Iniciar servidor
        app.listen(PORT, () => {
            logger.success(`✅ Servidor escuchando en puerto ${PORT}`)
            logger.info(`🌐 Acceder a: http://localhost:${PORT}`)
        })
    } catch (error) {
        logger.error('Error crítico iniciando la aplicación', error.message)
        process.exit(1)
    }
}

// Ejecutar inicialiación
startServer()
