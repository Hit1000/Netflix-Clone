// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANtLLd4LC7-NeAgPL8EZuFiLAsUjnz6kw",
  authDomain: "pixalplay-database.firebaseapp.com",
  projectId: "pixalplay-database",
  storageBucket: "pixalplay-database.appspot.com",
  messagingSenderId: "179669004505",
  appId: "1:179669004505:web:7923c736411236d621cec8",
  measurementId: "G-LCHF6LXVLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
// const analytics = getAnalytics(app);