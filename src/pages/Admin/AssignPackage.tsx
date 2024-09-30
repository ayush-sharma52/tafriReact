import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export interface User {
    id: number;
    name: string;
    emailId: string;
    password: string;
    role: string;
    isAuthorized: boolean;
    createdAt: Date;
    companyName?: string;
    address?: string;
    contactPerson?: string;
    phoneNumber?: string;
    accountNumber?: string;
    
  }

  export interface Package {
    id: number;
    name: string;
    destination: string;
    details: string;
    count: number;       
    onHold: number;      
    hold: boolean;       
    available: number;   
    price: number;      
    finalPrice: number;  
    visible: boolean;    
    released: boolean;   
  
    assignedUserId?: number;  
    assignedUser?: User;      
    wishlistedUserId?: number; // For PackagesWishlisted
    wishlistedUser?: User;    // Related User
    userId: number;           // User who published the package
    publishedByUser: User;    // Published by User
  
  }


const AssignPackage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [approvedPackages, setApprovedPackages] = useState<Package[]>([]);
  const [userId, setUserId] = useState<number | ''>('');
  const [packageId, setPackageId] = useState<number | ''>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch users and packages from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('https://localhost:7259/api/User/getUsers');
        const packagesResponse = await fetch('https://localhost:7259/api/Package/GetPackages');

        if (!usersResponse.ok || !packagesResponse.ok) {
          throw new Error('Failed to fetch data.');
        }

        const usersData: User[] = await usersResponse.json();
        const packagesData: Package[] = await packagesResponse.json();

        setUsers(usersData.filter((user) => user.role === 'USER'));
        setApprovedPackages(packagesData.filter((pkg) => pkg.released && pkg.visible));
      } catch (error) {
        setErrorMessage('Error fetching users or packages.');
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userId === '' || packageId === '') {
      setErrorMessage('Please select both a user and a package.');
      return;
    }

    const requestData = {
      userId,
      packageId,
    };

    try {
      const response = await fetch('https://localhost:7259/api/SpecialAssignedPackagesApi/AssignPackage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSuccessMessage('Package assigned successfully.');
        setErrorMessage(null); // Clear any previous error message
      } else {
        setErrorMessage('Failed to assign package.');
        setSuccessMessage(null); // Clear success message
      }
    } catch (error) {
      setErrorMessage('Error during package assignment.');
    }
  };

  return (
    <>
    <AdminSidebar/>
    <div className="main-content">
      <div className="content-box">
        <h2 className="section-title">Assign Package to a User</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">Select User:</label>
            <select
              id="userId"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
              required
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="packageId">Select Package:</label>
            <select
              id="packageId"
              name="packageId"
              value={packageId}
              onChange={(e) => setPackageId(Number(e.target.value))}
              required
            >
              <option value="">-- Select Package --</option>
              {approvedPackages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="submit-button">
              Assign Package
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AssignPackage;
