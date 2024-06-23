import React, { useState } from 'react';
import  login  from './Api.js'; 
import './login.css';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { Link, useHistory  } from "react-router-dom"


const LoginForm = ({ setIsLoggedIn }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!phoneNumber || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const token = await login(phoneNumber, password);
      console.log('Logged in successfully:', token);
      localStorage.setItem('token', token);
      console.log(token);
      setIsLoggedIn(true);
      history.push('/');
    } catch (error) {
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-form-container">
    <form className="custom-login-form" onSubmit={handleSubmit}>
      <h2 className="custom-form-title">Login</h2>
      <div className="custom-form-group">
        <label className="custom-label" htmlFor="phone">Phone Number</label>
        <input
          className="custom-input"
          type="text"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
        <div className="custom-icon">
          <AiOutlineUser size={20} />
        </div>
      </div>
      <div className="custom-form-group">
        <label className="custom-label" htmlFor="password">Password</label>
        <input
          className="custom-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <div className="custom-icon">
          <AiOutlineLock size={20} />
        </div>
      </div>
      {error && <p className="custom-error">{error}</p>}
      <button className="custom-submit-button" type="submit">Login</button>
      <p>
            Don't have an account?{' '}
            <Link to="/register">Register here</Link>
        </p>
    </form>
  </div>
);
};


export default LoginForm;
