import React, { useEffect, useState } from 'react';
import '../../styles/admin.css'
import AdminSidebar from '../../components/AdminSidebar';

const ApprovedPackages: React.FC = () => {
  const [approvedPackages, setApprovedPackages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('https://localhost:7259/api/Package/GetPackages');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
       
        const approved = data.filter((pkg: any) => pkg.released && pkg.visible);
        setApprovedPackages(approved);
      } catch (error) {
        // setError(error);
      }
    };
    fetchPackages();
  }, []);

  const toggleVisibility = async (packageId: number) => {
    try {
      const response = await fetch('https://localhost:7259/api/Package/TogglePackage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packageId),
      });
      if (!response.ok) {
        throw new Error('Failed to toggle package visibility');
      }
      // Reload the packages after toggling visibility
      const updatedPackages = approvedPackages.filter(pkg => pkg.Id !== packageId);
      setApprovedPackages(updatedPackages);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="admin-container">
     <AdminSidebar/>

      {error && <div className="error-message">{error}</div>}
      {/* <button className="logout-button" onClick={() => window.location.href='/Home/Logout'}>
        Logout
      </button>
        */}
      <button className="toggle-button open-button" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      <div className="main-content">
        <div id="modify-packages" className="content-section">
          <h2 className="section-title">Approved Packages</h2>
          <div className="content-box">
            <ul className="item-list">
              {approvedPackages.length === 0 ? (
                <li className="item norequest">Currently there are no approved packages</li>
              ) : (
                approvedPackages.map((packageItem) => (
                  <li key={packageItem.Id} className="item" onClick={() => window.location.href=`/Admin/PackageDetailsForAdmin/${packageItem.Id}`}>
                    <span>Name: {packageItem.name}</span>
                    <span>Destination: {packageItem.destination}</span>
                    <span>Price: {packageItem.price}</span>
                    <span>FinalPrice: {packageItem.finalPrice}</span>
                    <div>
                      <button className="lock-button" onClick={(e) => { e.stopPropagation(); toggleVisibility(packageItem.id); }}>Withdraw</button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedPackages;
