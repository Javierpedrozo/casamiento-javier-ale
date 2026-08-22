# ✅ Checklist Pre-Despliegue

Usa esta checklist para asegurar que todo esté configurado correctamente antes de desplegar.

## 🔐 Seguridad y Credenciales

- [ ] Creé un proyecto en Firebase Console
- [ ] Obtuve mis credenciales de Firebase
- [ ] Actualicé `firebase-config.js` con mis credenciales **reales**
- [ ] **No** subí archivos con credenciales a GitHub
- [ ] Configuré `.gitignore` correctamente
- [ ] `.env` no está en el repositorio

## 🛠️ Configuración Firebase

- [ ] Habilitó Firestore Database en mi proyecto
- [ ] Habilitó Cloud Functions
- [ ] Configuró reglas de Firestore (copié `/firestore.rules`)
- [ ] Creó la colección `rsvp` en Firestore

## 📧 Email (Opcional pero Recomendado)

- [ ] Decidí si quiero enviar emails automáticos
  - [ ] Si: Configuré credenciales de Gmail o SendGrid en `functions/src/index.js`
  - [ ] Si: Generé contraseña de aplicación (Gmail)
  - [ ] Si: Probé localmente que se envíen emails

## 📝 Contenido de la Página

- [ ] Actualizé la fecha del evento (12 de Diciembre, 2026)
- [ ] Cambié el nombre del salón (Los Alamos)
- [ ] Cambié la dirección del salón
- [ ] Agregué información de contacto correcta
- [ ] Validé CBU y alias correcto para transferencias

## 💄 Diseño y Personalización

- [ ] Cambié colores si es necesario (--primary-color, etc.)
- [ ] Agregué fotos/imágenes en `public/img/`
- [ ] Validé que se vea bien en móvil
- [ ] Validé que se vea bien en desktop
- [ ] Probé el contador regresivo
- [ ] Probé el formulario RSVP

## 🧪 Testing Local

```bash
# Ejecutar estos comandos:
firebase emulators:start  # ✅ La página carga sin errores
```

- [ ] La página carga en http://localhost:3000
- [ ] El contador funciona correctamente
- [ ] Puedo llenar y enviar el formulario
- [ ] Los datos aparecen en Firestore emulator
- [ ] No hay errores en la consola (F12)

## 📦 Instalación de Dependencias

```bash
# En la raíz
npm install
# ✅ Sin errores

# En la carpeta functions
cd functions
npm install
cd ..
# ✅ Sin errores
```

- [ ] No hay errores al instalar npm
- [ ] `node_modules` está en `.gitignore`

## 🚀 Antes de Desplegar

```bash
firebase login
firebase use casamiento-javier-ale
firebase deploy --dry-run
```

- [ ] Pude hacer `firebase login` sin problemas
- [ ] El `--dry-run` no mostró errores
- [ ] Revisé los archivos que se van a desplegar

## 📱 URLs y Dominios

- [ ] Anota tu URL: `https://casamiento-javier-ale.web.app`
- [ ] Opcionalmente: Configuraste dominio personalizado
- [ ] La URL es la que vas a compartir

## ✨ Detalles Finales

- [ ] Revisé todo el contenido (sin typos)
- [ ] Validé teléfonos y direcciones
- [ ] Probé todos los botones
- [ ] Probé el enlace a Google Maps
- [ ] El favicon se ve en la pestaña

## 🎬 Despliegue

```bash
firebase deploy
```

- [ ] El despliegue terminó sin errores
- [ ] Visité https://casamiento-javier-ale.web.app
- [ ] La página carga correctamente
- [ ] Probé el formulario en producción

## 📊 Post-Despliegue

- [ ] Comparte la URL con los invitados
- [ ] Monitorea los RSVP en Firebase Console
- [ ] Revisa los logs si hay errores: `firebase functions:log`
- [ ] Haz backups de los datos periódicamente

---

## 🆘 Si Algo Falla

1. **Revisa los logs**: `firebase functions:log`
2. **Consola del navegador**: F12 → Console (busca errores rojos)
3. **Firebase Console**: Revisa si hay errores en Functions
4. **Firestore Rules**: Verifica que no haya denegado el acceso

## ✅ ¡Listo para Desplegar!

Si marcaste todo ✅, ¡tu página de boda está lista!

Comparte la URL: `https://casamiento-javier-ale.web.app`

---

**Última revisión**: _______________ (fecha)
**Desplegado por**: _______________ (nombre)
