import axios from "axios"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const DeleteEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/auth/deleteEmployee/${id}`)
            .then(res => {
                if (res.data.status) {
                    navigate("/dashboard/employees");
                } else {
                    navigate("/dashboard/employees?error=NotDeleted");
                    navigate('/login');
                }
            }).catch(err => console.log(err));
    })
}

export default DeleteEmployee