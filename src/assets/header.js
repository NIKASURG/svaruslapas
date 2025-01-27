import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from "firebase/auth";
import pasisveikinimas from '../pasisveikinimas';

function Header() {
    const user = auth.currentUser;


    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="/home" className="nav-link px-2 text-secondary">Home</a></li>
                        <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
                        <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
                        <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                        <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"></input>
                    </form>
                    {!user ? (
                        <div className="text-end">
                            <button type="button" className="btn btn-outline-light me-2" onClick={() => window.location.href = '/login'} >Prisijunkti</button>
                            <button type="button" className="btn btn-warning" onClick={() => window.location.href = '/register'}>Prisiregistruoti</button>
                        </div>
                    ) : (<  div className="d-flex align-items-center" >
                        <div className=" mb-0 me-3">

                            <p >{pasisveikinimas()}</p>
                        </div>
                        <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">

                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAS1BMVEX///+ampqWlpaXl5eSkpKQkJDNzc3l5eX8/Py0tLT19fXu7u74+Pipqamvr6+dnZ3R0dHDw8O6urra2trX19ekpKTh4eHo6OjFxcUTp7HqAAAJ4UlEQVR4nNVd17arOgzcLpAOCan//6UbQ2gJzdLIkHm5Za1DPEeyrGb57y8otsf9Y3OO4/i1K5Hl/x4/NofjMexCguF5i7OTstbqAqZC+Z/5/1cqe50326XXicP++kqU42uMGoX7O7D6dLkell4yG8/zrmA8TrjL3uTSP10ePyv5Q3zKxedDuSN6e39tlqbgje0jU1TONbSOduf90lTmY3tL2Jxrudv7j1B/wEi/oe0pXvtmP1wUlnQBo6PksTS1EVzvFk+6om7idbo2x5ffeeUNrXfPpUl+4bCzWpJ0AWPv61L3QyKm4B+w6W1psjXCsXbQah3Mw7IumKfLa/sxOGsHe1/YhX0twbpgnix4qt0C2PAhmCheiPXhZBdj7bDQNl9MxRvYXXBlf6bLqXgDowOfadmyKt4gqH073Ncg7BLGXkPRjtci7BJ2F4Z2si7auchVgATsQTbYpCE6S9NemY5XkNb13TppOydG0K5vV3FoD8CKhSqr3NoNIiEf5rpiYRewmQTtW4RaX6sIat/FUcyHtYB1w3imruank8yVvDeb43Z7yP8Rx1miPYuHA9AnOG2+kuecVXY79Fd99ps4AVA3YOJs2rlqJ7epQtfmwi48GIOspnFpa3uaGT08L4b5W0DiTNpaxz5rud15pgRGnEdbp97O85XHHEScRTuXNeU3HyzP0CxOOyK7EjHDuJs7n/aFQVunjMB4z0jq8ImfGTvNXni/HdM9RK7ndmU4p5ad3n7SdV2zfPUnXdomBVjV451M3DJSMEcya6UTTCsOfZNH9Dwr/W9bJxDWf5zjxFKNakL+SRxt1jlK+8F4FbQZWkcLzug2DR0Mkonrl/+PbenqlYK7C/d0o+6fazzRbRq8erEhq571FQF9c0vU6V7U1fhuuQN9c4tULsja5xkOplTa1MNjAke6++Kz6+hBGN8p78eZvCKP0OxAjkYM9ORug6yBHocZXcut2N0Aujsx21+la7lmRtxjIJu2uUmIPSPcl6PNELieF5Le6bRFWwgZntSc2viN7qB6e0deYAQMc3wKMmtlROqwDeiKaKcvaDDyp+RAfyYYmphOfZth1Hw8BBK29GyfngoaMnq2fqbZZICzuPEvMxKoyop3ij7oij5x1NDPCnk1z8Gp3Yx9lx7g5x8O0BK9Yyj6mCvJEbe0NXfgtFSNbEPO7hYKvLvYc/RxWOAcccvkWT7ByIcM73B6ckmFOMUcGCfZsElnWI0w25uTdlGDAudsHqWiELR5FmjgxOF0NigF7xTsBaOaoYY8DF4PUaBLHizeveUTRrSjZDNMbbBsUK9w6NFtwTvQbaYLq4+zx3dhHWI570AXk+n1q2KV3zllzsmoJBPIXTCb/7/zD8z28lC8NzzeX5aNe4niR3ibT/PLspMK1BI6A0wz9OmzMVJXvd8TA3ehH+cO+67Qr/D+yHUn3Jsdv8JbWejXfoe3bhfoGYnKX+PdUXSm0/JLvDsnD/dbv8S7lSDhHoo/xbuVbuI5+wVC+S1Hvp43GRJOHvUNHWjyI9NPdWhOMsAF5x/xzx3qkJlXLvg93lUQzkrOVrwDzXIGrLXusWM7qSpcnglggusNjrjRLtvK1IAbLzu8dZNXL3jjK6AXAi/7WeJd0oLMq0DfrRgCZK2ljBBbRgUpA4N08103QZg16Z69CphZKqVh49SUW98KMruYfOGiu9bCsGFGLoWpf2N0s8g9ILw1Jd+kWQIoI9T4oclWSAAAAbNDISOEl+oQwlMFrbU4dPk5phIhPFWEt+aQAr8VwmNDTQRzhy7oUyFSLoAgtISrg8NmyclvcNSWdAcZP2FVf0w8JMN4WKpIufATlBXEQxOQp6GKji7YnpHPNWGcVIdcNYG8pRUdtlC3Un5prIGsy/bAzW41O1T0XUDWosOsOZy3bGwCHNUL5i1aJeP1U3YB5y14xwSRUayRYnkLWjZQCFoBzFtqzAEq01IDzFvMZ8MkUhuAeYtN4wYeYgXQvIUEjoue3kDzFson8+6A9ADOW0Tge/jodThvkR2O3t0qwfMWEDjamMP9tQIW7rShUp81ct5It/cNtJfOuZ3dj5w3MO9QAX2nCpZWq2Eu0LxDBWwcDnhi4BM6xnsEDsiRB7hsYgMp3sCiMC7f217fRoa30rDUKqCHtGd5GwmroYCHOC533IYzQNA8Rg2QpuOPsAKuPgb3Ad+fRtj0rdBDUC4thHfY3gDwpg/knl4bqt/hE7yJ8wXg0ecbRb77KSVvzsT5AsACSRdFJ7bIAVmAucV5sxzGULakCD4ix+phBGdQWyhzQiepz/NOcTEtr2au8EYmjIJTGRZ8ubIMHyTfDfSaytyB2PFaj/WQCHhqUCMzOaPWaKEkb+oUeEFx1xepREKeCsRKoUi09EY1xUXQsFEPcXD1s4tKFBKpphq0wEzKeXaoG0rlPDZF7f0QChILNM0JMiF4CRpvSZPTDGmSinsc1se7sbQCOfQatP0tyLvVL76FPXn8DZo9l/SdW60o8AJUDWJoIlC9qtAe4CJ3bBAddLkjpvPSCLzQWoFcDL+J5Vo69kbmJDOK3gPAeERzFN37nBJhgLE7zkT0ayRhdD7sDV7RjU2YGfRjIlER/DhWwQem1hmgbsB7HbkXnxM1oe3Y9n4D3Yq+poznkfuW9vlu1BFmRrRBiLphfrJA5t+XGjFZW2NT+HXJQ2ZhQv+eXo0IwnNbJnP7PRc6ZB/2BUnsv1JjoQrexT5WAH3vCxaYFfactfD1sU3GFnpfso/zQo8ykTRrh+05ZQm9/xoIPSiTl3WNR8Jg3j8sjdxTwfbMvHDIIqK6D1WtaD6bvYdk7bC/aBLzofurlEKZVmI3acYQE5gPZ/q8ixRaBZna0gd/5sMZL8/sjqG8r42DJ/OxJ119BB7QiA/Bi/lYgtNjh9t7kIFME7jMTk6Mv+A7V+DaBHhtbA72u5mn73g+e6bAbRZoXOoMPO9z1jz1YPMcgevgJ/Y44hlh6tTsiemmD8Pux4PjeJpa9XTz5JTTZk9LW/E+3Ca89umrPuOZVRNmvJw/jqO7fM6qx4rC+r5GYZe4jAhsTpPNSM+3DTQklYbhBsd51arr0J+PFglB5uOY9ots7tto/alVo9ar429sk949OnfEaa9p04EG4vLQR3z+fdWecjjg9kAQvL5kNuWptfF1iP8K7Z60sPYoyn5quv0Z2n9/uy5xv1vZ5w7x35G2Q8cs+2i5QzuprD3/7MLYto8z4xk4trwXE+BBcyhaV14j7+TIsy6fGPH369GoPS/KPY+qE4DaOb8k3ruU1jxX2odQD+BCUbW/0bJCpaqsJ6PkgcLzoo4Ocqf4WuPtKaSceSqPKNj7WmjEmjNV5BwFeo4FD8tyOlaUL/bEeXzl/+73lxJNdLx8AAAAAElFTkSuQmCC" alt="mdo" width="32" height="32" className="rounded-circle"></img>
                        </a>

                        <a className="dropdown-item" href="#" onClick={() => auth.signOut()}>Atsijungti</a>
                    </div>)}
                </div>
            </div>
        </header>
    )
}
export default Header;