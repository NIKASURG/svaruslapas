
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from '../../firebase/firebaseConfig.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


function Register() {
    function paspaustas(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
        // You can pass formData as a fetch body directly:
        fetch('/some-api', { method: form.method, body: formData });
        
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
       
        createUserWithEmailAndPassword(auth, formJson.email, formJson.slaptazodis)
          .then((userCredential) => {
            console.log("User registered:", userCredential.user);
            window.location.href = '/home'
          })
          .catch((error) => {
            console.error("Error registering user:", error.code, error.message);
          });
        }
    return(
        <div> <form method="post" onSubmit={paspaustas}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="slaptazodis" placeholder="Password"/>
        <button type="submit">Prisiregistuori</button>
         </form>
    </div>
    )
}
export default Register;