import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../actions/userAcions';
import Loader from '../../components/Loader';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = window.location.search
    ? window.location.search.split('=')[1]
    : '/admin/dashboard';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    if (error) {
      toast.error(error);
    }
  }, [error, navigate, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(email, password);
    dispatch(login(email, password));
  };

  return (
    <main>
      <div className='login-box'>
        <h2>Login</h2>
        <ToastContainer />
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={submitHandler}>
            <div className='user-box'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>
            <div className='user-box'>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </div>
            <button type='submit' className='btn'>
              <span />
              <span />
              <span />
              <span />
              Submit
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default LoginPage;
