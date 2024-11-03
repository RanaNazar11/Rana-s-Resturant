// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkdt5ZmjjPaoCEqkNOg2H7HpdMLwGdT4A",
  authDomain: "restaurant-app-8a843.firebaseapp.com",
  projectId: "restaurant-app-8a843",
  storageBucket: "restaurant-app-8a843.firebasestorage.app",
  messagingSenderId: "655549389832",
  appId: "1:655549389832:web:7f77e11de7ef1aead6c5bd",
  measurementId: "G-7CWGS429YX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, firebaseConfig, app, db };
