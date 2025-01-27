import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMleEDT1cMVR0LpXWYxRW9t2VXvuYgfYI",
  authDomain: "svaruslapas-1f120.firebaseapp.com",
  projectId: "svaruslapas-1f120",
  storageBucket: "svaruslapas-1f120.firebasestorage.app",
  messagingSenderId: "990568042619",
  appId: "1:990568042619:web:e3955ec9ca62b03f2992de",
  measurementId: "G-4LWBP4ZSS4"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);

export const saveTask = (preke, aprasimas, kaina) =>
  addDoc(collection(db, "skelbimai"), {
    preke,
    aprasimas,
    kaina,
    uid: auth.currentUser ? auth.currentUser.uid : null,
  });

export const deleteTask = (id) => deleteDoc(doc(db, "skelbimai", id));