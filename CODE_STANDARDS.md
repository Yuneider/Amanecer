"""# 📐 Guía de Estándares de Código - Amanecer

**Este documento define los estándares de código, convenciones de nombres y mejores prácticas para el proyecto Amanecer.**

---

## 1. 📝 Estructura de Archivos

### Nombres de Archivos

```
✅ CORRECTO                          ❌ INCORRECTO
userController.js                    UserController.js
userValidator.js                     userValidatior.js (typo)
appConstants.js                      APP_CONSTANTS.js
errorHandler.js                      error-handler.js
database.js                          _database.js
```

**Regla**: `camelCase` para archivos JavaScript

---

### Estructura de Directorios

```
src/
├── models/              # Modelos Sequelize
├── controllers/
│   ├── pageControllers/ # Controladores de vistas
│   └── dbControllers/   # Controladores de BD
├── routes/              # Rutas Express
├── middleware/          # Middlewares personalizados
├── validators/          # Validadores de entrada
├── constants/           # Constantes globales
├── utils/               # Funciones utilitarias
├── config/              # Configuración
└── public/
    ├── css/             # Estilos
    ├── js/              # JavaScript cliente
    ├── assets/          # Imágenes, fuentes
    └── views/           # Plantillas Pug
```

---

## 2. 💬 Convenciones de Nombres

### Variables

```javascript
✅ CORRECTO                          ❌ INCORRECTO
const userName = 'john';             const user_name = 'john';
const isActive = true;               const is_Active = true;
const userList = [];                 const list = [];
const maxRetries = 3;                const mrx = 3;
```

**Regla**: `camelCase` | Nombres descriptivos | Plural para arrays

### Constantes

```javascript
✅ CORRECTO                          ❌ INCORRECTO
const MAX_RETRIES = 3;               const maxRetries = 3;
const DEFAULT_PORT = 3307;           const port = 3307;
const ALERT_TYPES = {...};           const AT = {...};
```

**Regla**: `UPPER_SNAKE_CASE` | Valores inmutables

### Funciones

```javascript
✅ CORRECTO                          ❌ INCORRECTO
async function connectDB() {}        async function connectdb() {}
const validateInput = () => {};      const input_validate = () => {};
const getUser = (id) => {};          const user = (id) => {};
```

**Regla**: `camelCase` | Verbos descriptivos | Async para funciones asincrónicas

### Clases

```javascript
✅ CORRECTO                          ❌ INCORRECTO
class UserController {}              class user_controller {}
class DatabaseConnection {}          class DBCon {}
```

**Regla**: `PascalCase`

---

## 3. 📋 Convención de Comentarios

### JSDoc para Funciones

```javascript
/**
 * Descripción breve de la función
 * 
 * Descripción más detallada si es necesario (2-3 líneas)
 * 
 * @param {type} paramName - Descripción del parámetro
 * @param {type} otherParam - Descripción
 * @returns {type} Descripción del retorno
 * @throws {Error} Descripción del error
 * @async
 * @example
 * const result = await functionName(param);
 */
async function functionName(paramName, otherParam) {
    // implementación
}
```

### Ejemplo Real

```javascript
/**
 * Valida que los datos de login sean válidos
 * 
 * @param {Object} user - Objeto con credenciales del usuario
 * @param {string} user.username - Nombre de usuario
 * @param {string} user.password - Contraseña
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
const validateLoginInput = (user) => {
    // ...
};
```

### Comentarios en Línea

```javascript
// ✅ CORRECTO - Comentario claro
const maxRetries = 3;  // Máximo número de reintentos

// ❌ INCORRECTO - Comentario innecesario
const x = 3;  // asignar 3 a x

// ✅ CORRECTO - Explicar "por qué", no "qué"
setTimeout(() => {
    // Esperar antes de reintentar para no sobrecargar servidor
    reconnect();
}, 1000);
```

### Secciones de Código

```javascript
// ============================================
// SECCIÓN IMPORTANTE
// ============================================

// Subsección
// ---

// Comentario simple
```

---

## 4. 🔧 Control de Flujo

### Try-Catch

```javascript
✅ CORRECTO
try {
    const result = await operation();
    logger.success('Operación exitosa');
    return result;
} catch (error) {
    logger.error('Error en operación', error.message);
    throw new Error('Error operación: ' + error.message);
}

❌ INCORRECTO
try {
    await operation();
} catch (e) {
    console.log('error'); // Sin contexto
}
```

### Validación de Entrada

```javascript
✅ CORRECTO
if (!user || !user.username) {
    throw new Error('Username requerido');
}

❌ INCORRECTO
if (user && user.username) {
    // procesamiento
}
// Sin manejo de caso negativo
```

---

## 5. 🔐 Seguridad

### Variables Sensibles

```javascript
// ✅ Usar variables de entorno
const apiKey = process.env.API_KEY;

// ❌ Nunca hardcodear
const apiKey = 'sk-1234567890abcdef';

// ❌ Nunca commitar .env
// En .gitignore:
.env
.env.local
```

### Validación Obligatoria

```javascript
// ✅ SIEMPRE validar entrada
const { validateLoginInput } = require('.../validators');
const validation = validateLoginInput(req.body);
if (!validation.isValid) {
    return res.status(400).json({ errors: validation.errors });
}

// ❌ NUNCA usar entrada sin validar
res.render(req.body.viewName, req.body);
```

---

## 6. 🎯 Mejores Prácticas

### Funciones Pequeñas

```javascript
// ✅ Función pequeña y enfocada
const calculateDiscount = (price, percentage) => {
    return price * (1 - percentage / 100);
};

// ❌ Función muy grande con lógica mixta
const processOrder = (order, user) => {
    // 50+ líneas de lógica...
};
```

### DRY - Don't Repeat Yourself

```javascript
// ❌ REPETIDO
const user1 = await User.findOne({ where: { id: 1 } });
const user2 = await User.findOne({ where: { id: 2 } });
const user3 = await User.findOne({ where: { id: 3 } });

// ✅ REUTILIZABLE
const getUserById = async (id) => {
    return await User.findOne({ where: { id } });
};

const users = await Promise.all([1, 2, 3].map(getUserById));
```

### Logging Consistente

```javascript
// ✅ Usar logger centralizado
const logger = require('./middleware/logger');
logger.info('Operación iniciada');
logger.success('Operación completada');
logger.warn('Advertencia detectada');
logger.error('Error crítico', error);

// ❌ Mezclar console.log
console.log('...');
console.error('...');
console.warn('...');
```

---

## 7. 📐 Estructuración de Módulos

### Exportación de Módulos

```javascript
// ✅ Exportar objeto con métodos
const controller = {};
controller.method1 = async () => {};
controller.method2 = () => {};
module.exports = controller;

// ✅ Exportar directo
module.exports = {
    method1: async () => {},
    method2: () => {}
};

// ❌ Exportar función anónima
module.exports = () => {};
```

### Importación

```javascript
// ✅ Importar con ruta relativa clara
const userController = require('../controllers/userController');

// ✅ Destructuración cuando proceda
const { validateLoginInput } = require('../validators/userValidator');

// ❌ Rutas confusas
const userController = require('../../../../../../controllers/userController');
```

---

## 8. 🧪 Testing

### Tests Unitarios

```javascript
describe('validateLoginInput', () => {
    it('debe retornar error si username está vacío', () => {
        const result = validateLoginInput({ username: '', password: 'pass' });
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('El usuario es requerido');
    });

    it('debe validar correctamente datos válidos', () => {
        const result = validateLoginInput({ username: 'user123', password: 'pass123' });
        expect(result.isValid).toBe(true);
        expect(result.errors.length).toBe(0);
    });
});
```

---

## 9. 📊 Rendimiento

### Operaciones de BD

```javascript
// ❌ MALO - N+1 queries
const users = await User.findAll();
for (const user of users) {
    const notes = await Note.findAll({ where: { userId: user.id } });
    // ...
}

// ✅ BUENO - Eager loading
const users = await User.findAll({
    include: [{ association: 'notes' }]
});
```

### Async/Await

```javascript
// ✅ CORRECTO - Async/Await legible
const fetchData = async () => {
    try {
        const user = await User.findById(1);
        const notes = await user.getNotes();
        return { user, notes };
    } catch (error) {
        logger.error('Error', error);
    }
};

// ✅ PARALELO cuando es posible
const [users, roles] = await Promise.all([
    User.findAll(),
    Role.findAll()
]);
```

---

## 10. 🚫 Checklist de Antes de Commit

Antes de hacer commit, verifica:

- [ ] ✅ Código indentado correctamente (4 espacios)
- [ ] ✅ Nombres de variables/funciones son descriptivos
- [ ] ✅ JSDoc en todas las funciones públicas
- [ ] ✅ Comentarios en lógica compleja
- [ ] ✅ Sin `console.log` directo (usar logger)
- [ ] ✅ Validación de entrada en funciones
- [ ] ✅ Try-catch donde proceda
- [ ] ✅ No hay hardcoded secrets/keys
- [ ] ✅ `.env` no está en el commit
- [ ] ✅ Tests pasan (si existen)
- [ ] ✅ No hay variables no usadas
- [ ] ✅ Sin TODOs sin razón clara

---

## 📎 Recursos

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Versión**: 1.0.0  
**Última actualización**: Marzo 2026
"""
