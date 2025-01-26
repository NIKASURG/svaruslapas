import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth } from "firebase/auth";


const auth = getAuth();
const user = auth.currentUser;
function home(){
    return(
        <div>
            <button onClick={() => { window.location.href = '/pritetiSkelbima' }}>Pridėti skelbima</button>
        </div>
    )
}
export default home;
