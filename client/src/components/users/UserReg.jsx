import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "../users/user.css"
import NavBar from '../NavBar'
import axios from 'axios'
import '../img/lg.gif'

const UserReg = () => {
    const nav = useNavigate();

    const[UserName, setUserName] = useState("");
    const[Email, setEmail] = useState('');
    const[Password, setPassword] = useState('');
    const[CfmPassword, setCfmPassword] = useState('');

    const host = `http://localhost:5000`;

    const RegisterUser = async (e) =>{
        e.preventDefault();
      
        const response = await axios.post(`${host}/api/userRegx`, {
            'UserName': UserName,
            'Email': Email,
            'Password': Password,
            'CfmPassword': CfmPassword
        });

        if(response.data.status == 501){
            alert(response.data.error);
        }

        if(response.data.status == 101){
            alert(response.data.error);
        }

        if(response.data.status == 200){
            alert("User Registered Successfully");
            nav("/userLogin");
        }
    }

    

    return (
        <div className="mainForm">
            <NavBar/>
            <div className="container d-flex justify-content-center">
                <form method="POST" encType="multipart/form-data" className="mt-5 p-3 shadow-lg registerForm rounded">
                    <div className="mb-3 formTop">
                        <center>Register!!</center>
                    </div>
                    <div className="mb-3">
                        <label for="UserName" className="form-label">UserName</label>
                        <input type="text" className="form-control" id="UserName" name="UserName"
                        value={UserName} onChange={(e) => {setUserName(e.target.value)}}
                         />
                    </div>
                    <div className="mb-3">
                        <label for="Email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="Email" name="Email" aria-describedby="emailHelp"
                        value={Email} onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" name="Password"
                        value={Password} onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="CfmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="CfmPassword" name="CfmPassword"
                        value={CfmPassword} onChange={(e) => {setCfmPassword(e.target.value)}}
                        />
                    </div>
                    <center>
                        <button type="submit" className="btn btn-primary" style={{ "width": "15em" }}
                        onClick={RegisterUser}>Register</button>
                    </center>
                </form>
            </div>
        </div>
    )
}

export default UserReg