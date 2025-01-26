import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebase/firebaseConfig';
import Login from './assets/login';
import Register from './assets/register';



const keliai = [
  {
    path: "/login",
    element: <Login />,
  },{
    path: "/register",
    element: <Register />,
  }
];

const AppRoutes = () => {
  return useRoutes(keliai);
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // setLoadi ng(false); // Užkrovimas baigtas
    });

    return () => unsubscribe();
  }, []);

  
  return (
    <div>
{!user ? (

<header className="p-3 bg-dark text-white">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
          <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" className="nav-link px-2 text-white">About</a></li>
        </ul>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"></input>
        </form>

        <div className="text-end">
          <button type="button" className="btn btn-outline-light me-2" onClick={() => window.location.href = '/login'} >Login</button>
          <button type="button" className="btn btn-warning" onClick={() => window.location.href = '/register'}>Sign-up</button>
        </div>
      </div>
    </div>
  </header>
):(<header className="p-3 bg-dark text-white">
  <div className="container">
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start container">
      <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
      </a>

      <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
        <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
        <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
        <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
        <li><a href="#" className="nav-link px-2 text-white">About</a></li>
      </ul>

      <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
        <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"></input>
      </form>

      <  div className="row" >
          <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"></img>
          </a>
      
            <a className="dropdown-item" href="#"  onClick={() => auth.signOut()}>Sign out</a>
        </div>
    </div>
  </div>
</header>
  
)}
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
