// src/components/Login.tsx
import React, { useState } from 'react';
import { PasswordHashingService } from '../../services/PasswordHashingService';
import "../../styles/home/Login.css";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages([]); // Reset error messages

    const { email, password } = formData;

    // Client-side validation
    if (!email || !password) {
      setErrorMessages(['Email and password are required.']);
      return;
    }

    try {
      // Prepare the login data
      const loginDto = { Email: email, Password: password };

      // Call the backend API for login
      const response = await fetch("https://localhost:7259/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDto),
      });

      if (response.ok) {
        const user = await response.json();

        if (user === null) {
          setErrorMessages(['User with this EmailId doesn\'t exist. Please recheck email.']);
          return;
        }

        // Verify password if applicable (assuming backend does password checking)
        if (!PasswordHashingService.verifyPassword(password, user.password)) {
          setErrorMessages(['Invalid Password.']);
          return;
        }

        // Store information in sessionStorage for session management
        sessionStorage.setItem('UserId', user.id);
        sessionStorage.setItem('UserEmail', user.email);
        sessionStorage.setItem('UserRole', user.role);

        // Check user role and redirect accordingly
        if (user.role === "ADMIN") {
          window.location.href = "/admin/home";
        } else if (user.role === "SUPPLIER") {
          if (user.isAuthorized === false) {
            setErrorMessages(['We are reviewing your profile for approval. Please try again later.']);
            return;
          }
          window.location.href = "/supplier/dashboard";
        } else if (user.role === "USER") {
          const createdAt = new Date(user.createdAt);
          const currentTime = new Date();

          // Check if the account was created within the last 15 minutes
          if ((currentTime.getTime() - createdAt.getTime()) / 60000 < 15) {
            setErrorMessages([
              `Account created less than 15 minutes ago. Please try again after ${15 - Math.floor((currentTime.getTime() - createdAt.getTime()) / 60000)} minutes.`,
            ]);
            return;
          }
          window.location.href = "/user/home";
        } else {
          setErrorMessages(['Invalid role.']);
        }
      } else {
        setErrorMessages(['Invalid login attempt.']);
      }
    } catch (error) {
      console.error(error);
      setErrorMessages(['An error occurred while trying to log in. Please try again.']);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Display validation errors */}
        {errorMessages.length > 0 && (
          <div className="alert alert-danger errorMessage">
            <ul>
              {errorMessages.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
      <div className="link-container">
        <a href="/register-user" className="button">Register as User</a>
        <a href="/register-supplier" className="button">Register as Supplier</a>
      </div>
    </div>
  );
};

export default Login;
