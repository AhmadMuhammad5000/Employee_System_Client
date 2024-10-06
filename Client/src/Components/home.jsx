import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

import '../assets/style/home.css'

const Home = () => {
    const [employees, setEmployees] = useState([]);

    const [adminCount, setAdminCount] = useState(0);
    const [empCount, setEmpCount] = useState(0);
    const [salaryCount, setSalaryCaunt] = useState(0);

    const [error, setError] = useState('');
    const anvigate = useNavigate();

    useEffect(() => {
        adminTotal();
        employeeTotal();
        sallaryTotal();

        axios.defaults.withCredentials = true;
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/employees`)
            .then(result => {
                if (result.data.status) {
                    setEmployees(result.data.data);
                } else {
                    setError(result.data.error);
                    anvigate("/login");
                }
            }).catch(() => setError(result.data.error));

    }, []);

    // GET ADMIN TOTAL SUMS
    const adminTotal = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/admin_total`)
            .then(res => {
                if (res.data.status) {
                    setAdminCount(res.data.data[0].adminId)
                } else {
                    setError(res.data.error);
                    anvigate("/login");
                }
            }).catch(err => setError(err));
    }
    // GET EMPLOYEES TOTAL
    const employeeTotal = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/employee_total`)
            .then(res => {
                if (res.data.status) {
                    setEmpCount(res.data.data[0].totalEmp)
                } else {
                    setError(res.data.error);
                    anvigate("/login");
                }
            }).catch(err => setError(err));
    }
    // GET SALLARY TOTAL SUMS
    const sallaryTotal = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/salary_total`)
            .then(res => {
                if (res.data.status) {
                    setSalaryCaunt(res.data.data[0].salaryOfEmp)
                } else {
                    setError(res.data.error);
                    anvigate("/login");
                }
            }).catch(err => setError(err));
    }


    return (
        <>
            {/* boxes */}
            <div className='d-flex mt-4 boxes pt-4'>
                <div className='card shadow'>
                    <div className='card-title w-75 text-center'>
                        <h3 className='fs-4 mt-4'>Admin</h3>
                    </div>
                    <div className='px-3 pt-2 pb-3 rounded'>
                        <div className='d-flex'>
                            <p className='fs-4 text-dark'>Total</p>
                            <p className='ms-4 fs-4 text-dark'>{adminCount}</p>
                        </div>
                    </div>
                </div>

                <div className='card shadow'>
                    <div className='card-title w-75 text-center'>
                        <h3 className='fs-4 mt-4'>Employee</h3>
                    </div>
                    <div className='card-body p-3 rounded mx-4 d-flex'>
                        <div className='d-flex align-items-center'>
                            <p className='fs-4 text-dark'>Total</p>
                            <p className='ms-4 fs-4 text-dark'>{empCount}</p>
                        </div>
                    </div>
                </div>

                <div className='card shadow'>
                    <div className='card-title w-75 text-center'>
                        <h3 className='fs-4 mt-4'>Salary</h3>
                    </div>
                    <div className='card-body p-3 rounded mx-4 d-flex'>
                        <div className='d-flex align-items-center'>
                            <p className='fs-4 text-dark'>Total</p>
                            <p className='ms-4 fs-3 text-dark'>{salaryCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="d-none d-sm-inline mt-4">
                <div className="d-flex mt-4">
                    <h3 className="heading ms-4 mb-1"> Employees </h3>
                    <select className="select mt-2 mx-2">
                        <option value="5">3</option>
                        <option value="5">5</option>
                        <option value="5">7</option>
                    </select>
                </div>

                <table className='table mt-4 ms-4 shadow tableList'>
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
                                    <td className="d-flex"><Link to={`/dashboard/editEmployee/${data.id}`} className="mx-2 btn btn-primary">Edit</Link>
                                        <Link to={`/dashboard/deleteEmployee/${data.id}`} className="btn btn-danger">Delete</Link>
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

export default Home