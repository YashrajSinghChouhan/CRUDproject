import React from "react";
import './cards.css';
import { useNavigate } from "react-router-dom";

const Card =  (props) =>{
    const navigate = useNavigate();
    return(
        <>
        <button onClick={()=>navigate(props.path)} className="card cards">
          <div className="title-fullWidth">
          <center>
  <div className="card-img-top" style={{fontSize:"100px"}}>+</div>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.des}</p>
  </div>
  </center>
  </div>
</button>
        </>
    );
}

export default Card;