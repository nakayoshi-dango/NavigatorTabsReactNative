import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';    

const firebaseConfig = {
  apiKey: "AIzaSyCLXHBBbTOmBjL4NODZEOECD3Fv-zDYqXs",
  authDomain: "navigatortabsreactnative.firebaseapp.com",
  databaseURL:
    "https://navigatortabsreactnative-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "navigatortabsreactnative",
  storageBucket: "navigatortabsreactnative.firebasestorage.app",
  messagingSenderId: "74792325961",
  appId: "1:74792325961:web:dfb87a2512c4cd51e4c098",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
