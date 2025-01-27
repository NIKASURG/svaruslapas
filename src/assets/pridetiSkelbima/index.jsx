import React, { useState } from 'react';
import { db,auth,saveTask,deleteTask} from '../../firebase/firebaseConfig';
import { getAuth } from "firebase/auth";

const PridetiSkelbima = () => {
    const user = auth.currentUser;
    
    function paspaustas(e) {
        e.preventDefault();
      
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);  // Patikrink, ar formJson turi reikšmes
      
        if (formJson.Prekė && formJson.Aprašymas && formJson.Kaina) {
          saveTask(formJson.Prekė, formJson.Aprašymas, formJson.Kaina);
        } else {
          alert("Prašome užpildyti visus laukus!");
        }
      }

    return (    
        <form onSubmit={paspaustas} >
            <input name='Prekė' type="text" placeholder="Prekė" />
            <input name='Aprašymas' type="text" placeholder="Aprašymas" />
            <input name='Kaina' type="text" placeholder="Kaina" />
            <button type="submit" >Įkelti skelbimą</button>
        </form>
    );
};

export default PridetiSkelbima;