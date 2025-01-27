import React, { useState, useEffect } from 'react';
import { db, auth, saveTask } from '../../firebase/firebaseConfig'; 
import { collection, query, where, getDocs } from "firebase/firestore";  
import { miestai } from '../miestai'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const PridetiSkelbima = () => {
  const [skelbimai, setSkelbimai] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null); 
  const [formData, setFormData] = useState({
    preke: '',
    aprasymas: '',
    kaina: '',
    kategorija: '',
    miestas: '',
  });

  const miestaiArray = miestai.split('|');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const userUid = user.uid;
      const skelbimaiRef = collection(db, 'skelbimai');
      const skelbimaiQuery = query(skelbimaiRef, where('uid', '==', userUid));

      setLoading(true);
      
      getDocs(skelbimaiQuery).then(snapshot => {
        const skelbimaiData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSkelbimai(skelbimaiData);
        setLoading(false);
      }).catch(error => {
        console.error("Error getting documents: ", error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { preke, aprasymas, kaina, kategorija, miestas } = formData;

    if (preke && aprasymas && kaina && kategorija && miestas) {
      saveTask(preke, aprasymas, kaina, kategorija, miestas);
    } else {
      alert("Prašome užpildyti visus laukus!");
    }
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Įkeliama...</span>
          </div>
        </div>
      ) : (
        <div>
          {user ? (
            <>
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                  <input
                    name="preke"
                    type="text"
                    placeholder="Prekė"
                    className="form-control rounded-pill shadow-sm"
                    value={formData.preke}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group my-3">
                  <input
                    name="aprasymas"
                    type="text"
                    placeholder="Aprašymas"
                    className="form-control rounded-pill shadow-sm"
                    value={formData.aprasymas}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    name="kaina"
                    type="text"
                    placeholder="Kaina"
                    className="form-control rounded-pill shadow-sm"
                    value={formData.kaina}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group my-3">
                  <select
                    name="kategorija"
                    className="form-select rounded-pill shadow-sm"
                    value={formData.kategorija}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pasirinkite kategoriją</option>
                    <option value="Transportas">Transportas</option>
                    <option value="Nekilnojamasis turtas">Nekilnojamasis turtas</option>
                    <option value="Darbas, paslaugos">Darbas, paslaugos</option>
                    <option value="Buitis">Buitis</option>
                    <option value="Kompiuterija">Kompiuterija</option>
                    <option value="Komunikacijos">Komunikacijos</option>
                    <option value="Technika">Technika</option>
                    <option value="Pramogos">Pramogos</option>
                    <option value="Drabužiai, avalynė">Drabužiai, avalynė</option>
                    <option value="Auginantiems vaikus">Auginantiems vaikus</option>
                  </select>
                </div>
                <div className="form-group my-3">
                  <select
                    name="miestas"
                    className="form-select rounded-pill shadow-sm"
                    value={formData.miestas}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pasirinkite miestą</option>
                    {miestaiArray.map((miestas, index) => (
                      <option key={index} value={miestas}>
                        {miestas}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-sm">
                  Įkelti skelbimą
                </button>
              </form>

              <h2>Jūsų skelbimai:</h2>
              <div className="row">
                {skelbimai.length > 0 ? (
                  skelbimai.map((skelbimas) => (
                    <div className="col-md-4 mb-4" key={skelbimas.id}>
                      <div className="card shadow-lg rounded-lg">
                        <img
                          src="path_to_image.jpg"
                          className="card-img-top rounded-top"
                          alt="Prekės nuotrauka"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{skelbimas.preke}</h5>
                          <p className="card-text text-success">
                            <strong>{skelbimas.kaina}€</strong>
                          </p>
                          <p className="card-text">{skelbimas.aprasymas}</p>
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-warning rounded-pill shadow-sm"
                            >
                              Redaguoti ✏️
                            </button>
                            <button
                              className="btn btn-danger rounded-pill shadow-sm"
                            >
                              Ištrinti 🗑
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Jūs dar neturite sukurtų skelbimų.</p>
                )}
              </div>
            </>
          ) : (
            <p>Norėdami pridėti skelbimus, <a href="/login">prisijunkite</a>.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PridetiSkelbima;
