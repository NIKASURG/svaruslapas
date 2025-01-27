// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMleEDT1cMVR0LpXWYxRW9t2VXvuYgfYI",
  authDomain: "svaruslapas-1f120.firebaseapp.com",
  projectId: "svaruslapas-1f120",
  storageBucket: "svaruslapas-1f120.firebasestorage.app",
  messagingSenderId: "990568042619",
  appId: "1:990568042619:web:e3955ec9ca62b03f2992de",
  measurementId: "G-4LWBP4ZSS4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);

export const saveTask = (preke, aprasimas, kaina) =>
  addDoc(collection(db, "skelbimai"), { preke, aprasimas, kaina,uid: auth.currentUser.uid  });


export const deleteTask = (id) => deleteDoc(doc(db, "skelbimai", id));
