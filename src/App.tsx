// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';

// Import other route components
import SupplierRoutes from './routes/SupplierRoutes';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import AuthRoutes from './routes/AuthRoutes'; // Import the AuthRoutes

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Common route */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes with a common prefix */}
        <Route path="/*" element={<AuthRoutes />} />
        
        {/* Supplier routes with a common prefix */}
        <Route path="/supplier/*" element={<SupplierRoutes />} />
        
        {/* Admin routes with a common prefix */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* User routes with a common prefix */}
        <Route path="/user/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
