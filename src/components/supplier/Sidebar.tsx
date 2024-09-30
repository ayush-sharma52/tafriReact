// src/components/supplier/Sidebar.tsx
import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="admin-title">Supplier Panel</h2>
            <ul className="nav-list">
                <li>
                    <button className="nav-button" onClick={() => window.location.href = '/supplier/dashboard'}>Add Packages</button>
                </li>
                <li>
                    <button className="nav-button" onClick={() => window.location.href = '/supplier/unreleased-packages'}>Not Released Packages</button>
                </li>
                <li>
                    <button className="nav-button" onClick={() => window.location.href = '/supplier/released-packages'}>Released Packages</button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
