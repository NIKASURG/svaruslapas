import { app, db, deleteTask, getTask, getTasks, onGetTasks, saveTask, updateTask } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

export async function Skaityk(setDocuments) {
  // console.log(db)
  const querySnapshot = await getDocs(collection(db, "skelbimai"));
  const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(querySnapshot)
  console.log(docs)
  setDocuments(docs); // Update the state here
    try {
    } catch (error) {
      console.error("Klaida skaitant dokumentus:", error);
    }
  }
  