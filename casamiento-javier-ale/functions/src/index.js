const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');

// Inicializar Firebase Admin
admin.initializeApp();

// Configurar Nodemailer (reemplaza con tus credenciales de email)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com', // Reemplazar
        pass: 'tu-password-app' // Usar contraseña de aplicación
    }
});

// ===================== FUNCIÓN: Enviar email de confirmación =====================

exports.enviarConfirmacionRSVP = functions.firestore
    .document('rsvp/{docId}')
    .onCreate(async (snap, context) => {
        const data = snap.data();

        if (!data.email) {
            console.log('No hay email para enviar confirmación');
            return;
        }

        const mailOptions = {
            from: 'noreply@casamiento-javier-ale.com',
            to: data.email,
            subject: '¡Confirmación recibida! 💒 - Boda Javier & Ale',
            html: generarEmailHTML(data)
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email de confirmación enviado a:', data.email);
        } catch (error) {
            console.error('Error al enviar email:', error);
        }
    });

// ===================== FUNCIÓN: Obtener estadísticas RSVP =====================

exports.obtenerEstadisticasRSVP = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const db = admin.firestore();
            const snapshot = await db.collection('rsvp').get();

            let totalConfirmados = 0;
            let totalNoConfirmados = 0;
            let totalRespuestas = 0;

            snapshot.forEach(doc => {
                totalRespuestas++;
                if (doc.data().asiste === 'si') {
                    totalConfirmados++;
                } else {
                    totalNoConfirmados++;
                }
            });

            res.json({
                total: totalRespuestas,
                confirmados: totalConfirmados,
                noConfirmados: totalNoConfirmados,
                porcentajeConfirmacion: totalRespuestas > 0 
                    ? ((totalConfirmados / totalRespuestas) * 100).toFixed(2) 
                    : 0
            });
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            res.status(500).json({ error: error.message });
        }
    });
});

// ===================== FUNCIÓN: Obtener lista de invitados confirmados =====================

exports.obtenerListaConfirmados = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            // TODO: Agregar autenticación para esta función
            const db = admin.firestore();
            const snapshot = await db.collection('rsvp')
                .where('asiste', '==', 'si')
                .orderBy('timestamp', 'asc')
                .get();

            const confirmados = [];
            snapshot.forEach(doc => {
                confirmados.push({
                    id: doc.id,
                    nombre: doc.data().nombre,
                    email: doc.data().email || 'No proporcionado',
                    restricciones: doc.data().restricciones || 'Ninguna'
                });
            });

            res.json({
                total: confirmados.length,
                invitados: confirmados
            });
        } catch (error) {
            console.error('Error al obtener lista:', error);
            res.status(500).json({ error: error.message });
        }
    });
});

// ===================== FUNCIÓN: Plantilla de email HTML =====================

function generarEmailHTML(data) {
    const estado = data.asiste === 'si' 
        ? '¡Confirmación registrada! 🎉' 
        : 'Lamentamos no poder contar con tu presencia 😢';

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: 'Helvetica Neue', sans-serif; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #111 0%, #444 100%); color: white; padding: 30px; text-align: center; border-radius: 5px; }
                .content { margin: 30px 0; }
                .footer { text-align: center; color: #999; font-size: 0.9rem; margin-top: 30px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Javier & Ale</h1>
                    <p>12 de Diciembre de 2026</p>
                </div>
                
                <div class="content">
                    <h2>${estado}</h2>
                    <p>Hola <strong>${data.nombre}</strong>,</p>
                    
                    <p>Hemos recibido tu respuesta a nuestra invitación de boda.</p>
                    
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Tu respuesta:</strong> ${data.asiste === 'si' ? '¡Sí, asistirás! ✓' : 'No podrás asistir'}</p>
                        ${data.restricciones ? `<p><strong>Restricciones alimentarias:</strong> ${data.restricciones}</p>` : ''}
                    </div>
                    
                    <p>Si necesitas cambiar tu respuesta, puedes hacerlo visitando nuestra página:</p>
                    <p><a href="https://casamiento-javier-ale.web.app" style="color: #d4a574;">casamiento-javier-ale.web.app</a></p>
                    
                    <p>¡Gracias por ser parte de este día especial!</p>
                    <p>Con cariño,<br><strong>Javier & Ale</strong></p>
                </div>
                
                <div class="footer">
                    <p>&copy; 2026 Javier & Ale. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}
