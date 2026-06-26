# Especificación del Módulo de Autenticación

## 1. Objetivo
Permitir el acceso seguro al sistema LiquorPro mediante autenticación con correo y contraseña, usando roles y tokens JWT.

## 2. Actores
- Administrador
- Vendedor

## 3. Funcionalidades
- Inicio de sesión.
- Validación de credenciales.
- Generación de token JWT.
- Consulta del perfil autenticado.
- Protección de rutas privadas.
- Control de acceso por rol.

## 4. Reglas de negocio
- El usuario debe existir en la base de datos.
- El usuario debe estar activo.
- La contraseña debe validarse con bcrypt.
- El token JWT debe contener el id, email y rol del usuario.
- Las rutas privadas deben rechazar solicitudes sin token.
- Las rutas administrativas deben permitir solo usuarios con rol ADMINISTRADOR.

## 5. Endpoints

| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| POST | /api/auth/login | Iniciar sesión | Público |
| GET | /api/auth/me | Obtener usuario autenticado | Privado |

## 6. Validaciones
- El email es obligatorio.
- El email debe tener formato válido.
- La contraseña es obligatoria.
- La contraseña debe tener mínimo 6 caracteres.

## 7. Casos de prueba
- Login exitoso con credenciales correctas.
- Login fallido con contraseña incorrecta.
- Login fallido con usuario inexistente.
- Login fallido con usuario inactivo.
- Acceso rechazado sin token.
- Acceso permitido con token válido.