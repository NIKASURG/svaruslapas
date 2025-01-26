import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from "firebase/auth";

function pasisveikinimas() {
    const user = auth.currentUser;
    try {
        const vardas = user.displayName;
        console.log(vardas)
        if (vardas === null) {
            console.log('Sveiki, svečias')
            return 'Sveiki, svečias'
        }
        if (vardas[vardas.length - 1] === 'a') {
            console.log('Sveika, ' + vardas)
            return 'Sveika, ' + vardas
        }
        else if (vardas[vardas.length - 2] + vardas[vardas.length - 1] === 'as') {
            const vardasSuKitaGalune = vardas.replace(/s$/, 'i')

            console.log('Sveikas, ' + vardasSuKitaGalune)
            return 'Sveikas, ' + vardasSuKitaGalune
        }
        else if (vardas[vardas.length - 2] + vardas[vardas.length - 1] === 'us') {
            const vardasSuKitaGalune = vardas.replace(/us$/, 'au')
            console.log('Sveikas, ' + vardasSuKitaGalune)
            return 'Sveikas, ' + vardasSuKitaGalune
        }
        else if (vardas[vardas.length - 2] + vardas[vardas.length - 1] === 'is') {
            const vardasSuKitaGalune = vardas.replace(/is$/, 'i')
            console.log('Sveikas, ' + vardasSuKitaGalune)
            return 'Sveikas, ' + vardasSuKitaGalune
        } else if (vardas[vardas.length - 1] === 'ė') {
            const vardasSuKitaGalune = vardas.replace(/ė$/, 'ę')
            console.log('Sveika, ' + vardasSuKitaGalune)
            return 'Sveika, ' + vardasSuKitaGalune
        } else (
            console.log('Sveiki, ' + vardas)
            // return 'Sveiki, '+ vardas 
        ).catch((error) => {
            console.error("Error updating profile:", error.code, error.message);
        });
    }
    catch {
        console.log('Sveiki, svečias')
        return 'Sveiki, svečias'

    }
}
export default pasisveikinimas;
