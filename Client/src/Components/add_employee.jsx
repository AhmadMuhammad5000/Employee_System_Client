import { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import '../assets/style/add_employee.css';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [values, setValues] = useState({
        fullname: '',
        email: '',
        address: '',
        category: '',
        account: '',
        salary: ''
    });
    const [option, setOption] = useState([]);
    const [error, setError] = useState('');
    const anvigate = useNavigate();
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/categories`)
            .then(res => {
                if (res.data.status) {
                    setOption(res.data.data);
                } else {
                    setError(res.data.error);
                    anvigate('/login');
                }
            }).catch(err => setError(err));

    }, []);

    // Sending data to server
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/add_employees`, values)
            .then(res => {
                if (res.data.status) {
                    anvigate("/dashboard");
                } else {
                    setError(res.data.error);
                    anvigate('/login');
                }

            }).catch(err => setError(err));
    }

    return (
        <>
            <div className="d-flex ms-md-4 mt-md-4 " id="fromParent">
                <div className="p-4 ms-md-4 mt-md-4" id="form">
                    <form onSubmit={handleSubmit} className="ms-md-4 form-control p-4 border shadow">
                        {error && <p className="text-light bg-danger p-1 text-center rounded">{error}</p>}

                        <h3 className="mb-4 text-secondary text-center"> Add Employee</h3>
                        <div className="mb-2">
                            <label htmlFor="name">FullName</label> <br />
                            <input type='text' className="form-control" onChange={(e) => setValues({ ...values, fullname: e.target.value })}
                                placeholder='Employee Name' required />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email">Email</label> <br />
                            <input type='text' className="form-control" onChange={(e) => setValues({ ...values, email: e.target.value })}
                                placeholder='Employee Email' required />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="address">Address</label> <br />
                            <input type='text' className="form-control" onChange={(e) => setValues({ ...values, address: e.target.value })}
                                placeholder='Employee Address' required />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="address">Account No</label> <br />
                            <input type='text' className="form-control" onChange={(e) => setValues({ ...values, account: e.target.value })}
                                placeholder='8085615786' required />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="category">Category</label> <br />
                            <select className="form-control"
                                onChange={(e) => setValues({ ...values, category: e.target.value })}>
                                {
                                    option.map((data, index) => {
                                        return <option value={data.name} key={index}>{data.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="sallary">Salary</label> <br />
                            <input type='text' className="form-control" onChange={(e) => setValues({ ...values, salary: e.target.value })}
                                placeholder='Employee Sallary' required />
                        </div>

                        <button className="mt-3 mb-3 btn btn-secondary w-100">Save Employee</button>

                    </form>
                </div>
            </div >

        </>
    )
}

export default AddEmployee