import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Define the shape of the package data using a TypeScript interface
interface Package {
  id: number;
  name: string;
  destination: string;
  details: string;
  count: number;
  onHold: number;
  price: number;
  finalPrice: number;
}

// Define the props for PackageDetailsComponent
interface PackageDetailsComponentProps {
  pkg: Package;
  onBackToDashboard: () => void;
}

const PackageDetailsComponent: React.FC<PackageDetailsComponentProps> = ({ pkg, onBackToDashboard }) => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>{pkg.name}</h2>
        </div>
        <div className="card-body">
          <p><strong>Destination:</strong> {pkg.destination}</p>
          <p><strong>Description:</strong> {pkg.details}</p>
          <p><strong>Available:</strong> {pkg.count}</p>
          <p><strong>OnHold:</strong> {pkg.onHold}</p>
          <p><strong>Price:</strong> {pkg.price.toFixed(2)}</p>
          <p><strong>Final Price:</strong> {pkg.finalPrice.toFixed(2)}</p>
          <button className="btn btn-light" onClick={onBackToDashboard}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

const PackageDetailsContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get packageId from URL parameters
  const [pkg, setPackage] = useState<Package | null>(null); // State to store package details
  const [error, setError] = useState<string | null>(null);  // State to handle errors

  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!id) {
        setError("Package ID is required");
        return;
      }

      try {
        const response = await fetch(`https://localhost:7259/api/Package/Details/${id}`); // Use packageId from URL

        if (!response.ok) {
          throw new Error('Failed to fetch package details');
        }

        const data: Package = await response.json();
        setPackage(data);

        // Set package ID in session storage (if needed for further actions)
        sessionStorage.setItem('SelectedPackageId', id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchPackageDetails();
  }, [id]);

  const handleBackToDashboard = () => {
    window.location.href = '/admin/pending-packages'; // Redirect to admin dashboard
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {pkg ? (
        <PackageDetailsComponent pkg={pkg} onBackToDashboard={handleBackToDashboard} />
      ) : (
        <div>Loading package details...</div>
      )}
    </div>
  );
};

export default PackageDetailsContainer;
