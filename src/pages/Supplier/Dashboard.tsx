// src/pages/SupplierDashboard.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/supplier/Sidebar';
import AddPackageForm from '../../components/supplier/AddPackageForm';
import '../../styles/supplier.css';
import { PackageDTO } from '../../types/Package';

const Dashboard: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [packages, setPackages] = useState<PackageDTO[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Fetch supplier packages on component mount
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(`https://localhost:7259/api/Package/GetPackagesBySupplier/${sessionStorage.getItem('UserId')}`);
                if (response.ok) {
                    const data = await response.json();
                    setPackages(data);
                } else {
                    setErrorMessage('Failed to fetch packages');
                }
            } catch (error) {
                console.error(error);
                setErrorMessage('Error fetching packages');
            }
        };
        fetchPackages();
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="admin-container">
            {isSidebarOpen && <Sidebar />}
            <div className="header">
                <button className="toggle-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    ☰
                </button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="main-content">
                {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                <AddPackageForm onPackageAdded={setPackages} />
            </div>
        </div>
    );
};

export default Dashboard;
