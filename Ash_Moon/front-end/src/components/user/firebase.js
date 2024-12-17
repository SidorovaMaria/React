// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAznphMhz6JMIKT4kXGw99QpL3DGC01JzQ",
  authDomain: "ash-moon-a2eee.firebaseapp.com",
  projectId: "ash-moon-a2eee",
  storageBucket: "ash-moon-a2eee.firebasestorage.app",
  messagingSenderId: "585433873167",
  appId: "1:585433873167:web:21b2fca5e0a432f7e99c7a",
  measurementId: "G-EL626EEGYC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
