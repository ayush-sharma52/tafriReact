// SupplierDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import '../../styles/Admin/SupplierDetails.css'; // Import the CSS file

interface User {
  name: string;
  emailId: string;
  isAuthorized: boolean;
  companyName: string;
  address: string;
  contactPerson: string;
  phoneNumber: string;
  accountNumber: string;
}

const SupplierDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [supplier, setSupplier] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await fetch(`https://localhost:7259/api/User/findUserById/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSupplier(data);
      } catch (error) {
        console.error('Failed to fetch supplier:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  const handleBackToDashboard = () => {
    window.location.href = "/admin/pending-suppliers";
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // Add a loading indicator if desired
  }

  if (!supplier) {
    return <div className="no-supplier">No supplier found.</div>; // Handle case where supplier is not found
  }

  return (
    <div className="container">
      <div className="user-details">
        <h1 className="header">Supplier Details</h1>
        <div className="user-info">
          <div className="info-item">
            <label className="label">Name:</label>
            <span className="info-span">{supplier.name}</span>
          </div>
          <div className="info-item">
            <label className="label">Email:</label>
            <span className="info-span">{supplier.emailId}</span>
          </div>
          <div className="info-item">
            <label className="label">Authorized:</label>
            <span className="info-span">{supplier.isAuthorized ? 'Yes' : 'No'}</span>
          </div>
          <div className="info-item">
            <label className="label">Company Name:</label>
            <span className="info-span">{supplier.companyName}</span>
          </div>
          <div className="info-item">
            <label className="label">Address:</label>
            <span className="info-span">{supplier.address}</span>
          </div>
          <div className="info-item">
            <label className="label">Contact Person:</label>
            <span className="info-span">{supplier.contactPerson}</span>
          </div>
          <div className="info-item">
            <label className="label">Phone Number:</label>
            <span className="info-span">{supplier.phoneNumber}</span>
          </div>
          <div className="info-item">
            <label className="label">Account Number:</label>
            <span className="info-span">{supplier.accountNumber}</span>
          </div>
        </div>
        <button className="back-button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SupplierDetails;
