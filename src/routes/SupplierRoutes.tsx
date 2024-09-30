// src/routes/SupplierRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReleasedPackages from '../pages/Supplier/ReleasedPackages';
import Dashboard from '../pages/Supplier/Dashboard';
import PackageDetailsForSupplier from '../pages/Supplier/PackageDetailsForSupplier';
import ModifyPackage from '../pages/Supplier/ModifyPackage';
import UnreleasedPackages from '../pages/Supplier/UnreleasedPackages';
import PackageDetails from '../pages/Supplier/PackageDetails';

const SupplierRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard/>} />
      <Route path="released-packages" element={<ReleasedPackages/>} />
      <Route path="package-details/:id" element={<PackageDetailsForSupplier/>} />
      <Route path="PackageDetails/:id" element={<PackageDetails/>} />
      <Route path="modify-package/:id" element={<ModifyPackage />} />
      <Route path="unreleased-packages" element={<UnreleasedPackages/>} />
      
    </Routes>
  );
};

export default SupplierRoutes;
