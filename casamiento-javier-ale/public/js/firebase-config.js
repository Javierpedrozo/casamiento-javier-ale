// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

// Tu configuración real de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDxt4HANeIe6HQexu9orH4v0b2kDBIImrs",
  authDomain: "casamiento-javier-ale.firebaseapp.com",
  projectId: "casamiento-javier-ale",
  storageBucket: "casamiento-javier-ale.firebasestorage.app",
  messagingSenderId: "937573647166",
  appId: "1:937573647166:web:d7bbbb55d9cdec2120a26f",
  measurementId: "G-J72RHZXM6N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics
export const analytics = getAnalytics(app);

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
