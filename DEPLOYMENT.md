# 🚀 Guía de Despliegue - Proyecto Amanecer

**Instrucciones para desplegar Amanecer en desarrollo y producción**

---

## 📋 Tabla de Contenidos

1. [Desarrollo Local](#desarrollo-local)
2. [Pre-requisitos de Producción](#pre-requisitos-de-producción)
3. [Despliegue a Servidor](#despliegue-a-servidor)
4. [Configuración en Producción](#configuración-en-producción)
5. [Monitoreo y Logs](#monitoreo-y-logs)
6. [Troubleshooting](#troubleshooting)

---

## 🖥️ Desarrollo Local

### 1. Instalación Inicial

```bash
# Clonar repositorio
git clone https://github.com/Yuneider/Amanecer.git
cd Amanecer

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env
```

### 2. Configurar .env

```env
# Basado en .env.example
PORT=3307
HOST=localhost
DATABASE=amanecer
USER=root
PASSWORD=tu_contraseña_mysql

# Opcional - Mailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña_app
```

### 3. Preparar Base de Datos

```bash
# Conectar a MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE amanecer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 4. Iniciar Aplicación

```bash
# Desarrollo con nodemon (recarga automática)
npm start

# Producción (sin recarga)
NODE_ENV=production node server.js
```

### 5. Verificar Funcionamiento

```bash
# Abrir en navegador
http://localhost:3307

# Ver logs del servidor
- Logs en consola Terminal

# Verificar conexión BD
- Mensaje: "✅ Conectado a la base de datos"
```

---

## 🏗️ Pre-requisitos de Producción

### Hardware Mínimo Recomendado

| Recurso | Mínimo | Recomendado |
|---------|--------|-------------|
| CPU | 1 core | 2-4 cores |
| RAM | 512 MB | 2-4 GB |
| Almacenamiento | 10 GB | 50+ GB |
| Ancho banda | 1 Mbps | 10+ Mbps |

### Software Requerido

```bash
# Node.js v14+
node --version

# npm v6+
npm --version

# MySQL v5.7+
mysql --version

# Git
git --version
```

### Instalar Node.js en Servidor

**Ubuntu/Debian**:
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**CentOS/RHEL**:
```bash
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs
```

### Instalar MySQL en Servidor

**Ubuntu/Debian**:
```bash
sudo apt-get update
sudo apt-get install -y mysql-server
sudo mysql_secure_installation
```

**CentOS/RHEL**:
```bash
sudo yum install -y mysql-server
sudo systemctl start mysqld
```

---

## 📤 Despliegue a Servidor

### Opción 1: Manual

```bash
# 1. Conectar al servidor
ssh usuario@tu_servidor.com

# 2. Clonar repositorio
cd /home/usuario/
git clone https://github.com/Yuneider/Amanecer.git
cd Amanecer

# 3. Instalar dependencias
npm install --production

# 4. Configurar variables de entorno
nano .env

# 5. Crear base de datos
mysql -u root -p < database.sql

# 6. Ejecutar aplicación con PM2
npm install -g pm2
pm2 start server.js --name "amanecer"
pm2 startup
pm2 save
```

### Opción 2: Con PM2 (Recomendado)

PM2 mantiene la aplicación corriendo permanentemente

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Crear configuración PM2
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'amanecer',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3307
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log'
  }]
};
EOF

# Ejecutar con PM2
pm2 start ecosystem.config.js

# Hacer que PM2 inicie al boot
pm2 startup systemd -u usuario --hp /home/usuario
pm2 save
```

### Opción 3: Docker (Avanzado)

```dockerfile
# Crear Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV PORT=3307
EXPOSE 3307

CMD ["node", "server.js"]
```

```bash
# Construir imagen
docker build -t amanecer:1.0 .

# Ejecutar contenedor
docker run -d \
  --name amanecer \
  -p 3307:3307 \
  -e DATABASE=amanecer \
  -e USER=root \
  -e PASSWORD=contraseña \
  amanecer:1.0
```

---

## ⚙️ Configuración en Producción

### 1. Variables de Entorno

```bash
# Crear .env.production
cat > .env.production << EOF
# SERVIDOR
PORT=3307
NODE_ENV=production

# BD
HOST=localhost
DATABASE=amanecer
USER=amanecer_user
PASSWORD=contraseña_fuerte_aqui

# CORREO (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=proyecto@gmail.com
SMTP_PASS=contraseña_app_especial

# LOGS
LOG_LEVEL=warn
EOF
```

### 2. Seguridad

#### Firewall
```bash
# Abrir solo puertos necesarios
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3307/tcp  # Node app
sudo ufw enable
```

#### SSL/HTTPS con Let's Encrypt

```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generar certificado
sudo certbot certonly --standalone \
  -d tu_dominio.com \
  --agree-tos \
  -n -m tu_email@gmail.com

# Certificados en: /etc/letsencrypt/live/tu_dominio.com/
```

#### Nginx como Reverse Proxy

```nginx
# /etc/nginx/sites-available/amanecer

upstream amanecer_app {
    server localhost:3307;
}

server {
    listen 80;
    server_name tu_dominio.com;
    
    # Redirect HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name tu_dominio.com;
    
    # SSL
    ssl_certificate /etc/letsencrypt/live/tu_dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tu_dominio.com/privkey.pem;
    
    location / {
        proxy_pass http://amanecer_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar configuración Nginx
sudo ln -s /etc/nginx/sites-available/amanecer \
           /etc/nginx/sites-enabled/

# Probar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### 3. Base de Datos

```sql
-- Crear usuario BD específico para producción
CREATE USER 'amanecer_user'@'localhost' IDENTIFIED BY 'contraseña_fuerte';

-- Dar permisos
GRANT ALL PRIVILEGES ON amanecer.* TO 'amanecer_user'@'localhost';
FLUSH PRIVILEGES;

-- Backup automático
0 2 * * * mysqldump -u amanecer_user -p amanecer > /backups/amanecer_`date +\%Y\%m\%d`.sql
```

---

## 📊 Monitoreo y Logs

### PM2 Monitoreo

```bash
# Dashboard en tiempo real
pm2 monit

# Ver logs
pm2 logs amanecer

# Guardar logs
pm2 save

# Reiniciar si crash
pm2 unstable
```

### Logs de Aplicación

```bash
# Ver logs de error
tail -f logs/pm2-error.log

# Ver logs de output
tail -f logs/pm2-out.log

# Logs con timestamp
tail -f logs/pm2-error.log | grep "$(date +%Y-%m-%d)"
```

### Monitoreo de Recursos

```bash
# Usar New Relic (recomendado)
npm install newrelic

# O usar PM2 Plus
pm2 plus

# O Datadog
npm install --save dd-trace
```

---

## 🐛 Troubleshooting

### Error: PORT 3307 already in use

```bash
# Encontrar proceso
lsof -i :3307

# Matar proceso
kill -9 <PID>

# O cambiar puerto
PORT=3308 node server.js
```

### Error: Cannot find module

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: Cannot connect to database

```bash
# Verificar MySQL corriendo
sudo systemctl status mysql

# Conexión de prueba
mysql -h localhost -u amanecer_user -p amanecer

# Ver logs MySQL
tail -f /var/log/mysql/error.log
```

### Error: EACCES: permission denied

```bash
# Cambiar permisos
chmod -R 755 ~/Amanecer

# Cambiar propietario
chown -R usuario:usuario ~/Amanecer
```

### Aplicación lenta

```bash
# Verificar recursos
pm2 status
top
free -h

# Revisar BD
mysql> SHOW PROCESSLIST;
mysql> SHOW VARIABLES LIKE 'max_connections';
```

---

## 📝 Checklist Pre-Despliegue

- [ ] ✅ Código probado en desarrollo
- [ ] ✅ `.env` configurado correctamente
- [ ] ✅ Base de datos creada
- [ ] ✅ Dependencias instaladas
- [ ] ✅ Tests pasando
- [ ] ✅ SSL/HTTPS configurado
- [ ] ✅ Firewall configurado
- [ ] ✅ Backups de BD programados
- [ ] ✅ Monitoreo configurado
- [ ] ✅ Sistema de logs activo
- [ ] ✅ Plan de actualizaciones
- [ ] ✅ Documentación actualizada

---

## 🔄 Actualizaciones y Mantenimiento

### Actualizar Aplicación

```bash
# Hacer pull del código
git pull origin main

# Instalar nuevas dependencias
npm install

# Reiniciar con PM2
pm2 restart amanecer
```

### Actualizar Dependencias

```bash
# Verificar actualizaciones
npm outdated

# Actualizar todas
npm update

# Actualizar específico
npm install express@latest
```

### Backup de BD

```bash
# Backup manual
mysqldump -u amanecer_user -p amanecer > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar backup
mysql -u amanecer_user -p amanecer < backup_20260101_120000.sql
```

---

**Versión**: 1.0.0  
**Última actualización**: Marzo 2026  
**Estado**: Listo para producción ✅
