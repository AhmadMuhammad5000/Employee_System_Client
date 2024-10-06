import { useEffect, useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import axios from "axios"

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/categories`)
            .then(result => {
                if (result.data.status) {
                    setCategories(result.data.data)
                } else {
                    setError(result.data.error);
                    navigate('/login');
                }
            }).catch(err => setError(result.data.error));
    }, [categories]);

    return (
        <>
            <h2 className="text-center text-primary mt-3">Categories</h2>
            <div className="ms-4 mt-4 " id="tableRow">
                <Link to='/dashboard/add_category'
                    className='btn btn-secondary mt-4 mb-4 p-2 ms-2 rounded-none'>Add Category</Link>

                <table className='table'>
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            categories.map((category, index) => {
                                return <tr key={index}>
                                    <td>{category.name}</td>
                                    <td className="d-flex"><Link to={'/dashboard/editCategory/' + category.id} className="mx-2 btn btn-primary">Edit</Link>
                                        <Link to={'/dashboard/deleteCategory/' + category.id} className="btn btn-danger">Delete</Link>
                                    </td>
                                </tr>
                            })
                        }


                    </tbody>
                </table>

            </div>
        </>
    )
}

export default Categories