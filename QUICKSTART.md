# ⚡ QUICKSTART - Guía Rápida de Inicio

**¿Quieres empezar rápido? Esta es tu guía.**

---

## 5️⃣ Pasos para Empezar en 5 Minutos

### 1. Clonar y Instalar

```bash
git clone https://github.com/Yuneider/Amanecer.git
cd Amanecer
npm install
```

### 2. Configurar Variable de Entorno

```bash
cp .env.example .env
# Editar .env con tus credenciales de MySQL
```

### 3. Crear Base de Datos

```bash
mysql -u root -p
> CREATE DATABASE amanecer CHARACTER SET utf8mb4;
> EXIT;
```

### 4. Iniciar Servidor

```bash
npm start
```

### 5. Acceder

Abre en tu navegador: **http://localhost:3307**

---

## 🎯 Tareas Comunes

### ¿Cómo agregar una ruta nueva?

```javascript
// En src/routes/tuRuta.js
const express = require('express');
const router = express.Router();
const miControlador = require('../controllers/tuControlador');

router.get('/mi-ruta', miControlador.miMetodo);

module.exports = router;
```

```javascript
// En src/app.js - agregar:
app.use(require('./routes/tuRuta'));
```

### ¿Cómo crear un controlador?

```javascript
/**
 * Descripción de qué hace este controlador
 */
const controller = {};

/**
 * Descripción de la función
 * @param {Object} req - Request
 * @param {Object} res - Response
 */
controller.miMetodo = (req, res) => {
    res.json({ mensaje: 'Hola' });
};

module.exports = controller;
```

### ¿Cómo usar el logger?

```javascript
const logger = require('../middleware/logger');

logger.info('Mensaje informativo');
logger.success('Operación exitosa');
logger.warn('Advertencia');
logger.error('Error ocurrido', errorData);
```

### ¿Cómo validar datos?

```javascript
const { validateLoginInput } = require('../validators/userValidator');

const validation = validateLoginInput(req.body);
if (!validation.isValid) {
    return res.status(400).json({ errors: validation.errors });
}
```

### ¿Cómo manejar errores?

```javascript
try {
    const resultado = await miOperacion();
    logger.success('Éxito');
    res.json(resultado);
} catch (error) {
    logger.error('Error en operación', error.message);
    // El middleware errorHandler capturará esto
    next(error);
}
```

---

## 📁 Estructura Esencial

```
src/
├── routes/           👈 Tus rutas aquí
├── controllers/      👈 Lógica aquí
├── models/           👈 Modelos BD aquí
├── middleware/       👈 Middlewares
├── validators/       👈 Validadores
├── constants/        👈 Constantes
└── public/           👈 CSS, JS, imágenes
```

---

## 🔧 Scripts Útiles

```bash
# Iniciar en desarrollo
npm start

# Ver logs en tiempo real
tail -f logs/error.log

# Limpiar instalación
rm -rf node_modules && npm install

# Check código
npm run lint  # (si lo configuras)
```

---

## 🐛 Problemas Comunes

### Error: Cannot find module

```bash
npm install
```

### Error: Port already in use

```bash
# Cambiar puerto en .env
PORT=3308
```

### Error: Connection to database

```bash
# Verificar MySQL está corriendo
# Verificar credenciales en .env
# Verificar base de datos existe
```

---

## 📚 Documentación Completa

- 📖 **README.md** - Documentación general
- 📋 **CODE_STANDARDS.md** - Estándares de código
- 🚀 **DEPLOYMENT.md** - Despliegue
- 🔍 **REFACTORING_NOTES.md** - Cambios realizados
- 📊 **SUMMARY.md** - Resumen ejecutivo

---

## 💡 Ejemplo: Crear Nueva Funcionalidad

### 1. Crear Modelo (si lo necesitas)

```javascript
// src/models/productoModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Producto = sequelize.define('Producto', {
    nombre: DataTypes.STRING,
    precio: DataTypes.DECIMAL(10, 2)
});

module.exports = Producto;
```

### 2. Crear Controlador

```javascript
// src/controllers/dbControllers/productoController.js
const productoModel = require('../../models/productoModel');
const logger = require('../../middleware/logger');

const controller = {};

/**
 * Obtiene todos los productos
 */
controller.getProductos = async () => {
    try {
        logger.info('Obteniendo productos');
        const productos = await productoModel.findAll();
        logger.success(`${productos.length} productos encontrados`);
        return productos;
    } catch (error) {
        logger.error('Error obteniendo productos', error.message);
        throw error;
    }
};

module.exports = controller;
```

### 3. Crear Ruta

```javascript
// src/routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/dbControllers/productoController');

router.get('/products', async (req, res, next) => {
    try {
        const productos = await productoController.getProductos();
        res.json(productos);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
```

### 4. Registrar Ruta

```javascript
// En src/app.js
app.use(require('./routes/productoRoutes'));
```

---

## 🚀 ¡Listo!

Ya tienes todo para comenzar. 

**Próximos pasos**:
1. Leer `README.md` para entender el proyecto
2. Revisar `CODE_STANDARDS.md` para escribir buen código
3. Explorar la estructura en `src/`
4. Crear tu primera ruta

---

**¿Necesitas ayuda?** Revisa la documentación completa o crea un issue en GitHub.

**¡Happy Coding! 🎉**
