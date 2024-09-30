import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

// Define the shape of the Package using TypeScript interface
interface Package {
  id: number;
  name: string;
  destination: string;
  price: number;
  finalPrice: number;
  count: number;
  onHold: number;
  released:boolean;
  visible:boolean;
}

const PendingPackages: React.FC = () => {
  const [pendingPackages, setPendingPackages] = useState<Package[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    // Fetch pending packages from the API
    const fetchPendingPackages = async () => {
      try {
        const response = await fetch('https://localhost:7259/api/Package/GetPackages');
        if (!response.ok) {
          throw new Error('Failed to fetch pending packages');
        }
        const data: Package[] = await response.json();
        
        setPendingPackages(data.filter((pkg)=> pkg.released && !pkg.visible));
      } catch (error) {
      }
    };

    fetchPendingPackages();
  }, []);

  // Function to handle approving a package
  const handleApprovePackage = async (packageId: number) => {
    try {
      const response = await fetch(`https://localhost:7259/api/Package/TogglePackage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packageId),
      });
      if (!response.ok) {
        throw new Error('Failed to approve the package');
      }
      // Refresh the list after approving
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle disapproving a package
  const handleDisapprovePackage = async (packageId: number) => {
    try {
      const response = await fetch(`https://localhost:7259/api/Package/DisapprovePackage/${packageId}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to disapprove the package');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle redirecting to the ModifyPackage component
  const handleModifyPackage = (pkg: Package) => {
    navigate(`/modify-package/${pkg.id}`); // Redirect to the ModifyPackage component
  };

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
    <AdminSidebar/>
    <div className="admin-container">
    
      <div className="main-content">
        <div id="approve-packages" className="content-section">
          <h2 className="section-title">Pending Packages</h2>
          <div className="content-box">
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
            <ul className="item-list">
              {pendingPackages.length === 0 ? (
                <li className="item norequest">Currently, there are no requests pending for approval</li>
              ) : (
                pendingPackages.map((pkg) => (
                  <li
                    key={pkg.id}
                    className="item"
                    onClick={() => (window.location.href = `/admin/package-details/${pkg.id}`)}
                  >
                    <span>Name: {pkg.name}</span>
                    <span>Destination: {pkg.destination}</span>
                    <span>Price: {pkg.price.toFixed(2)}</span>
                    <span>Final Price: {pkg.finalPrice.toFixed(2)}</span>

                    <div>
                      <button className="approve-button" onClick={(e) => { e.stopPropagation(); handleApprovePackage(pkg.id); }}>
                        Approve
                      </button>
                      <button className="lock-button" onClick={(e) => { e.stopPropagation(); handleDisapprovePackage(pkg.id); }}>
                        Disapprove
                      </button>
                      <button className="approve-button" onClick={(e) => { e.stopPropagation(); handleModifyPackage(pkg); }}>
                        Modify
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PendingPackages;
