# 📁 Estructura del Proyecto - Página de Boda Javier & Ale

```
casamiento-javier-ale/
│
├── 📄 firebase.json              # Configuración de Firebase Hosting
├── 📄 .firebaserc                # ID del proyecto Firebase
├── 📄 firestore.rules            # Reglas de seguridad de Firestore
├── 📄 package.json               # Dependencias principales
├── 📄 .gitignore                 # Archivos a ignorar en Git
├── 📄 .env.example               # Variables de entorno (ejemplo)
├── 📄 README.md                  # Documentación principal
│
├── 📂 public/                    # Hosting estático (lo que ven los usuarios)
│   ├── 📄 index.html             # Página principal HTML
│   │
│   ├── 📂 css/                   # Estilos
│   │   └── 📄 styles.css         # Todos los estilos de la página
│   │
│   ├── 📂 js/                    # JavaScript
│   │   ├── 📄 main.js            # Lógica principal (countdown, formulario)
│   │   └── 📄 firebase-config.js # Configuración de Firebase para frontend
│   │
│   ├── 📂 img/                   # Imágenes
│   │   ├── 📄 favicon.ico        # Icono de la pestaña
│   │   ├── 📄 logo.png           # Logo (opcional)
│   │   └── 📄 ...                # Otras imágenes
│   │
│   └── 📂 assets/                # Otros recursos
│       ├── 📄 fonts/             # Fuentes personalizadas
│       └── 📄 ...
│
├── 📂 functions/                 # Cloud Functions (backend)
│   ├── 📄 package.json           # Dependencias de Functions
│   │
│   └── 📂 src/
│       └── 📄 index.js           # Funciones backend
│           ├── enviarConfirmacionRSVP()      # Envía email al confirmar
│           ├── obtenerEstadisticasRSVP()     # API de estadísticas
│           └── obtenerListaConfirmados()     # API de lista de invitados
│
├── 📂 docs/                      # Documentación
│   └── 📄 GUIA_DESPLIEGUE.md    # Paso a paso para desplegar
│
└── 📄 ESTRUCTURA.md              # Este archivo

```

## 🎯 Qué es Cada Cosa

### `public/` - El Frontend (Lo que ven los usuarios)

Este folder contiene todo lo que ve el usuario en su navegador:

- **index.html**: Estructura HTML de la página
- **css/styles.css**: Diseño visual (colores, fuentes, layout)
- **js/main.js**: Interactividad (contador, formulario, eventos)
- **js/firebase-config.js**: Conexión con Firebase
- **img/**: Fotos, logos, imágenes

### `functions/` - El Backend (Lógica en la nube)

Este folder contiene código que se ejecuta en los servidores de Google:

- **index.js**: 
  - Envía emails automáticos cuando alguien se confirma
  - Proporciona APIs para obtener estadísticas
  - Procesa datos sensibles de forma segura

### Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `firebase.json` | Cómo Firebase debe servir tu página |
| `.firebaserc` | ID de tu proyecto Firebase |
| `firestore.rules` | Quién puede leer/escribir en la base de datos |
| `package.json` | Librerías que necesita el proyecto |
| `.gitignore` | Archivos que NO subes a GitHub |

## 🔄 Flujo de Datos

```
Usuario llena formulario en index.html
         ↓
main.js captura datos
         ↓
firebase-config.js envía a Firestore
         ↓
Cloud Function (index.js) se dispara
         ↓
Función envía email automático
         ↓
Usuario recibe confirmación por email
```

## 🚀 Ciclo de Desarrollo

### Editar Localmente
```bash
# Cambias archivos en public/ o functions/
npm run serve  # Ves los cambios en tiempo real
```

### Desplegar a Producción
```bash
firebase deploy  # Sube todo a Firebase
# Ahora está en vivo: https://casamiento-javier-ale.web.app
```

## 📝 Archivos Importantes a Personalizar

| Archivo | Qué cambiar |
|---------|------------|
| `public/index.html` | Contenido, fechas, ubicación |
| `public/css/styles.css` | Colores, fuentes, diseño |
| `public/js/firebase-config.js` | Tus credenciales de Firebase |
| `functions/src/index.js` | Configuración de email |

## 🔒 Archivos Sensibles (No Subir a Git)

Estos archivos contienen información secreta y **NUNCA** deben subirse a GitHub:

- `.env` - Variables de entorno privadas
- `functions/.env.json` - Credenciales de Firebase Admin
- Cualquier archivo con contraseñas o API keys

## 📊 Dónde van los datos

```
Firebase Console (web)
    ↓
┌───────────────────────────────────┐
│                                   │
│  🗄️ Firestore Database (datos)   │ ← Donde se guardan los RSVP
│                                   │
│  ☁️ Cloud Functions (código)      │ ← Envía emails automáticos
│                                   │
│  🌐 Hosting (página web)          │ ← Tu sitio en vivo
│                                   │
└───────────────────────────────────┘
```

## 💡 Notas Importantes

- **Frontend** = Lo que ves en el navegador (public/)
- **Backend** = Código que corre en la nube (functions/)
- **Base de Datos** = Donde se guardan los datos (Firestore)
- **Hosting** = Tu página en vivo en internet (Firebase Hosting)

Todos se conectan a través de **Firebase**, que es el "pegamento" de la aplicación.

---

¿Necesitas más detalles? Lee:
- README.md - Inicio rápido
- docs/GUIA_DESPLIEGUE.md - Cómo desplegar
