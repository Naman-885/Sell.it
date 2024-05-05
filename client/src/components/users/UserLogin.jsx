import React, { useState } from 'react'
import NavBar from '../NavBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {

    const nav = useNavigate();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const host = `http://localhost:5000`;

    const LoginUser = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${host}/api/userSignIn`, {
            'Email': Email,
            'Password': Password,
        });

        if (response.data.status == 501) {
            alert(response.data.error);
        }

        if (response.data.status == 200) {

            if(response.data.data != ""){
                localStorage.setItem("uKey", response.data.data);
            }

            nav("/");
        }
    }


    return (
        <div className="mainForm">
            <NavBar />
            <div className="container d-flex justify-content-center">
                <form className="mt-5 p-3 shadow-lg registerForm rounded">
                    <div className="mb-3 formTop">
                        <center>Welcome back!!</center>
                    </div>
                    <div className="mb-3">
                    <label for="Email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="Email" name="Email" aria-describedby="emailHelp"
                        value={Email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label for="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password"
                            value={Password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <a>Forgot Password?</a>
                    </div>
                    <center>
                        <button type="submit" className="btn btn-primary" style={{ "width": "12em" }}
                            onClick={LoginUser}>Login</button>
                    </center>
                </form>
            </div>
        </div>
    )
}

export default UserLogin