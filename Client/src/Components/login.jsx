import React, { useState, useCallback } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios';

import '../assets/style/login.css'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState();

  // Handling Submition
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
      axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/adminLogin`, values)
        .then(result => {
           if(result.data.status) {
             navigate("/dashboard");
           } else{
             setError(result.data.error);
           }
        })
        .catch(err => console.log(err))
  })

  return (
    <>
      <div className='d-flex justify-content-center align-items-center vh-100 login'>
        <div className='p-3 rounded shadow wrapper'>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <h2 className='text-secondary text-center fs-3'>EMS</h2>
            
               <p className='text-center text-warning'> {error && error} </p>

            <div className='mb-3 div'>
              <label htmlFor="email"><strong>Email</strong></label> <br />
              <input className='form-control rounded' type='text' name='email' placeholder='Email Id' required
                onChange={(e) => setValues({ ...values, email: e.target.value })} />
            </div>

            <div className='mb-3 div'>
              <label htmlFor="password"> <strong>Password</strong></label> <br />
              <input className='form-control rounded' type='password' name='password' placeholder='Password' required
                onChange={(e) => setValues({ ...values, password: e.target.value })} />
            </div>

            <button className='form-control btn btn-secondary mb-2'>Login</button>
            <p className='text-left mt-2'> forgot password ? <Link to='/dashboard/reset'>reset</Link></p>

          </form>
        </div>

      </div>
    </>
  )
}

export default Login