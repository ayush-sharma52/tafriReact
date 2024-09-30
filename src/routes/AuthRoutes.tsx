// src/routes/AuthRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Home/Login';
import RegisterUser from '../pages/Home/RegisterUser';
import RegisterSupplier from '../pages/Home/RegisterSupplier';

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register-user" element={<RegisterUser />} />
      <Route path="register-supplier" element={<RegisterSupplier />} />
      
      
    </Routes>
  );
};

export default AuthRoutes;
