import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig.js';



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
      });
    ;
  }

  return (

    <div className="d-flex justify-content-center">

      <main className="form-signin position-absolute top-50 start-50 translate-middle w-25  ">
        <form onSubmit={paspaustas}>
          <h1 className="h3 mb-3 fw-normal">Prisijungti</h1>

          <div className="form-floating">
            <input type="email" className="form-control" name="email" placeholder="El. paštas" />

            <label for="floatingInput">Email address</label>
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
          <p className="mt-5 mb-3 text-muted">&copy; 2007-2025</p>
        </form>
      </main>
    </div>

  )
}
export default Login;