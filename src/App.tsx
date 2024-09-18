// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import LandingPage from './pages/Home/LandingPage';
import Login from './pages/Home/Login';
import RegisterUser from './pages/Home/RegisterUser';
import RegisterSupplier from './pages/Home/RegisterSupplier';
import SupplierDashboard from './pages/Supplier/AddPackage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/supplier/dashboard" element={<SupplierDashboard/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-supplier" element={<RegisterSupplier />} />
      </Routes>
    </Router>
  );
};

export default App;
