// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm1CS5KpgQjh_F3m6zwddjeC1yXQL6z7Y",
  authDomain: "gokijany-mobile-app.firebaseapp.com",
  databaseURL: "https://gokijany-mobile-app-default-rtdb.firebaseio.com",
  projectId: "gokijany-mobile-app",
  storageBucket: "gokijany-mobile-app.appspot.com",
  messagingSenderId: "396041560862",
  appId: "1:396041560862:web:f43a0c5ae48563c3131f0f",
  measurementId: "G-16HBJ0ZLT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize the services

// firestore service setup exported
export const db = getFirestore(app)
// auth service setup expoted
export const auth = getAuth(app)

const analytics = getAnalytics(app);

