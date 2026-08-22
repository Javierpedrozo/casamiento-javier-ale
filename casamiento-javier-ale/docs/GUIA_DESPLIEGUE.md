# 🚀 Guía Completa de Despliegue en Firebase

## Paso 1: Crear un Proyecto en Firebase Console

1. Ve a https://console.firebase.google.com
2. Haz clic en "Crear Proyecto"
3. Nombre del proyecto: `casamiento-javier-ale`
4. Elige tu región (recomendado: Sudamérica)
5. Espera a que se cree el proyecto

## Paso 2: Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

Verifica la instalación:
```bash
firebase --version
```

## Paso 3: Autenticarse con Firebase

```bash
firebase login
```

Se abrirá una ventana del navegador. Inicia sesión con tu cuenta de Google.

## Paso 4: Inicializar el Proyecto

```bash
firebase init
```

Selecciona las opciones:
- **Hosting**: ✅ Yes
- **Firestore**: ✅ Yes
- **Functions**: ✅ Yes
- **Emulators**: ✅ Yes

## Paso 5: Habilitar Firestore Database

1. Ve a Firebase Console → Tu Proyecto
2. Click izquierdo: "Firestore Database"
3. Haz clic en "Crear base de datos"
4. Modo: **Prueba** (puedes cambiar después)
5. Ubicación: Sudamérica (aab1)
6. Click en "Crear"

## Paso 6: Habilitar Cloud Functions

1. Ve a "Cloud Functions"
2. Haz clic en "Crear función"
3. Nombre: `enviarConfirmacionRSVP`
4. Gatillo: Cloud Firestore
5. Evento: onCreate
6. Colección: `rsvp`

## Paso 7: Obtener Credenciales de Firebase

1. Ve a "Project Settings" (engranaje arriba a la derecha)
2. Click en "Service Accounts"
3. Haz clic en "Generate New Private Key"
4. Se descargará un archivo JSON
5. Guarda como `/functions/.env.json`
6. **⚠️ NUNCA SUBES ESTE ARCHIVO A GIT**

## Paso 8: Obtener Config para Frontend

En la misma página de "Project Settings":

1. Ve a "Tu Aplicación"
2. Haz clic en `</>` (configuración web)
3. Copia el objeto `firebaseConfig`
4. Edita `/public/js/firebase-config.js`
5. Reemplaza los valores en `firebaseConfig`

Ejemplo:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDqVqlWwA-x...", // Tu API Key
    authDomain: "casamiento-javier-ale.firebaseapp.com",
    projectId: "casamiento-javier-ale",
    storageBucket: "casamiento-javier-ale.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};
```

## Paso 9: Configurar Email (Opcional pero Recomendado)

Si deseas enviar emails automáticos de confirmación:

### Opción A: Usar Gmail

1. Ve a https://myaccount.google.com/apppasswords
2. Selecciona "Mail" y "Windows Computer" (o tu dispositivo)
3. Genera una contraseña de aplicación
4. Edita `/functions/src/index.js`:

```javascript
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com',
        pass: 'xxxx xxxx xxxx xxxx' // Contraseña de app de 16 caracteres
    }
});
```

### Opción B: Usar SendGrid

1. Ve a https://sendgrid.com
2. Crea una cuenta y obtén una API Key
3. Reemplaza en `/functions/src/index.js`:

```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: 'SG.tu-api-key'
    }
});
```

## Paso 10: Configurar Firestore Rules

1. Ve a "Firestore Database" → "Rules"
2. Reemplaza con el contenido de `/firestore.rules`
3. Haz clic en "Publicar"

## Paso 11: Instalar Dependencias

```bash
# En la raíz del proyecto
npm install

# En la carpeta de functions
cd functions
npm install
cd ..
```

## Paso 12: Probar Localmente

```bash
npm run serve
```

Abre en tu navegador:
- **Aplicación**: http://localhost:3000
- **Emulador Firestore**: http://localhost:4000
- **Funciones**: http://localhost:5001

## Paso 13: Desplegar a Firebase

```bash
# Desplegar todo (hosting + functions)
firebase deploy

# O desplegar por separado
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules
```

## Paso 14: Verificar el Despliegue

1. Ve a Firebase Console → Hosting
2. Haz clic en el dominio
3. Tu sitio debería estar en vivo: `https://casamiento-javier-ale.web.app`

## 🔍 Solución de Problemas

### Error: "No project found"
```bash
firebase use casamiento-javier-ale
```

### Error de autenticación Firebase
- Verifica que `firebase-config.js` tenga las credenciales correctas
- Revisa que el proyecto ID coincida con tu proyecto de Firebase

### Cloud Functions no se despliegan
```bash
firebase deploy --only functions --debug
```

### Los emails no se envían
1. Verifica credenciales en `index.js`
2. Revisa logs: `firebase functions:log`
3. Para Gmail: activa "Acceso de aplicaciones menos seguras"

## 📊 Monitorear Tu Sitio

### Ver Logs
```bash
firebase functions:log
```

### Ver Estadísticas de Hosting
Firebase Console → Hosting → Analíticas

### Ver Base de Datos Firestore
Firebase Console → Firestore Database → colección `rsvp`

## 🔐 Seguridad Post-Despliegue

1. **Cambiar de Modo Prueba a Producción**:
   - Ve a Firestore → Rules
   - Cambia reglas según necesario
   - **Nunca dejes abierto a todos en producción**

2. **Habilitar reCAPTCHA**:
   - Considera agregar reCAPTCHA al formulario
   - Evita spam en formularios

3. **Respaldar datos**:
   - Exporta datos periódicamente
   - Firebase → Firestore → Exportar

## 📱 Dominio Personalizado

1. Compra un dominio (ej: www.javieraleboda.com)
2. Firebase Console → Hosting → Conectar dominio
3. Sigue los pasos para configurar DNS
4. Espera propagación (hasta 24 horas)

## 🎉 ¡Listo!

Tu página de boda está en vivo. Comparte la URL:
```
https://casamiento-javier-ale.web.app
```

---

**Necesitas ayuda?** Verifica los logs o contacta al equipo técnico.
