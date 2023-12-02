import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import { useContext } from 'react';
import { AuthContext } from '../../providers/authProvider/index';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const Auth = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  if (authUser) {
    navigate('/');
    return;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default Auth;
