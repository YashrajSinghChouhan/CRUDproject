import React from "react";
import './table.css'

const AddEmployee = () =>{
    return(
        <>
        <center style={{margin:"50px"}}><h1>Add Employee Details</h1></center>
        <table className="table">
  <thead className="table-dark">
  <tr>
      <th scope="col">Emp ID</th>
      <th scope="col">Full Name</th>
      <th scope="col">Hire Date</th>
      <th scope="col">Department</th>
      <th scope="col">Phone no.</th>
      <th scope="col">Gender</th>
      <th scope="col">Salary</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <th scope="col"><input type="number"></input></th>
      <th scope="col"><input type="text"></input></th>
      <th scope="col"><input type="date"></input></th>
      <th scope="col"><input type="text"></input></th>
      <th scope="col"><input type="number" max="10000000000" min="999999999" ></input></th>
      <th scope="col"><input type="text"></input></th>
      <th scope="col"><input type="number"></input></th>
    </tr>
  </tbody>
</table>
<form >
    <div className="tableName">
  <span className="mb-3">
    Table Name : 
    <input type="text" className="editName" />
  </span>
  <button type="submit" className="btn btn-primary">Done</button>
  </div>
</form>
</>
    );
}

export default AddEmployee;