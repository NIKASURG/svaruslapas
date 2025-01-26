import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebase/firebaseConfig';
import Login from './assets/login';
import Register from './assets/register';
import Home from './assets/home/home';
import Header from './assets/header';

const keliai = [
  {
    path: "/login",
    element: <Login />,
  }, {
    path: "/register",
    element: <Register />,
  }
  , {
    path: "/home",
    element: <Home />,
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


      <Header />
      <BrowserRouter>
        <div className="App">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </div>
  )
}
 
export default App;
