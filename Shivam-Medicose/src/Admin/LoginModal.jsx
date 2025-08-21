import React, { useContext, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ContextObj } from "../store/medicose-store";
import "./LoginModal.css";

export default function LoginModal() {
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { setSessionBack } = useContext(ContextObj);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('userId', data);
        navigate('/admin');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setIsLogin(true);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Error signing up. Please try again.');
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="login">
      <div className="form-container">
        <h1 className='text-center'>{isLogin ? 'Login' : 'Sign Up'}</h1>
        {error && <Alert variant="danger" onClose={clearError} dismissible>{error}</Alert>}
        {isLogin ? (
          <Form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">Email address</label>
              <input type="email" className="form-control" id="loginEmail" name="email" placeholder="Enter email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="loginPassword" name="password" placeholder="Password" required />
            </div>
            <Button variant="primary" type="submit">Login</Button>
            <p className="mt-3" onClick={() => setIsLogin(false)} style={{ cursor: 'pointer', color: 'blue' }}>
              Don't have an account? Sign up
            </p>
          </Form>
        ) : (
          <Form onSubmit={handleSignupSubmit}>
            <div className="mb-3">
              <label htmlFor="signupUsername" className="form-label">Username</label>
              <input type="text" className="form-control" id="signupUsername" name="username" placeholder="Enter username" required />
            </div>
            <div className="mb-3">
              <label htmlFor="signupEmail" className="form-label">Email address</label>
              <input type="email" className="form-control" id="signupEmail" name="email" placeholder="Enter email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="signupPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="signupPassword" name="password" placeholder="Password" required />
            </div>
            <div className="mb-3">
              <label htmlFor="signupProfileImage" className="form-label">Profile Image</label>
              <input type="file" className="form-control" id="signupProfileImage" name="profileImage" />
            </div>
            <Button variant="primary" type="submit">Sign Up</Button>
            <p className="mt-3" onClick={() => setIsLogin(true)} style={{ cursor: 'pointer', color: 'blue' }}>
              Already have an account? Login
            </p>
          </Form>
        )}
      </div>
    </div>
  );
}
