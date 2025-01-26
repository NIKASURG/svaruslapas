import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function home(){
    return(
        <div>
            <button onClick={() => { window.location.href = '/pridetiSkelbima' }}>Pridėti skelbima</button>
        </div>
    )
}
export default home;
