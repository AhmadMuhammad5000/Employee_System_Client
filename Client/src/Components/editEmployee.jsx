import axios from "axios";
import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"


const EditEmployee = () => {
    const { id } = useParams();

    const [employees, setEmployees] = useState({
        fullname: '',
        email: '',
        address: '',
        category: '',
        account: '',
        salary: ''
    });


    const [options, setOptions] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // getting category list to render within option tag
    const getCategories = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/categories/`)
            .then(res => {
                if (res.data.status) {
                    setOptions(res.data.data);
                } else {
                    setError(res.data.error);
                    navigate('/login');
                }
            }).catch(error => setError(error));
    }

    // getting employee by id
    const getEmployeeById = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/employeeById/${id}`)
            .then(res => {
                if (res.data.status) {
                    setEmployees({
                        ...employees,
                        fullname: res.data.data[0].fullname,
                        email: res.data.data[0].email,
                        address: res.data.data[0].address,
                        category: res.data.data[0].category,
                        salary: res.data.data[0].salary,
                        account: res.data.data[0].account
                    });

                } else {
                    setError(res.data.error);
                    navigate('/login');
                }
            }).catch(err => setError(err));
    }
 
    // setEmployees({ ...employees, account: e.target.value })


    // Updating Employee

    const updateEmployee = () => {
        axios.put(`${process.env.REACT_APP_SERVER_URL}/auth/editEmployee/${id}`, employees)
            .then(res => {
                if (res.data.status) {
                    navigate("/dashboard/employees/");
                } else {
                    setError(res.data.error);
                    navigate('/login');
                }
            }).catch(error => setError(error));
    }

    // handling submit
    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployee();
    }

    useEffect(() => {
        // getting employee by id call
        getEmployeeById();

        // getting category list
        getCategories();


    }, []);

    return (
        <>
            <div className="d-flex ms-md-4 mt-md-4 " id="fromParent">
                <div className="p-4 ms-md-4 mt-md-4" id="form">
                    <form onSubmit={handleSubmit} className="ms-md-4 form-control p-4 border shadow">
                        {error && <p className="text-light bg-danger p-1 text-center rounded">{error}</p>}

                        <h3 className="mb-4 text-secondary text-center"> Edit Employee</h3>
                        <div className="mb-2">
                            <label htmlFor="name">FullName</label> <br />
                            <input type='text' className="form-control" value={employees.fullname}
                                onChange={(e) => setEmployees({ ...employees, fullname: e.target.value })}
                                placeholder='Employee Name' required />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email">Email</label> <br />
                            <input type='text' className="form-control" value={employees.email}
                                onChange={(e) => setEmployees({ ...employees, email: e.target.value })}
                                placeholder='Employee Email' required />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="address">Address</label> <br />
                            <input type='text' className="form-control" value={employees.address}
                                onChange={(e) => setEmployees({ ...employees, address: e.target.value })}
                                placeholder='Employee Address' required />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="sallary">Account</label> <br />
                            <input type='text' className="form-control" value={employees.account}
                                onChange={(e) => setEmployees({ ...employees, account: e.target.value })}
                                placeholder='Employee Sallary' required />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="category">Category</label> <br />
                            <select className="form-control" value={employees.category}
                                onChange={(e) => setEmployees({ ...employees, category: e.target.value })}>
                                {
                                    options.map((data, index) => {
                                        return <option value={data.name} key={index}>{data.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="sallary">Sallary</label> <br />
                            <input type='text' className="form-control" value={employees.salary}
                                onChange={(e) => setEmployees({ ...employees, salary: e.target.value })}
                                placeholder='Employee Sallary' required />
                        </div>

                        <button className="mt-3 mb-3 btn btn-secondary w-100">Update Employee</button>

                    </form>
                </div>
            </div >

        </>
    )
}

export default EditEmployee