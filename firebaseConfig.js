// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLXHBBbTOmBjL4NODZEOECD3Fv-zDYqXs",
  authDomain: "navigatortabsreactnative.firebaseapp.com",
  projectId: "navigatortabsreactnative",
  storageBucket: "navigatortabsreactnative.firebasestorage.app",
  messagingSenderId: "74792325961",
  appId: "1:74792325961:web:38f6fb9a7d4d8284e4c098",
  measurementId: "G-6JQGRWF8T9"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const auth = getAuth(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);