import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

import '../assets/style/add_employee.css';

const AddCategory = () => {
    const [category, setCategory] = useState('');

    // Sending data to server
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/categories`)
            .then(result => {
                if (result.data.status) {

                } else {
                    navigate('/login');
                }

            })

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/add_category`,{category})
            .then(result => {
                if (result.data.status) {
                    navigate('/dashboard/category');
                } else {
                    navigate('/login');
                }

            }).catch(err => console.log(err));
    }


    return (
        <>
            <div className="d-flex ms-md-4 mt-md-4 " id="fromParent">
                <div className="p-4 ms-md-4 mt-md-4" id="form">
                    <form onSubmit={handleSubmit} className="ms-md-4 form-control p-4 border shadow" autoComplete="off">
                        <h3 className="mb-4 text-secondary text-center"> Add Category</h3>
                        <div className="mb-2">
                            <label htmlFor="name">Category</label> <br />
                            <input type='text' id="name" name="name" className="form-control" onChange={(e) => setCategory(e.target.value)}
                                placeholder='Category Name' required />
                        </div>

                        <button className="mt-3 mb-3 btn btn-secondary w-100">Save Category</button>

                    </form>
                </div>
            </div >

        </>
    )
}

export default AddCategory