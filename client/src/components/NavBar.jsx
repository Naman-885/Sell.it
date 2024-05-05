import React, { useEffect } from 'react'
import "../components/main.css"
import { useNavigate } from 'react-router-dom'


const NavBar = () => {

    useEffect(() => {
        if(localStorage.length > 0){
            document.getElementById("navLogin").style.display = "none";
            document.getElementById("navSignUp").style.display = "none";
            document.getElementById("navProfile").style.display = "block";
            document.getElementById("navLogout").style.display = "block";
        }else{
            document.getElementById("navProfile").style.display = "none";
            document.getElementById("navLogout").style.display = "none";
        }
    },[]);

    const DestroyKey = () => {
        localStorage.clear();
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Sell-It.</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item" id="navLogin">
                                <a className="nav-link" href="/userLogin">Login</a>
                            </li>
                            <li className="nav-item" id="navSignUp">
                                <a className="nav-link" href="/userSignUp">SignUp</a>
                            </li>
                            <li className="nav-item" id="navProfile">
                                <a className="nav-link" href="/userSignUp">Profile</a>
                            </li>
                            <li className="nav-item" id="navLogout">
                                <a className="nav-link" href='/' onClick={DestroyKey} >Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar