import React from "react";
import './logCss.css';
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
    return (
        <>
        <form className="logCss" >
          <legend><center><h1>Login Form</h1></center></legend>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  
  <button onClick={()=>navigate("/home")} className="btn btn-primary">Login</button>
</form>
        </>
    );
}
export default Login;