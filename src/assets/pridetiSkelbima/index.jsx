import React, { useState, useEffect } from 'react';
import { db, auth, saveTask, deleteTask } from '../../firebase/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { miestai } from '../miestai';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PridetiSkelbima.css'; // Papildomas CSS failas

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
      setUser(currentUser);
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
      setFormData({ // Išvalyti formą po pateikimo
        preke: '',
        aprasymas: '',
        kaina: '',
        kategorija: '',
        miestas: '',
      });
      alert("Skelbimas sėkmingai pateiktas!");
    } else {
      alert("Prašome užpildyti visus laukus!");
    }
  };

  const istrinti = (id) => {
    deleteTask(id);
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
              <div className="card shadow-lg p-4 mb-5 bg-white rounded">
                <h2 className="text-center mb-4">Pridėti naują skelbimą</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      name="preke"
                      type="text"
                      placeholder="Prekė"
                      className="form-control form-control-lg rounded-pill"
                      value={formData.preke}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      name="aprasymas"
                      placeholder="Aprašymas"
                      className="form-control form-control-lg rounded"
                      value={formData.aprasymas}
                      onChange={handleChange}
                      rows="3"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      name="kaina"
                      type="text"
                      placeholder="Kaina"
                      className="form-control form-control-lg rounded-pill"
                      value={formData.kaina}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      name="kategorija"
                      className="form-select form-select-lg rounded-pill"
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
                  <div className="mb-4">
                    <select
                      name="miestas"
                      className="form-select form-select-lg rounded-pill"
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
                  <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill">
                    Įkelti skelbimą
                  </button>
                </form>
              </div>

              <h2 className="text-center mb-4">Jūsų skelbimai:</h2>
              <div className="row">
                {skelbimai.length > 0 ? (
                  skelbimai.map((skelbimas) => (
                    <div className="col-md-4 mb-4" key={skelbimas.id}>
                      <div className="card shadow-lg rounded-lg h-100">
                        <img
                          src="https://via.placeholder.com/300"
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
                              onClick={() => istrinti(skelbimas.id)}
                            >
                              Ištrinti 🗑
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">Jūs dar neturite sukurtų skelbimų.</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-center">Norėdami pridėti skelbimus, <a href="/login">prisijunkite</a>.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PridetiSkelbima;