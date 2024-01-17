import React, { useState } from "react";
import './logCss.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  let csrfcookie = function() {  // for django csrf protection
    let cookieValue = null,
        name = "csrftoken";
    if (document.cookie && document.cookie !== "") {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

  const [usr,user] = useState("");
  const [password,pass] = useState("");
  const [error,gotError] = useState("");


  const check=(e)=>{
    e.preventDefault();
    const data = {
      usrname: usr,
      pwd: password,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfcookie()
      }
    }
    axios.post("http://127.0.0.1:8000/login/",data,config).then((res)=>{res.data==="Success" ? navigate("/home"): gotError("Invalid Credentials")}).catch((err)=>{console.log(err.message);gotError(err.message);})
  }
  const navigate = useNavigate();
  const changepwd=(e)=>{
    pass(e.target.value);
  }
  const changeusr=(e)=>{
    user(e.target.value);
  }
    return (
        <>
        <form className="logCss" >
          <legend><center><h1>Login Form</h1></center></legend>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Username</label>
    <input onChange={changeusr} type="text" className="form-control" name='usr' id="usr" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input onChange={changepwd} type="password" className="form-control" name="password" id="password"/>
  </div>
  
  <button onClick={check} className="btn btn-primary">Login</button>
</form>

      {error !== "" && (
        <center>
          <div class="w-50 mt-5 alert alert-danger" role="alert">
            {error}
          </div>
        </center>
      )}
        </>
    );
}
export default Login;