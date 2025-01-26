
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from '../../firebase/firebaseConfig.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


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
      alert("Prašome įvesti savo vardą!");
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
      });
  }
  return (
    <div>


      <div className="d-flex justify-content-center">

        <main className="form-signin position-absolute top-50 start-50 translate-middle w-25  ">
          <form onSubmit={paspaustas}>
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
            <p className="mt-5 mb-3 text-muted">&copy; 2007-2025</p>
          </form>
        </main>
      </div>
    </div>
  )
}
export default Register;