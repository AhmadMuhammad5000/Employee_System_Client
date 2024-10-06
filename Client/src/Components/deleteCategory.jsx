import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const DeleteCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/auth/deleteCategory/${id}`)
        .then(res =>{
            if(res.data.status)  {
                navigate('/dashboard/category');
            } else{
                navigate("/dashboard/category?error=Not deleted");
                navigate('/login');
            }
        })
    })
    
}

export default DeleteCategory