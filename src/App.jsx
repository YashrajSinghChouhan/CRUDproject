import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from './component/Login'
import Home from "./component/Home";
import NotFound from "./component/NotFound";
import AddDepartment from "./component/AddDepartment";
import AddEmployee from "./component/AddEmployee";

const App =() => {
    return (
        <>
        <Routes>
            <Route exact path="/" Component={Login}/>
            <Route exact path="/home" Component={Home}/>
            <Route exact path="/addDepartment" Component={AddDepartment}/>
            <Route exact path="/addEmployee" Component={AddEmployee}/>
            <Route path="*" Component={NotFound}/>
        </Routes>
        </>
    );
}
export default App;