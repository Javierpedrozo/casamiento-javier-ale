// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// TODO: Reemplaza estos valores con tu configuración de Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "casamiento-javier-ale.firebaseapp.com",
    projectId: "casamiento-javier-ale",
    storageBucket: "casamiento-javier-ale.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Función para guardar RSVP en Firestore
export async function guardarRSVP(nombre, asiste, email, restricciones) {
    try {
        const docRef = await addDoc(collection(db, "rsvp"), {
            nombre: nombre,
            asiste: asiste,
            email: email,
            restricciones: restricciones,
            timestamp: serverTimestamp(),
            ip: await obtenerIP()
        });
        console.log("RSVP guardado con ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error al guardar RSVP: ", error);
        return { success: false, error: error.message };
    }
}

// Función auxiliar para obtener IP (opcional)
async function obtenerIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return "No disponible";
    }
}
