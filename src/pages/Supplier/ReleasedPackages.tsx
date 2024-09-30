// src/pages/SupplierReleasedPackages.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/supplier/Sidebar';
import { Package } from '../../types/Package';
import '../../styles/supplier.css';

const ReleasedPackages: React.FC = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(`https://localhost:7259/api/Package/GetPackagesBySupplier/${sessionStorage.getItem('UserId')}`);
                if (response.ok) {
                    const data = await response.json();
                    setPackages(data.filter((pkg: Package) => pkg.released));
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

    const handleWithdrawPackage = async (id: number) => {
        try {
            const response = await fetch(`https://localhost:7259/api/Package/WithdrawPackage/${id}`, {
                method: 'GET',
            });

            if (response.ok) {
                setErrorMessage('Package withdrawn successfully');
                setPackages(packages.filter(pkg => pkg.id !== id));
            } else {
                setErrorMessage('Withdraw of package not allowed');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Error withdrawing package');
        }
    };

    const handlePackageDetails = (id: number) => {
        window.location.href = `/supplier/package-details/${id}`;
    };

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="admin-container">
            {isSidebarOpen && <Sidebar />}
            <div className="header">
                <button className="toggle-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="main-content">
                {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                <h2 className="section-title">Released Packages</h2>
                <div className="content-box package-list-container">
                    <ul className="package-list">
                        {packages.length === 0 ? (
                            <li className="package-item no-request">Currently, there are no packages to be shown</li>
                        ) : (
                            packages.map(packageItem => (
                                <li className="package-item" key={packageItem.id} onClick={() => handlePackageDetails(packageItem.id)}>
                                    <div className="package-info">
                                        <span><strong>Name:</strong> {packageItem.name}</span>
                                        <span><strong>Destination:</strong> {packageItem.destination}</span>
                                        <span><strong>Price:</strong> {packageItem.price.toFixed(2)}</span>
                                        <span><strong>Count:</strong> {packageItem.count}</span>
                                        <span><strong>On Hold:</strong> {packageItem.onHold}</span>
                                    </div>
                                    <button
                                        className="withdraw-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleWithdrawPackage(packageItem.id);
                                        }}
                                    >
                                        Withdraw
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ReleasedPackages;
