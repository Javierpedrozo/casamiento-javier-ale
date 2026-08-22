# 💒 Página de Boda - Javier & Ale

Página web moderna y responsive para la boda de Javier y Ale, alojada en **Firebase Hosting** con backend en **Firestore** y **Cloud Functions**.

## 📋 Características

- ✅ **Responsive Design** - Funciona en móviles, tablets y desktop
- ✅ **Countdown Timer** - Cuenta regresiva animada
- ✅ **Formulario RSVP** - Confirmación de asistencia con Firebase
- ✅ **Email Automático** - Confirmación por email usando Cloud Functions
- ✅ **Panel de Estadísticas** - Monitorear RSVPs en tiempo real
- ✅ **Diseño Moderno** - Interfaz limpia y elegante
- ✅ **Optimizado SEO** - Meta tags y estructura HTML5

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ instalado
- Cuenta de Firebase (https://firebase.google.com)
- Git

### 1. Clonar el Repositorio

```bash
git clone <tu-repo-url>
cd casamiento-javier-ale
```

### 2. Instalar Dependencias

```bash
npm install
cd functions && npm install && cd ..
```

### 3. Configurar Firebase

#### Paso 1: Crear proyecto en Firebase Console
1. Ve a https://console.firebase.google.com
2. Crea un nuevo proyecto llamado "casamiento-javier-ale"
3. Habilita Firestore Database
4. Habilita Cloud Functions

#### Paso 2: Obtener Credenciales
1. Ve a "Project Settings" → "Service Accounts"
2. Haz clic en "Generate New Private Key" y descarga el JSON
3. Guarda en `/functions/.env.json` (NO SUBIR A GIT)

#### Paso 3: Configurar firebase-config.js
Edita `/public/js/firebase-config.js` con tus credenciales:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "casamiento-javier-ale.firebaseapp.com",
    projectId: "casamiento-javier-ale",
    storageBucket: "casamiento-javier-ale.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

#### Paso 4: Configurar Email (Nodemailer)
Edita `/functions/src/index.js`:

```javascript
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com',
        pass: 'tu-password-app' // Usa contraseña de aplicación
    }
});
```

### 4. Ejecutar Localmente

```bash
npm run serve
```

Abre http://localhost:5000 en tu navegador.

### 5. Desplegar en Firebase

```bash
# Desplegar todo (hosting + functions)
npm run deploy

# O solo hosting
npm run deploy:hosting

# O solo functions
npm run deploy:functions
```

## 📁 Estructura del Proyecto

```
casamiento-javier-ale/
├── public/                 # Hosting estático
│   ├── index.html          # Página principal
│   ├── css/
│   │   └── styles.css      # Estilos
│   ├── js/
│   │   ├── main.js         # Lógica principal
│   │   └── firebase-config.js # Config de Firebase
│   ├── img/                # Imágenes
│   └── assets/             # Otros recursos
├── functions/              # Cloud Functions
│   ├── src/
│   │   └── index.js        # Funciones backend
│   └── package.json
├── firebase.json           # Config de Firebase
├── .firebaserc             # ID del proyecto
├── package.json
└── README.md
```

## 🔒 Seguridad

### Reglas de Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura a todos
    match /rsvp/{document=**} {
      allow read: if true;
      allow create: if request.resource.data.nombre != null;
      allow update: if false;
      allow delete: if false;
    }
  }
}
```

## 📊 Dashboard de Estadísticas

Accede a las estadísticas de RSVP via API:

```
GET /obtenerEstadisticasRSVP
```

Retorna:
```json
{
  "total": 150,
  "confirmados": 120,
  "noConfirmados": 30,
  "porcentajeConfirmacion": "80.00"
}
```

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `/public/css/styles.css`:

```css
:root {
    --primary-color: #111;
    --secondary-color: #444;
    --accent-color: #d4a574;
}
```

### Cambiar Fecha del Evento
Edita en `/public/js/main.js`:

```javascript
const fechaEvento = new Date('2026-12-12T19:00:00').getTime();
```

## 🐛 Solución de Problemas

### "Error de autenticación en Firebase"
- Verifica que firebase-config.js tenga credenciales correctas
- Revisa las reglas de seguridad de Firestore

### "Los emails no se envían"
- Verifica credenciales de Nodemailer
- Activa "Acceso de aplicaciones menos seguras" en Gmail (o usa contraseña de app)
- Revisa los logs: `npm run logs`

### "Contador no actualiza"
- Abre la consola del navegador (F12) y busca errores
- Verifica que Firebase esté inicializado

## 📱 Características Responsivas

- **Desktop**: Diseño full-width con columnas
- **Tablet**: Layout optimizado para 768px
- **Mobile**: Vista optimizada para 480px

## 🚀 Próximas Mejoras

- [ ] Integrar Google Maps
- [ ] Galería de fotos
- [ ] Sistema de comentarios
- [ ] Dashboard de administrador
- [ ] Soporte de QR para check-in

## 📧 Contacto & Soporte

Para preguntas técnicas, contacta al equipo de desarrollo.

---

**Hecho con ❤️ por Gabriel** | 2026
