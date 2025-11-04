import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      console.log(token)
      localStorage.setItem('token', token);
      navigate('/dashboard');
    }
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default LoginSuccess;
