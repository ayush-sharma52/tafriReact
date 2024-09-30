// src/routes/UserRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserHome from '../pages/user/UserHome';
// import UserProfile from '../pages/User/UserProfile';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="home" element={<UserHome />} /> 
      {/* Add more user-specific routes here */}
    </Routes>
  );
};

export default UserRoutes;