import React from "react";
import './table.css'

const AddDepartment = () =>{
    return(
        <>
        <center style={{margin:"50px"}}><h1>Add Department Details</h1></center>
        <table className="table">
  <thead className="table-dark">
  <tr>
      <th scope="col">Dept ID</th>
      <th scope="col">Dept Name</th>
      <th scope="col">Dept Head</th>
      <th scope="col">Employees count</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <th scope="col"><input type="number"></input></th>
      <th scope="col"><input type="text"></input></th>
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

export default AddDepartment;