import React, { useState, useEffect } from 'react';
import '../../App.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig.js';
import googleLogin from './googleLogin';


function Login() {

  function paspaustas(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());


    signInWithEmailAndPassword(auth, formJson.email, formJson.slaptazodis)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user.email);
        window.location.href = '/home'
      })
      .catch((error) => {
        console.error("Error logging in:", error.code, error.message);
          const alert = document.createElement('div');
          alert.className = 'alert alert-danger';
          alert.innerHTML = "Neteisingas el. paštas arba slaptažodis";
          document.body.appendChild(alert);
          setTimeout(() => {
            alert.remove();
          }, 3000);
          

        });
    ;
  }

  return (

    <div className="d-flex justify-content-center">

      <main className="form-signin position-absolute top-50 start-50 translate-middle w-25  ">
        <form onSubmit={paspaustas}>
        <div className="card shadow p-3 mb-5 bg-white rounded d-grid gap-2">

          <h1 className="h3 mb-3 fw-normal">Prisijungti</h1>

          <div className="form-floating">
            <input type="email" className="form-control" name="email" placeholder="El. paštas" />

            <label for="floatingInput">El. paštas</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" name="slaptazodis" placeholder="Slaptažodis" />

            <label for="floatingPassword">Slaptažodis</label>
          </div>

          <div className="checkbox mb-3">
            <input type="checkbox" value="remember-me" />
            <label>
              ‎ Prisimink mane
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Prisijungti</button>
          <p className="mt-5 mb-3 text-muted">Neturite paskyros? <a href="/register">Registruotis</a></p>
       
         <p>Arba</p>

<center>
<a href="#" type="button" className="login-with-google-btn"  onClick={googleLogin}>Prisijungri su Google</a>
</center>
          <p className="mt-5 mb-3 text-muted">&copy; 2007-2025</p>
          </div>
        </form>
      </main>
    </div>

  )
}
export default Login;