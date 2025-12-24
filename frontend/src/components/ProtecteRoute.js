import React from 'react';
import { Navigate } from 'react-router-dom';

const Protectedroutes = ({ children }) => {
  const token = localStorage.getItem('token'); // or use context/auth state

  return token ? children : <Navigate to="/login" />;
};

export default Protectedroutes;
