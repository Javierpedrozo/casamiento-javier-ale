// ===================== FUNCIONES GENERALES =====================

// Copiar alias al portapapeles
function copiarAlias() {
    const alias = "JAVI.ALE.BODA";
    navigator.clipboard.writeText(alias).then(() => {
        const feedback = document.getElementById('copy-feedback');
        feedback.style.display = 'block';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 3000);
    }).catch(err => {
        alert("Error al copiar: " + err);
    });
}

// ===================== COUNTDOWN TIMER =====================

function iniciarCountdown() {
    // Fecha objetivo: 12 de Diciembre de 2026 a las 19:00
    const fechaEvento = new Date('2026-12-12T19:00:00').getTime();

    function actualizarCountdown() {
        const ahora = new Date().getTime();
        const diferencia = fechaEvento - ahora;

        if (diferencia < 0) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(dias).padStart(2, '0');
        document.getElementById('hours').innerText = String(horas).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutos).padStart(2, '0');
        document.getElementById('seconds').innerText = String(segundos).padStart(2, '0');
    }

    // Actualizar cada segundo
    actualizarCountdown();
    setInterval(actualizarCountdown, 1000);
}

// ===================== FORMULARIO RSVP =====================

document.addEventListener('DOMContentLoaded', function() {
    iniciarCountdown();

    const form = document.getElementById('rsvp-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const asiste = document.getElementById('asiste').value;
            const email = document.getElementById('email').value.trim();
            const restricciones = document.getElementById('restricciones').value.trim();
            const statusDiv = document.getElementById('form-status');

            // Validación básica
            if (!nombre || !asiste) {
                statusDiv.style.color = 'red';
                statusDiv.textContent = '⚠ Por favor completa los campos requeridos';
                statusDiv.style.display = 'block';
                return;
            }

            // Mostrar estado de envío
            statusDiv.style.color = '#666';
            statusDiv.textContent = '📤 Enviando...';
            statusDiv.style.display = 'block';

            try {
                // Importar la función de guardado desde firebase-config
                const { guardarRSVP } = await import('./firebase-config.js');
                const resultado = await guardarRSVP(nombre, asiste, email, restricciones);

                if (resultado.success) {
                    statusDiv.style.color = 'green';
                    statusDiv.textContent = '✓ ¡Confirmación enviada con éxito!';
                    
                    // Limpiar formulario
                    form.reset();
                    
                    // Ocultar mensaje después de 5 segundos
                    setTimeout(() => {
                        statusDiv.style.display = 'none';
                    }, 5000);
                } else {
                    statusDiv.style.color = 'red';
                    statusDiv.textContent = '✗ Error al enviar. Intenta nuevamente.';
                }
            } catch (error) {
                statusDiv.style.color = 'red';
                statusDiv.textContent = '✗ Error de conexión. Verifica tu conexión a internet.';
                console.error('Error:', error);
            }
        });
    }
});

// ===================== SCROLL SUAVE =====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================== FUNCIONES GLOBALES =====================

// Hacer que copiarAlias sea accesible globalmente
window.copiarAlias = copiarAlias;
