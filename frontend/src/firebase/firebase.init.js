// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF4QT93q-qJOSlRaHuflB98jNbl3riU7c",
  authDomain: "student-accommodation-b3c9b.firebaseapp.com",
  projectId: "student-accommodation-b3c9b",
  storageBucket: "student-accommodation-b3c9b.firebasestorage.app",
  messagingSenderId: "728921159953",
  appId: "1:728921159953:web:d574f96d1d4184c15174b0",
  measurementId: "G-JER01Z5WQ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
