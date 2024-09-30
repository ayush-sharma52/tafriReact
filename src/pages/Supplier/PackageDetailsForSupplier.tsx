// src/pages/PackageDetailsForSupplier.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import '../../styles/supplier/packageDetails.css';
import { PackageDTO } from '../../types/Package';

const PackageDetailsForSupplier: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Extracting package ID from URL params
    const [packageDetails, setPackageDetails] = useState<PackageDTO | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate(); // Updated hook

    // Fetch package details on component mount
    useEffect(() => {
        const fetchPackageDetails = async () => {
            if (!id) {
                setErrorMessage('Invalid package ID');
                return;
            }
            try {
                const response = await fetch(`https://localhost:7259/api/Package/Details/${id}`);

                if (response.ok) {
                    const data = await response.json();
                    setPackageDetails(data);
                    sessionStorage.setItem('SelectedPackageId', id); // Store selected package ID
                } else {
                    setErrorMessage('Failed to fetch package details');
                }
            } catch (error) {
                console.error(error);
                setErrorMessage('Error fetching package details');
            }
        };

        fetchPackageDetails();
    }, [id]);

    // Navigate back to the dashboard
    const handleBackToDashboard = () => {
        navigate('/supplier/dashboard'); // Replaces useHistory().push
    };

    return (
        <div className="container">
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
            {packageDetails ? (
                <div className="card">
                    <div className="card-header">
                        <h2>{packageDetails.name}</h2>
                    </div>
                    <div className="card-body">
                        <p><strong>Destination:</strong> {packageDetails.destination}</p>
                        <p><strong>Price:</strong> ${packageDetails.price.toFixed(2)}</p>
                        <p><strong>Description:</strong> {packageDetails.details}</p>
                        <p><strong>Available:</strong> {packageDetails.count}</p>
                        <button className="btn btn-light" onClick={handleBackToDashboard}>Back to Dashboard</button>
                    </div>
                </div>
            ) : (
                <p>Loading package details...</p>
            )}
        </div>
    );
};

export default PackageDetailsForSupplier;
