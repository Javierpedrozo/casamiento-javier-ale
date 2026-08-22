# ⚡ Inicio Rápido en 5 Minutos

Si tienes poco tiempo, esta es tu guía.

## ✂️ Versión Ultra-Reducida

### Paso 1: Personalizar Contenido (2 min)

Abre `public/index.html` con tu editor de texto y cambia:

```html
<!-- Línea 32 -->
<h1>Javier & Ale</h1>
<h2>¡Nos Casamos!</h2>

<!-- Línea 68 - Cambiar fecha -->
<p><strong>Fecha:</strong> Sábado 12 de Diciembre, 2026</p>
<p><strong>Salón Los Alamos</strong><br>Av. Siempre Viva 123, Buenos Aires</p>

<!-- Línea 90 - Cambiar banco -->
<p><strong>CBU:</strong> 0000000000000000000000</p>
<p><strong>Alias:</strong> JAVI.ALE.BODA</p>
```

### Paso 2: Crear Proyecto Firebase (2 min)

1. Ve a https://console.firebase.google.com
2. Haz clic en "Crear Proyecto"
3. Nombre: `casamiento-javier-ale`
4. Click "Crear"
5. Espera a que termine

### Paso 3: Conectar Credenciales (1 min)

1. En Firebase Console, ve a ⚙️ **Configuración del Proyecto**
2. Click en **`</>`** (Configuración Web)
3. Copia el objeto `firebaseConfig`
4. Abre `public/js/firebase-config.js`
5. Reemplaza los valores

Listo, **ahora puedes desplegar:**

```bash
firebase login              # Inicia sesión
firebase deploy             # ¡Listo!
```

Tu página estará en vivo en: `https://casamiento-javier-ale.web.app`

---

## 📝 Las 5 Cosas Que DEBES Cambiar

| Qué | Dónde | Por Qué |
|-----|-------|---------|
| Nombres | public/index.html línea 32 | Para que sea tu boda |
| Fecha | public/index.html línea 68 | Para que cuente al día correcto |
| Ubicación | public/index.html línea 68 | Para que todos sepan dónde ir |
| CBU/Alias | public/index.html línea 90 | Para recibir dinero |
| Firebase Config | public/js/firebase-config.js | Para que funcione con tu cuenta |

## 🎨 Opcional: Personalizar Colores

Abre `public/css/styles.css` línea 3:

```css
:root {
    --primary-color: #111;      /* Negro → Tu color */
    --secondary-color: #444;    /* Gris → Tu color */
    --accent-color: #d4a574;    /* Dorado → Tu color */
}
```

Colores populares:
- Verde boda: `#2d5016`
- Rosa clásico: `#d4749c`
- Azul marino: `#0a3161`
- Dorado elegante: `#d4a574`

## ✅ Antes de Desplegar

```bash
# 1. Instala dependencias
npm install

# 2. Prueba localmente
npm run serve

# 3. Abre http://localhost:3000
# 4. Verifica que todo se vea bien

# 5. Autentica con Firebase
firebase login

# 6. Desplega
firebase deploy
```

## 🚨 Problemas Comunes

| Error | Solución |
|-------|----------|
| "No project found" | `firebase use casamiento-javier-ale` |
| "Credential error" | Verifica firebase-config.js |
| Página en blanco | Abre consola (F12) y busca errores rojos |

## 📱 ¿Se ve bien en móvil?

Presiona `F12` en Chrome → Toggle mobile → Verifica que se vea bien.

Si no, revisa `public/css/styles.css` sección `@media`.

## 🎉 ¡Listo!

Comparte tu URL: `https://casamiento-javier-ale.web.app`

---

**¿Necesitas más ayuda?**

- Lee `README.md` para instrucciones completas
- Lee `docs/GUIA_DESPLIEGUE.md` para paso a paso detallado
- Usa `CHECKLIST_DESPLIEGUE.md` para validar
