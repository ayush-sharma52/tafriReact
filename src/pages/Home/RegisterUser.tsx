// src/components/RegisterUser.tsx
import React, { useState } from 'react';
import '../../styles/home/RegisterSupplier.css'; // Include custom styles

const RegisterUser: React.FC = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
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
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
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

export default RegisterUser;
