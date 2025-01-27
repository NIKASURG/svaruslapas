
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from '../../firebase/firebaseConfig.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import googleLogin from '../login/googleLogin';


function Register() {
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
    if (!formJson.vardas || formJson.vardas.trim() === "") {
      // alert("Prašome įvesti savo vardą!");
      const alert = document.createElement('div');
      alert.className = 'alert alert-danger';
      alert.innerHTML = "Prašome įvesti savo vardą!";
      document.body.appendChild(alert);
      setTimeout(() => {
        alert.remove();
      }, 3000);
      return;
    }

    createUserWithEmailAndPassword(auth, formJson.email, formJson.slaptazodis)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: formJson.vardas
        }).catch((error) => {
          console.error("Error updating profile:", error.code, error.message);
        });
        // console.log("User registered:", userCredential.user);
      }).then((user) => {
        window.location.href = '/home'


      })
      .catch((error) => {
        console.error("Error registering user:", error.code, error.message);
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        const tekstas = error.code === "auth/weak-password" ? " Slaptažodi turi sudaryti bent  6 simboliai" : "Toks el. paštas jau užregistruotas";
       
        alert.innerHTML = tekstas;
        document.body.appendChild(alert);
        setTimeout(() => {
          alert.remove();
        }, 3000);
      });
  }
  return (
    <div>


      <div className="d-flex justify-content-center">

        <main className="form-signin position-absolute top-50 start-50 translate-middle w-25  ">
          <form onSubmit={paspaustas}>
        <div className="card shadow p-3 mb-5 bg-white rounded d-grid gap-2">

            <h1 className="h3 mb-3 fw-normal">Registracija</h1>

            <div className="form-floating">
              <input type="email" className="form-control" name="email" placeholder="Email" />

              <label for="floatingInput">El. Paštas</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" name="slaptazodis" placeholder="Slaptažodis" />

              <label for="floatingPassword">Slaptažodis</label>
            </div>

            <div className="checkbox mb-3 form-floating">

              <input type="text" className="form-control" name="vardas" placeholder="Vardas" />
              <label for="floatingPassword">Vardas</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Prisiregistruoti</button>
            <p>
              Jau turi paskyrą? <a href="/login">Prisijunk</a>
            </p>
            <p>Arba</p>
            <center>
              <a href="#" type="button" class="login-with-google-btn" onClick={googleLogin}>Prisijungti su Google</a>
            </center>
            <p className="mt-5 mb-3 text-muted">&copy; 2007-2025</p>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
export default Register;