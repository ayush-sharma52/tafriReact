import React, { useState } from "react";
import '../styles/Admin/AdminSidebar.css';

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div className="sidebar">
          <h2 className="admin-title">Admin Panel</h2>
          <button className="toggle-button" onClick={toggleSidebar}>
            ✖️
          </button>
          <ul className="nav-list">
            <li>
              <button className="nav-button" onClick={() => window.location.href = "/Admin/Dashboard"}>
                Dashboard
              </button>
            </li>
            <li>
              <button className="nav-button" onClick={() => window.location.href = "/admin/add-map-location"}>
                Add Location on Map
              </button>
            </li>
            <li>
              <button className="nav-button" onClick={() => window.location.href = "/admin/approved-packages"}>
               Approved Packages
              </button>
            </li>
            <li>
              <button className="nav-button" onClick={() => window.location.href = "/admin/assign-package"}>
               Assign Packages
              </button>
            </li>
            <li>
              <button className="nav-button" onClick={() => window.location.href = "/admin/pending-suppliers"}>
               Pending Suppliers
              </button>
            </li>
            <li>
              <button className="nav-button" onClick={() => window.location.href = "/admin/manage-suppliers"}>
               Manage Suppliers
              </button>
            </li>


            {/* Add more navigation options as needed */}
          </ul>
        </div>
      )}
      {!isOpen && (
        <button className="toggle-button open-button" onClick={toggleSidebar}>
          ☰
        </button>
      )}
    </div>
  );
};

export default AdminSidebar;
