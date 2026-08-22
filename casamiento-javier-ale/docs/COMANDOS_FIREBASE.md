# 🔧 Referencia Rápida de Comandos Firebase

Comandos útiles para desarrollar y desplegar tu página.

## 🚀 Despliegue

```bash
# Desplegar todo (hosting + functions)
firebase deploy

# Solo hosting
firebase deploy --only hosting

# Solo cloud functions
firebase deploy --only functions

# Solo reglas de Firestore
firebase deploy --only firestore:rules

# Ver qué se va a desplegar (sin confirmar)
firebase deploy --dry-run
```

## 🧪 Desarrollo Local

```bash
# Iniciar emuladores locales
firebase emulators:start

# Iniciar solo ciertos emuladores
firebase emulators:start --only firestore,functions

# Ver UI de emuladores
# Navega a http://localhost:4000
```

## 📊 Logs y Monitoreo

```bash
# Ver logs de cloud functions en tiempo real
firebase functions:log

# Ver logs con más detalles
firebase functions:log --limit 50

# Ver logs de una función específica
firebase functions:log --function=enviarConfirmacionRSVP
```

## 🔍 Debugging

```bash
# Desplegar con modo debug
firebase deploy --debug

# Ver detalles de una función
firebase functions:describe nombreFuncion

# Ejecutar función localmente (shell)
firebase functions:shell
> enviarConfirmacionRSVP({nombre: "Javier", asiste: "si"})
```

## 📁 Gestión de Proyecto

```bash
# Listar proyectos disponibles
firebase projects:list

# Usar un proyecto específico
firebase use casamiento-javier-ale

# Ver proyecto actual
firebase use

# Crear proyecto nuevo
firebase projects:create casamiento-boda-2024

# Actualizar proyecto
firebase projects:update <id>
```

## 🗄️ Firestore

```bash
# Exportar datos de Firestore
firebase firestore:export ./backup

# Importar datos a Firestore
firebase firestore:import ./backup

# Eliminar una colección
firebase firestore:delete rsvp

# Ejecutar query en shell
firebase firestore:shell
> db.collection('rsvp').get()
```

## 🌐 Hosting

```bash
# Ver dominio de hosting
firebase hosting:sites:list

# Ver versiones desplegadas
firebase hosting:versions:list

# Revertir a versión anterior
firebase hosting:versions:list  # obtener ID
firebase hosting:releases:create --version-id <id>

# Limpiar archivos sin usar
firebase hosting:cleanup
```

## 🔐 Autenticación

```bash
# Verificar que estoy autenticado
firebase auth:list-users

# Cerrar sesión
firebase logout

# Login interactivo
firebase login

# Login con token (CI/CD)
firebase deploy --token <token>
```

## 📦 Gestión de Dependencias

```bash
# Actualizar Firebase CLI
npm install -g firebase-tools@latest

# Ver versión instalada
firebase --version

# Actualizar dependencias
npm update

# Auditar vulnerabilidades
npm audit
npm audit fix
```

## 🧹 Limpieza

```bash
# Eliminar node_modules (libera espacio)
rm -rf node_modules package-lock.json
npm install

# Limpiar caché de npm
npm cache clean --force

# Limpiar emuladores
rm -rf .emulator_data
```

## 📝 Ejemplos Prácticos

### Desplegar solo cambios en frontend
```bash
firebase deploy --only hosting
```

### Ver quién accede a tu sitio
```bash
firebase hosting:log --real-time
```

### Desplegar solo una función
```bash
firebase deploy --only functions:enviarConfirmacionRSVP
```

### Probar función localmente antes de desplegar
```bash
firebase emulators:start --only functions
# Luego en otra terminal
firebase functions:shell
```

### Exportar datos antes de desplegar
```bash
firebase firestore:export ./backup-$(date +%Y%m%d)
firebase deploy
```

### Revisar costo de tu proyecto
```bash
# Ve a Firebase Console → Project Settings → Billing
```

## 📱 Conectar Dominio Personalizado

```bash
# Ver instrucciones para conectar dominio
firebase hosting:domain:list

# Agregar dominio
firebase hosting:domain:create javieraleboda.com
```

## 🚨 Problemas Comunes

| Problema | Solución |
|----------|----------|
| "No project found" | `firebase use casamiento-javier-ale` |
| Permisos denegados | Verifica Firestore rules |
| Función no se ejecuta | Revisa `firebase functions:log` |
| Cambios no se ven | Limpia caché o usa modo incógnito |
| Error de CORS | Configura `cors` en functions |

## 🔗 Enlaces Útiles

- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/overview)
- [Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Hosting Guide](https://firebase.google.com/docs/hosting)

---

**Tip**: Agrega estos comandos a un script `.sh` si los usas frecuentemente.

```bash
#!/bin/bash
# script de despliegue
firebase deploy --only hosting
echo "✅ Desplegado correctamente"
```

Luego ejecuta: `chmod +x deploy.sh && ./deploy.sh`
