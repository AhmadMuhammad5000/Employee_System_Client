import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import '../assets/style/employee.css'

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/employees`)
      .then(result => {
        if (result.data.status) {
          setEmployees(result.data.data);
        } else {
          navigate('/login');
        }
      }).catch(error => console.log(error));

  }, []);

  return (
    <>
      <h2 className="text-center text-primary mt-3">Employees</h2>
      <div className="ms-4 mt-4 shadow" id="tableRow">
        <Link to='/dashboard/add_employee'
          className='btn btn-secondary mt-4 p-2 ms-2 rounded-none'>Add Employee</Link>

        <div className="d-flex align-items-center mt-4">
          <h4 className="text-secondary mt-2 ms-2">choose row</h4>
          <select className="mt-2 mx-2 h-25" id="selectRow">
            <option value="5">3</option>
            <option value="5">5</option>
            <option value="5">7</option>
          </select>
        </div>

        <table className='table'>
          <thead>
            <tr>
              <th> Fullname</th>
              <th> Address</th>
              <th> Email</th>
              <th> Category</th>
              <th> Account</th>
              <th> Salary</th>
              <th> Action</th>
            </tr>
          </thead>

          <tbody>
            {
              employees.map((data, index) => (
                <tr key={index}>
                  <td>{data.fullname}</td>
                  <td>{data.address}</td>
                  <td>{data.email}</td>
                  <td>{data.category}</td>
                  <td>{data.account}</td>
                  <td>{data.salary}</td>
                  <td className="d-flex"><Link to={'/dashboard/editEmployee/' + data.id} className="mx-2 btn btn-primary">Edit</Link>
                    <Link to={'/dashboard/deleteEmployee/' + data.id} className="btn btn-danger">Delete</Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    </>
  )
}

export default Employees