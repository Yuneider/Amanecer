/**
 * @file app.js
 * @description Configuración principal de la aplicación Express
 * 
 * Este archivo configura:
 * - Motor de vistas Pug
 * - Archivos estáticos
 * - Middleware de parseo de datos
 * - Rutas de la aplicación
 * - Manejo de errores centralizado
 */

const express = require('express');
const path = require('path');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();

// ============================================
// CONFIGURACIÓN DE UTILIDADES
// ============================================

/**
 * Middleware para parsear datos del formulario
 * extended: true permite parsear datos complejos
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware para parsear JSON
 */
app.use(express.json());

// ============================================
// CONFIGURACIÓN DEL MOTOR DE VISTAS
// ============================================

/**
 * Configurar Pug como motor de vistas
 */
app.set('view engine', 'pug');

/**
 * Establecer la ruta del directorio de vistas
 */
app.set('views', path.join(__dirname, '/public/views'));

// ============================================
// ARCHIVOS ESTÁTICOS
// ============================================

/**
 * Servir archivos estáticos (CSS, JS, imágenes)
 * desde la carpeta /public
 */
app.use(express.static(path.join(__dirname, '/public')));

// ============================================
// RUTAS PRINCIPALES
// ============================================

/**
 * Rutas de autenticación (login/signin)
 */
app.use(require('./routes/authRoutes'));

/**
 * Rutas de la página de inicio
 */
app.use(require('./routes/landingRoutes'));

/**
 * Rutas GET generales
 */
app.use(require('./routes/getRoutes'));

// ============================================
// MANEJO DE ERRORES
// ============================================

/**
 * Middleware para capturar rutas no encontradas
 * Debe estar después de todas las rutas
 */
app.use(notFound);

/**
 * Middleware centralizado de manejo de errores
 * Captura y procesa todos los errores de la aplicación
 */
app.use(errorHandler);

logger.success('✅ Aplicación Express configurada exitosamente');

module.exports = app;
