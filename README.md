# 🔐 Auth System – Backend

Backend de un sistema de autenticación seguro y moderno, construido con **Node.js + TypeScript + Express + PostgreSQL**, usando **cookies HTTP-only**, **refresh de sesión**, **rate limiting** y una arquitectura preparada para escalar.

Este backend está diseñado para trabajar junto con un frontend en React, manteniendo sesiones persistentes incluso al recargar la página o usar múltiples pestañas.

---

## 🚀 Tecnologías usadas

- **Node.js**
- **TypeScript**
- **Express**
- **PostgreSQL**
- **TypeORM**
- **bcrypt**
- **JWT**
- **cookie-parser**
- **express-rate-limit**
- **dotenv**

---

## 📂 Estructura del proyecto

```bash
src/
├── config/
│   ├── data-source.ts        # Configuración de TypeORM
│   └── env.ts                # Variables de entorno
├── controllers/
│   └── auth.controller.ts    # Login, register, me, refresh, logout
├── entities/
│   └── User.ts               # Entidad usuario
├── middlewares/
│   ├── verifyToken.ts        # Verificación de sesión
│   └── rateLimit.ts          # Protección contra ataques
├── routes/
│   └── auth.routes.ts        # Rutas de autenticación
├── services/
│   └── auth.service.ts       # Lógica de negocio
├── utils/
│   ├── jwt.ts                # Creación y validación de tokens
│   └── cookies.ts            # Configuración de cookies
├── app.ts

└── server.ts
🔐 Sistema de autenticación

El backend implementa un flujo de autenticación por cookies HTTP-only, similar al de aplicaciones como Google o Facebook.

📌 Flujo general

El usuario hace login o register

El servidor:

Genera un access token

Genera un refresh token

Ambos tokens se envían como cookies HTTP-only

El frontend valida la sesión con /auth/me

Si el access token expira:

Se renueva automáticamente con /auth/refresh
✅ El frontend no maneja tokens directamente
✅ Mayor seguridad frente a XSS
✅ Persistencia de sesión al recargar

🍪 Cookies

HTTP-only

Secure (en producción)

SameSite configurado

No accesibles desde JavaScript

Ejemplo:

access_token

refresh_token

🛡️ Protección de rutas

Las rutas privadas usan el middleware verifyToken:

verifyToken(req, res, next);


Este middleware:

Valida el token

Verifica que el usuario exista

Bloquea accesos no autorizados

⏱️ Rate limiting

Para proteger el sistema de ataques de fuerza bruta:

Se aplica express-rate-limit

Especialmente en rutas como /login

Ejemplo:

Máximo X intentos por IP

Respuesta controlada en formato JSON

🛣️ Endpoints principales
🔑 Auth
Método	Ruta	Descripción
POST	/auth/login	Login de usuario
POST	/auth/register	Registro de usuario
GET	/auth/me	Obtener usuario autenticado
POST	/auth/refresh	Renovar sesión
POST	/auth/logout	Cerrar sesión
🧠 Entidad User
User {
  id: UUID
  email: string
  password: string (hash)
  createdAt
  updatedAt
}


Contraseñas encriptadas con bcrypt

IDs con UUID
▶️ Ejecutar el proyecto
npm install
npm run dev


El servidor se ejecuta en:

http://localhost:3000

🔄 Migraciones (TypeORM)
npm run typeorm migration:generate
npm run typeorm migration:run


Siempre crear migraciones al agregar o modificar entidades.

🔒 Seguridad aplicada

Cookies HTTP-only

Hash de contraseñas con bcrypt

Refresh tokens

Rate limiting

Validación de sesión en backend

Separación clara de responsabilidades

📌 Notas importantes

Este backend requiere un frontend que envíe cookies (credentials: true)

No está pensado para usar tokens en localStorage

Ideal para proyectos reales y producción

📄 Licencia

Proyecto de uso educativo y personal.

Hecho con 🧠 backend y paciencia 😄
