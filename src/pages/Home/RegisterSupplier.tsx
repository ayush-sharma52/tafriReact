// src/components/RegisterSupplier.tsx
import React, { useState } from 'react';
import '../../styles/home/RegisterSupplier.css'; // Include custom styles

const RegisterSupplier: React.FC = () => {
  const [supplierData, setSupplierData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplierData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/supplier/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData),
      });
      if (response.ok) {
        window.location.href = '/login';
      } else {
        console.error('Registration error');
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="dashboard-section">
      <h2>Register Supplier</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={supplierData.companyName}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <label>
          Contact Name:
          <input
            type="text"
            name="contactName"
            value={supplierData.contactName}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={supplierData.email}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={supplierData.phone}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterSupplier;
