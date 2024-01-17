import React, { useEffect, useState } from "react";
import "./table.css";
import axios from "axios";

const AddEmployee = () => {


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

  const [error, gotError] = useState("");
  const [data, newData] = useState([]);
  const [success,gotsuccess] = useState("");
  const [editId, newedit] = useState("");
  const[Empl, setemp] = useState({
    fullName: "",
    dept: "",
    phoneNo: "",
    gender: "",
    salary: ""});
  
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/getEmployee/")
      .then((res) => {
        newData(res.data);
      })
      .catch((err) => {gotError(err.message); gotsuccess("")});
  }, []);

  const deleteEmp = (empId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfcookie()
      }
    }
    axios
      .delete(`http://127.0.0.1:8000/deleteEmployee/${empId}`, config)
      .then((res) => {console.log(res.data); gotError(""); gotsuccess("Employee Deleted")})
      .catch((err) => {gotError(err.message); gotsuccess("")});
  };
  
  let name, value;
  const handleInput = e =>{
    name = e.target.name;
    value = e.target.value;
    setemp({...Empl,[name]:value});
  }

  const updateEmp = (empId) => {
    console.log("valuesssss : ",Empl.fullName)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfcookie()
      }
    }
    const data = {
      empId: empId,
      fullName: Empl.fullName,
      dept: Empl.dept,
      phoneNo: Empl.phoneNo,
      gender: Empl.gender,
      salary: Empl.salary,
    };
    axios
      .put("http://127.0.0.1:8000/editEmployee/", data, config)
      .then((res) => {console.log(res.data); newedit(""); gotError(""); gotsuccess("Employee Updated")})
      .catch((err) => {gotError(err.message); gotsuccess("")});
  };

  const addEmp = () => {
    let empId = document.getElementById("empId").value;
    let fullName = document.getElementById("fullName").value;
    let dept = document.getElementById("dept").value;
    let phoneNo = document.getElementById("phoneNo").value;
    let gender = document.getElementById("gender").value;
    let salary = document.getElementById("salary").value;

    const data = {
      empId: empId,
      fullName: fullName,
      dept: dept,
      phoneNo: phoneNo,
      gender: gender,
      salary: salary,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfcookie()
      }
    }
    axios
      .post("http://127.0.0.1:8000/addingEmployee/", data, config)
      .then((res) => {console.log(res.data); gotError(""); gotsuccess("Employee Added")})
      .catch((err) => {gotError(err.message); gotsuccess("")});
  };

  return (
    <>
      <center style={{ margin: "50px" }}>
        <h1>Add Employee Details</h1>
      </center>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">Emp ID</th>
            <th scope="col">Full Name</th>
            <th scope="col">Department</th>
            <th scope="col">Phone no.</th>
            <th scope="col">Gender</th>
            <th scope="col">Salary</th>
            <th scope="col">if_complete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col">
              <input id="empId" type="number"></input>
            </th>
            <th scope="col">
              <input id="fullName" type="text"></input>
            </th>
            <th scope="col">
              <input id="dept" type="text"></input>
            </th>
            <th scope="col">
              <input
                id="phoneNo"
                type="number"
                max="10000000000"
                min="999999999"
              ></input>
            </th>
            <th scope="col">
              <input id="gender" type="text"></input>
            </th>
            <th scope="col">
              <input id="salary" type="number"></input>
            </th>
            <th scope="col">
              <button onClick={addEmp} type="button" class="btn btn-primary">
                Add
              </button>
            </th>
          </tr>
        </tbody>
      </table>

      {success !== "" && (
        <center>
          <div class="w-50 mt-5 alert alert-success" role="alert">
            {success}
          </div>
        </center>
      )}
      {error !== "" && (
        <center>
          <div class="w-50 mt-5 alert alert-danger" role="alert">
            {error}
          </div>
        </center>
      )}

      <table className="table mt-5">
        <thead className="table-dark">
          <tr>
            <th scope="col">Emp ID</th>
            <th scope="col">Full Name</th>
            <th scope="col">Department</th>
            <th scope="col">Phone no.</th>
            <th scope="col">Gender</th>
            <th scope="col">Salary</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((emp) => {
            const { dept, empId, fullName, gender, phoneNo, salary } = emp;
            return editId === empId ? (
              <tr>
                <th scope="col">{empId}</th>
                <th scope="col">
                  <input onChange={handleInput} value={Empl.fullName} name="fullName" id="fullName" type="text"></input>
                </th>
                <th scope="col"> 
                  <input onChange={handleInput} value={Empl.dept} name="dept" id="dept" type="text"></input>
                </th>
                <th scope="col">
                  <input onChange={handleInput} value={Empl.phoneNo}
                    name="phoneNo" id="phoneNo"
                    type="number"
                    max="10000000000"
                    min="999999999"
                  ></input>
                </th>
                <th scope="col">
                  <input onChange={handleInput} value={Empl.gender} name="gender" id="gender" type="text"></input>
                </th>
                <th scope="col">
                  <input onChange={handleInput} value={Empl.salary} name="salary" id="salary" type="number"></input>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={()=>updateEmp(empId)}
                    class="btn btn-success"
                  >
                    update
                  </button>
                </th>
              </tr>
            ) : (
              <tr>
                <th scope="col">{empId}</th>
                <th scope="col">{fullName}</th>
                <th scope="col">{dept}</th>
                <th scope="col">{phoneNo}</th>
                <th scope="col">{gender}</th>
                <th scope="col">{salary}</th>
                <th>
                  <button
                    type="button"
                    onClick={() => newedit(empId)}
                    class="btn btn-warning"
                  >
                    edit
                  </button>{" "}
                  <button
                    onClick={() => deleteEmp(empId)}
                    type="button"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AddEmployee;
