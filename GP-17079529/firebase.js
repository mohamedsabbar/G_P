// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged, signOut , sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDaUZpuf8PIY_J8iluk_Lvx8MQq3OI2CZA",
  authDomain: "lingmate-e39bc.firebaseapp.com",
  projectId: "lingmate-e39bc",
  storageBucket: "lingmate-e39bc.appspot.com",
  messagingSenderId: "125885787550",
  appId: "1:125885787550:web:204021d7a2fd8100dfba8f",
  measurementId: "G-SSGNQ0GJ62"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth,getAuth,db,getFirestore,collection, addDoc, getDocs, doc, setDoc, deleteDoc,
  createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged, signOut ,sendPasswordResetEmail };
