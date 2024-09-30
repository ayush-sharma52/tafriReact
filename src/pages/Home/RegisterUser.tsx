// src/components/RegisterUser.tsx
import React, { useState } from 'react';
import { PasswordHashingService } from '../../services/PasswordHashingService';
import '../../styles/home/RegisterUser.css';

const RegisterUser: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages([]);
    setSuccessMessage(null);

    const { username, email, password, confirmPassword } = formData;

    // Client-side validation
    const errors = [];
    if (!username || !email || !password || !confirmPassword) {
      errors.push('All fields are required.');
    }
    if (username.length >= 15) {
      errors.push('Username should be of at max 15 characters.');
    }
    if (password !== confirmPassword) {
      errors.push('Passwords do not match.');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      // Check if user with this email already exists
  const responseCheckEmail = await fetch('https://localhost:7259/api/User/findUserByEmailId', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  });

  if (responseCheckEmail.ok) {
    const textResponse = await responseCheckEmail.text();
    
    // Check if the response body is empty
    if (textResponse) {
      const user = JSON.parse(textResponse); // Parse the text into JSON
      if (user) {
        setErrorMessages(['User with this email ID already exists.']);
        return;
      }
    }
  } else {
    setErrorMessages(['Failed to check email existence. Please try again.']);
  }

      // Hash the password before sending it to the backend
      const hashedPassword = await PasswordHashingService.hashPassword(password);

      // Prepare data for registration
      const userDto = {
        Username: username,
        Email: email,
        Password: hashedPassword,
        Role: 'USER',
        IsAuthorized: true,
      };

      // Make the registration API call
      const responseRegister = await fetch('https://localhost:7259/api/Register/registerUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDto),
      });

      if (responseRegister.ok) {
        setSuccessMessage('User registered successfully. Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000); // Redirect after 2 seconds
      } else {
        setErrorMessages(['An error occurred while registering the user.']);
      }
    } catch (error) {
      console.error(error);
      setErrorMessages(['An error occurred during registration. Please try again.']);
    }
  };

  return (
    <div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container">
        <h1>Register as User</h1>
        <form onSubmit={handleSubmit}>
          {errorMessages.length > 0 && (
            <div className="alert alert-danger errorMessage">
              <ul>
                {errorMessages.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          <button type="submit" className="button">Register</button>
        </form>

        <div className="redirect-btn">
          <a href="/login" className="button">Login</a>
          <a href="/register-supplier" className="button">Register as Supplier</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;

