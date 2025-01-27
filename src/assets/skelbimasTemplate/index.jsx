import React from 'react';

function SkelbimoLentele({ preke, aprasimas, kaina }) {
  return (
    <div>
      <h1>{preke}</h1>
      <p>{kaina}€</p>
      <p>{aprasimas}</p>
    </div>
  );
}

export default SkelbimoLentele;
