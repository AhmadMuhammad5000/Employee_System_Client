import { Link , useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import axios from "axios";

const Profile = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [values, setValues] = useState({
    id: null,
    fullname: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/get_admin`)
      .then(res => {
        if (res.data.status) {
          setValues({
            ...values,
            id: res.data.data[0].id,
            fullname: res.data.data[0].fullname,
            email: res.data.data[0].email
          });
        } else {
          setError(res.data.error);
          navigate('/login');
        }
      }).catch(error => setError(error));


  }, []);

  // Sending data to server
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_SERVER_URL}/auth/update`, values)
      .then(res => {
        if (res.data.status) {
          setMessage(res.data.data);
        } else {
          setError(res.data.error);
          navigate('/login');
        }

      }).catch(err => setError(err));
  })

  return (
    <>
      <div className="d-flex ms-md-4 mt-md-4 " id="fromParent">
        <div className="p-4 ms-md-4 mt-md-4" id="form">
          <form onSubmit={handleSubmit} className="ms-md-4 form-control p-4 border shadow">
            {error && <p className="text-light bg-danger p-1 text-center rounded">{error}</p>}
            {message && <p className="text-light bg-success p-1 text-center rounded">{message}</p>}

            <h3 className="mb-4 text-secondary text-center"> Account </h3>
            <div className="mb-2">
              <label htmlFor="name">Fullname</label> <br />
              <input type='text' id="name" name="name" className="form-control" value={values.fullname}
                onChange={(e) => setValues({ ...values, fullname: e.target.value })}
                placeholder='FullName' required />
            </div>

            <div className="mb-2">
              <label htmlFor="email">Email</label> <br />
              <input type='text' id="email" name="email" className="form-control" value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                placeholder='Email' required />
            </div>

            <div className="mb-2">
              <label htmlFor="password">Password</label> <br />
              <input type='text' id="password" name="password" className="form-control"
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                placeholder='Password' required />
            </div>

            <button className="mt-3 mb-3 btn btn-secondary w-100">Update</button>

          </form>
        </div>
      </div >

    </>
  )
}

export default Profile