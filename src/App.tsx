import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import LandingPage from './pages/Home/LandingPage';
import Login from './pages/Home/Login';
import RegisterUser from './pages/Home/RegisterUser';
import RegisterSupplier from './pages/Home/RegisterSupplier';
import SupplierDashboard from './pages/Supplier/AddPackage';
import AddMapLocation from './pages/Admin/AddMapLocation'; // Import the new component
import AdminDashboard from './pages/Admin/AdminDashboard';
import ApprovedPackages from './pages/Admin/ApprovedPackages';
import AssignPackage from './pages/Admin/AssignPackage';
import PendingSuppliers from './pages/Admin/PendingSuppliers';
import ManageSuppliers from './pages/Admin/ManageSupplier';
import PendingPackages from './pages/Admin/PendingPackages';
import ModifyPackage from './pages/Admin/ModifyPackage';
import PackageDetailsContainer from './pages/Admin/PackageDetailsContainer';
import ScheduleSale from './pages/Admin/ScheduleSale';
import ErrorPage from './pages/Admin/ErrorPage';
import SupplierDetails from './pages/Admin/SupplierDetails';
import UserHome from './pages/User/UserHome';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/supplier/dashboard" element={<SupplierDashboard/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-supplier" element={<RegisterSupplier />} />
        <Route path="/admin/add-map-location" element={<AddMapLocation />} />  
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/approved-packages" element={<ApprovedPackages />} />
        <Route path="/admin/assign-package" element={<AssignPackage />} /> 
        <Route path="/admin/pending-suppliers" element={<PendingSuppliers />} /> 
        <Route path="/admin/manage-suppliers" element={<ManageSuppliers />} />
        <Route path="/admin/pending-packages" element={<PendingPackages />} />
        <Route path="/modify-package/:id" element={<ModifyPackage />} />
        <Route path="/admin/package-details/:id" element={<PackageDetailsContainer />} />
        <Route path="/admin/schedule-sale" element={<ScheduleSale />} />
        <Route path="/user/sorryForInconvenience" element={<ErrorPage/>} />
        <Route path="/admin/supplierDetails/:id" element={<SupplierDetails/>} />
        <Route path="/user/userhome" element={<UserHome />} /> 
        




      </Routes>
    </Router>
  );
};

export default App;
