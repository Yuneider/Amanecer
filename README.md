# 🌅 AMANECER

**Sistema de Gestión de Usuarios y Directorio**

Un aplicativo web construido con **Node.js**, **Express** y **MySQL** para la gestión integral de usuarios, roles, directorios y parámetros del sistema.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Problemas Conocidos](#problemas-conocidos)
- [Mejoras Futuras](#mejoras-futuras)
- [Contribuciones](#contribuciones)

---

## ✨ Características

- ✅ **Autenticación de Usuarios** - Login seguro con validación de credenciales
- ✅ **Registro de Usuarios** - Nuevo registro con código de seguridad por correo
- ✅ **Gestión de Roles** - Sistema de roles para control de acceso
- ✅ **Directorio de Usuarios** - Gestión de información de usuarios
- ✅ **Gestión de Notas** - Crear y gestionar notas por usuario
- ✅ **Parámetros del Sistema** - Configuración centralizada de parámetros
- ✅ **Sistema de Alertas** - Notificaciones de éxito, error, advertencia
- ✅ **Responsive Design** - Interfaz optimizada para dispositivos móviles

---

## 🔧 Requisitos Previos

Asegúrate de tener instalados:

- **Node.js** v14 o superior
- **npm** v6 o superior
- **MySQL** v5.7 o superior
- **XAMPP** (opcional, para facilitar MySQL y Apache)

### Verificar Instalación

```bash
# Verificar Node.js
node --version          # v14.0.0 o superior

# Verificar npm
npm --version           # 6.0.0 o superior

# Verificar MySQL
mysql --version         # Ver. 5.7 o superior
```

---

## 📦 Instalación

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/Yuneider/Amanecer.git
cd Amanecer
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno

Copia el archivo `.env.example` y renómbralo a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de MySQL:

```env
PORT=3307
HOST=localhost
DATABASE=amanecer
USER=root
PASSWORD=tu_contraseña
```

### 4️⃣ Crear Base de Datos

Accede a MySQL y ejecuta:

```sql
CREATE DATABASE amanecer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## 🎨 Configuración

### Scripts NPM

```bash
# Iniciar servidor con nodemon (recarga automática)
npm start

# Instalar dependencias
npm install

# Ejecutar setup inicial
chmod +x setup.sh
./setup.sh
```

### XAMPP

Si usas XAMPP, inicia los servicios:

```bash
# Iniciar XAMPP
sudo /opt/lampp/lampp start

# Verificar estado
sudo /opt/lampp/lampp status

# Detener XAMPP
sudo /opt/lampp/lampp stop
```

---

## 📁 Estructura del Proyecto

```
Amanecer/
├── src/
│   ├── app.js                              # Configuración Express
│   ├── config/
│   │   └── database.js                     # Conexión MySQL
│   ├── controllers/
│   │   ├── pageControllers/
│   │   │   ├── authController.js           # Lógica Login/Signin
│   │   │   ├── getController.js            # Controlador GET
│   │   │   └── landingController.js        # Página inicio
│   │   ├── dbControllers/
│   │   │   ├── userController.js           # CRUD usuarios
│   │   │   ├── roleController.js           # CRUD roles
│   │   │   ├── directoryController.js      # Gestión directorios
│   │   │   └── parameterController.js      # Parámetros sistema
│   │   └── util/
│   │       └── mailer.js                   # Servicio de correos
│   ├── middleware/
│   │   ├── errorHandler.js                 # Manejo centralizado errores
│   │   └── logger.js                       # Sistema de logging
│   ├── models/
│   │   ├── userModel.js                    # Modelo usuario
│   │   ├── roleModel.js                    # Modelo rol
│   │   ├── directoryModel.js               # Modelo directorio
│   │   ├── noteModel.js                    # Modelo nota
│   │   └── parameterModel.js               # Modelo parámetro
│   ├── routes/
│   │   ├── authRoutes.js                   # Rutas autenticación
│   │   ├── getRoutes.js                    # Rutas GET
│   │   └── landingRoutes.js                # Rutas landing page
│   ├── validators/
│   │   └── userValidator.js                # Validadores usuario
│   ├── constants/
│   │   └── appConstants.js                 # Constantes globales
│   ├── utils/                              # Utilidades generales
│   └── public/
│       ├── css/
│       │   └── index.css                   # Estilos globales
│       ├── js/
│       │   └── auth.js                     # Lógica cliente
│       ├── assets/
│       │   └── img/                        # Imágenes
│       └── views/
│           ├── login.pug                   # Página login
│           ├── signin.pug                  # Página registro
│           ├── landginPage.pug             # Página inicio
│           ├── templates/
│           │   └── indexTemp.pug           # Plantilla base
│           └── includes/
│               └── indexNav.pug            # Componente nav
├── server.js                               # Punto entrada
├── package.json                            # Dependencias NPM
├── .env.example                            # Template variables entorno
└── .gitignore                              # Archivos ignorados Git
```

---

## 🚀 Uso

### 1️⃣ Iniciar el Servidor

```bash
npm start
```

La aplicación estará disponible en: `http://localhost:3307`

### 2️⃣ Acceder a la Aplicación

- **Login**: `http://localhost:3307/login`
- **Registro**: `http://localhost:3307/signin`
- **Landing**: `http://localhost:3307/landingPage`

### 3️⃣ Crear Primer Usuario

1. Ir a `/signin` (registro)
2. Completar el formulario
3. Se enviará un código de seguridad al correo configurado
4. Ingresar el código para completar el registro
5. Acceder con las credenciales en `/login`

---

## 🔌 API Endpoints

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/login` | Página de login |
| GET | `/signin` | Página de registro |
| POST | `/checkUser` | Verificar credenciales |
| POST | `/checkSignin` | Procesar registro nuevo |

### Rutas GET

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/landingPage` | Página principal |
| GET | `/` | Página de inicio |

---

## ⚠️ Problemas Conocidos

### 1. **Contraseñas en Texto Plano**
- ❌ Las contraseñas se almacenan sin encriptación
- ✅ **SOLUCIÓN**: Implementar bcrypt en `userController.js`

```javascript
const bcrypt = require('bcrypt');
// Hash contraseña: await bcrypt.hash(password, 10)
// Verificar: await bcrypt.compare(password, hashedPassword)
```

### 2. **Sin Validación de Entrada Robusta**
- ❌ Falta validación en algunos controladores
- ✅ **SOLUCIÓN**: Usar `validator` o `joi` para esquemas

### 3. **Logs de SQL Desactivados**
- ℹ️ Para debug, cambiar `logging: false` a `console.log` en `database.js`

### 4. **Sin Protection CSRF**
- ❌ No hay protección contra CSRF
- ✅ **SOLUCIÓN**: Implementar `csurf` middleware

---

## 🔄 Mejoras Futuras

### Seguridad
- [ ] Encriptación de contraseñas con bcrypt
- [ ] Protección CSRF
- [ ] Validación robusta con Joi
- [ ] Helmet para headers seguridad HTTP
- [ ] Rate limiting para login

### Features
- [ ] Autenticación con JWT
- [ ] Recuperación de contraseña
- [ ] Cambio de contraseña
- [ ] Perfil de usuario
- [ ] Historial de actividades
- [ ] Exportación de datos (CSV/PDF)
- [ ] Panel de administración

### Performance
- [ ] Caching con Redis
- [ ] Paginación en listados
- [ ] Índices en base de datos
- [ ] Compresión de respuestas
- [ ] Lazy loading de imágenes

### Testing
- [ ] Unit tests con Jest
- [ ] Integration tests
- [ ] E2E tests con Cypress
- [ ] Coverage > 80%

---

## 👥 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia ISC. Ver `LICENSE` para más detalles.

---

## 📧 Contacto

**Yuneider** - [@GitHub](https://github.com/Yuneider)

**Email**: yuneider@example.com

---

## 📚 Recursos Útiles

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Pug Template Engine](https://pugjs.org/)

---

**Última actualización**: Marzo 2026  
**Versión**: 1.0.0  
**Estado**: En desarrollo 🚀
