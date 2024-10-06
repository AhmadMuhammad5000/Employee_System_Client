import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate ,useParams } from 'react-router-dom';
import '../assets/style/add_employee.css';

const EditCategory = () => {
    const [category, setCategory] = useState([]);
    const { id } = useParams();

    // GETTING THE ID OF CATEGORY
    const getCategoryById = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/category/${id}`)
            .then(res => {
                if (res.data.status) {
                    setCategory(res.data.data[0].name);
                } else {
                    console.log("an error occured");
                    navigate('/login');
                }
            }).catch(err => consolele.log(err));
    }
    

    const navigate = useNavigate();
    // Update Category
    const updateCategory = () => {
        axios.put(`${process.env.REACT_APP_SERVER_URL}/auth/editCategory/${id}`, { category })
            .then(res => {
                if (res.data.status) {
                    navigate("/dashboard/category")
                } else {
                    console.log("an error occured");
                    navigate('/login');
                }
            }).catch(err => consolele.log(err));
    }

    // handling submit
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        updateCategory();
    })

    useEffect(() => {
        getCategoryById();

    }, []);

    return (
        <>
            <div className="d-flex ms-md-4 mt-md-4" id="fromParent"  autoComplete = 'false'>
                <div className="p-4 ms-md-4 mt-md-4" id="form">
                    <form onSubmit={handleSubmit} className="ms-md-4 form-control p-4 border shadow">
                        <h1 className="mb-4 text-secondary text-center fs-3">Edit Category</h1>
                        <div className="mb-2">
                            <label htmlFor="cname"> Category </label> <br />
                            <input type='text' name='cname' className="form-control"
                                value={category} onChange={(e) => setCategory(e.target.value)}
                                placeholder='Category Name' required />
                        </div>

                        <button className="mt-3 mb-3 btn btn-secondary w-100">Update</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default EditCategory