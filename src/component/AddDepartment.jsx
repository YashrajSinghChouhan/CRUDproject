import React, { useEffect, useState } from "react";
import "./table.css";
import axios from "axios";

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

const AddDepartment = () => {
  const [success,gotsuccess] = useState("")
  const [error, gotError] = useState("");
  const [data, newData] = useState([]);
  const [editId, newedit] = useState("");
  const[DepT, setdept] = useState({
    deptName: "",
    deptHead: "",
    empCount: "",});
  
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/getDepartment/")
      .then((res) => {
        newData(res.data);
      })
      .catch((err) => {gotError(err.message); gotsuccess("")});
  }, []);

  const deletedept = (deptId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfcookie()
      }
    }

    console.log("csrf : ",csrfcookie(),config)
    axios
      .delete(`http://127.0.0.1:8000/deleteDepartment/${deptId}`, config)
      .then((res) => {console.log(res.data); {gotsuccess("Department deleted"); gotError("");}})
      .catch((err) => {gotError(err.message); gotsuccess("")});
  };
  
  let name, value;
  const handleInput = e =>{
    name = e.target.name;
    value = e.target.value;
    setdept({...DepT,[name]:value});
  }

  const updatedept = (deptId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfcookie()
      }
    }
    const data = {
      deptId: deptId,
      deptName: DepT.deptName,
      deptHead: DepT.deptHead,
      empCount: DepT.empCount,
    };
    axios
      .put("http://127.0.0.1:8000/editDepartment/", data, config)
      .then((res) => {console.log(res.data); newedit(""); {gotsuccess("Department updated"); gotError("");}})
      .catch((err) => {gotError(err.message); gotsuccess("")});
  };

  const adddept = () => {
    let deptId = document.getElementById("deptId").value;
    let deptName = document.getElementById("deptName").value;
    let deptHead = document.getElementById("deptHead").value;
    let empCount = document.getElementById("empCount").value;

    const data = {
      deptId: deptId,
      deptName: deptName,
      deptHead: deptHead,
      empCount: empCount,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfcookie()
      }
    }
    axios
      .post("http://127.0.0.1:8000/addingDepartment/", data, config)
      .then((res) => {console.log(res.data); {gotsuccess("Department Added"); gotError("");}})
      .catch((err) => {gotError(err.message); gotsuccess("")});
  };

  return (
    <>
      <center style={{ margin: "50px" }}>
        <h1>Add Department Details</h1>
      </center>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">dept ID</th>
            <th scope="col">Dept Name</th>
            <th scope="col">Dept Head</th>
            <th scope="col">Emp Count</th>
            <th scope="col">if_complete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col">
              <input id="deptId" type="number"></input>
            </th>
            <th scope="col">
              <input id="deptName" type="text"></input>
            </th>
            <th scope="col">
              <input id="deptHead" type="text"></input>
            </th>
            <th scope="col">
              <input
                id="empCount"
                type="number"
                max="10000000000"
                min="999999999"
              ></input>
            </th>
            <th scope="col">
              <button onClick={adddept} type="button" class="btn btn-primary">
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
            <th scope="col">dept ID</th>
            <th scope="col">Dept Name</th>
            <th scope="col">Dept Head</th>
            <th scope="col">Emp Count</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((dept) => {
            const { deptId, deptName, empCount, deptHead} = dept;
            return editId === deptId ? (
              <tr>
                <th scope="col">{deptId}</th>
                <th scope="col">
                  <input onChange={handleInput} value={DepT.deptName} name="deptName" id="deptName" type="text"></input>
                </th>
                <th scope="col"> 
                  <input onChange={handleInput} value={DepT.deptHead} name="deptHead" id="deptHead" type="text"></input>
                </th>
                <th scope="col">
                  <input onChange={handleInput} value={DepT.empCount}
                    name="empCount" id="empCount"
                    type="number"
                  ></input>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={()=>updatedept(deptId)}
                    class="btn btn-success">
                    Update
                  </button>
                </th>
              </tr>
            ) : (
              <tr>
                <th scope="col">{deptId}</th>
                <th scope="col">{deptName}</th>
                <th scope="col">{deptHead}</th>
                <th scope="col">{empCount}</th>
                <th>
                  <button
                    type="button"
                    onClick={() => newedit(deptId)}
                    class="btn btn-warning"
                  >
                    Edit
                  </button>{" "}
                  <button
                    onClick={() => deletedept(deptId)}
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

export default AddDepartment;
