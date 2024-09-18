// src/components/SupplierDashboard.tsx
import React, { useState, useEffect } from 'react';
import '../../styles/supplier.css'; // Ensure Supplier.css contains the provided styles

const SupplierDashboard: React.FC = () => {
  const [supplierId, setSupplierId] = useState<number | null>(null);
  const [packageData, setPackageData] = useState({
    name: '',
    destination: '',
    details: '',
    count: 0,
    onHold: 0,
    price: 0,
    released: 'false',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Simulating fetching supplier ID from session storage
    const storedSupplierId = sessionStorage.getItem('UserId');
    if (storedSupplierId) {
      const id = parseInt(storedSupplierId);
      setSupplierId(id);
    } else {
      setErrorMessage('Supplier ID not found in session.');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPackageData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (packageData.onHold > packageData.count) {
      setErrorMessage("Hold can't be more than total count of the package");
      return;
    }

    const supplierId = sessionStorage.getItem('UserId');
    if (!supplierId) {
      setErrorMessage('Supplier ID not found in session.');
      return;
    }

    const payload = {
      ...packageData,
      userId: parseInt(supplierId),
      available: packageData.count - packageData.onHold,
      hold: packageData.onHold > 0,
    };

    try {
      const response = await fetch('http://localhost:5042/api/Package/AddPackage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setErrorMessage('Package added successfully.');
        setPackageData({
          name: '',
          destination: '',
          details: '',
          count: 0,
          onHold: 0,
          price: 0,
          released: 'false',
        });
      } else {
        setErrorMessage('Failed to add package.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while adding the package.');
    }
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('hidden');
    }
  };

  return (
    <div className="admin-container">
      {errorMessage && (
        <div className="errorMessage">
          <ul>
            <li>{errorMessage}</li>
          </ul>
        </div>
      )}

      <button className="logout-button" onClick={() => (window.location.href = '/Home/Logout')}>
        Logout
      </button>

      {/* Sidebar */}
      <div className="sidebar hidden" id="sidebar">
        <h2 className="admin-title">Supplier Panel</h2>
        <button className="toggle-button close-button" onClick={toggleSidebar}>
          <i className="fas fa-times"></i>
        </button>

        <ul className="nav-list">
          <li>
            <button className="nav-button" onClick={() => (window.location.href = '/Supplier/AddPackage')}>Add Packages</button>
          </li>
          <li>
            <button className="nav-button" onClick={() => (window.location.href = '/Supplier/UnreleasedPackages')}>Not Released Packages</button>
          </li>
          <li>
            <button className="nav-button" onClick={() => (window.location.href = '/Supplier/ReleasedPackages')}>Released Packages</button>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon for Sidebar Toggle */}
      <button className="toggle-button open-button" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      {/* Main Content Area */}
      <div className="main-content">
        <div id="add-package" className="content-section">
          <h2 className="section-title">Add Package</h2>

          <div className="content-box">
            <form id="add-package-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Package Name:</label>
                <input type="text" id="name" name="name" value={packageData.name} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="destination">Destination:</label>
                <input type="text" id="destination" name="destination" value={packageData.destination} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="details">Details:</label>
                <textarea id="details" name="details" rows={4} value={packageData.details} onChange={handleInputChange} required></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="count">Count:</label>
                <input type="number" id="count" name="count" value={packageData.count} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="onHold">Hold Package Count:</label>
                <input type="number" id="onHold" name="onHold" value={packageData.onHold} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" step="0.01" value={packageData.price} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="released">Release:</label>
                <select id="released" name="released" value={packageData.released} onChange={handleInputChange} required>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="form-group">
                <button type="submit" className="submit-button">Add Package</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
