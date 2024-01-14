import React from "react";
import './logCss.css';
import { Link } from "react-router-dom";

const NotFound = () =>{
    return (
        <>
        <div className="logCss">
            <center>
        <h1>Oops! 404 Not Found</h1>
        <p>Sorry, an error has occured, Requested page not found!</p>
        <Link to="/">Go to Home</Link>
        </center>
        </div>
        </>
    );
}

export default NotFound;