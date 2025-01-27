import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from './firebase/firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import Login from './assets/login';
import Register from './assets/register';
import Home from './assets/home/home';
import Header from './assets/header';
import PridetiSkelbima from './assets/pridetiSkelbima';
import SkelbimoLentele from './assets/skelbimasTemplate';

const keliai = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/pridetiSkelbima",
    element: <PridetiSkelbima />,
  },
];

const AppRoutes = () => useRoutes(keliai);

function App() {
  const [user, setUser] = useState(null);

 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
// console.log(documents[0])
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="App">
          <AppRoutes />
        </div>
      </BrowserRouter>
     

    </div>
  );
}

export default App;