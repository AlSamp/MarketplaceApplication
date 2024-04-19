// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFireStore } from 'firebase/firestore';
import Constants from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCm_ff5fks5lj1UeOl30UFEIMdWRilf4XE",
    authDomain: "marketplace-messenger.firebaseapp.com",
    projectId: "marketplace-messenger",
    storageBucket: "marketplace-messenger.appspot.com",
    messagingSenderId: "499111144281",
    appId: "1:499111144281:web:c4d299cd75bc937aa57a48",
    measurementId: "G-QVGSRSKK51"
};

// Initialize Firebase
//initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getFireStore();