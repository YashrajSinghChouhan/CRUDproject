import React from "react";
import Card from "./Card";

const Home =()=>{
    return(
        <>
        <Card title="Add Department" des="Add your department entries from here" path="/addDepartment" />
        <Card title="Add Employee" des="Add details of any employee from here" path="/addEmployee"/>
        </>
    );
}
export default Home;