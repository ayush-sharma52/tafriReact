// src/components/Login.tsx
import React, { useState } from 'react';
import '../../styles/home/Login.css'; // Include the custom styles

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7259/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email:username,Password: password }),
      });
      if (response.ok) {
        // Redirect on successful login
        const data = await response.json();
        
        sessionStorage.setItem('userId', data.id);

        if(data.role == "ADMIN"){
            window.location.href = 'admin/dashboard';
        }
        else if(data.role == "SUPPLIER"){
           window.location.href = 'supplier/add-package';
        }
        else{
          window.location.href = 'user/userhome';

        }
        console.log(response);

        // window.location.href = '/dashboard';
        console.log(response);
      } else {
        console.error('Login error');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    
    <body>
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        
        
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        
        <button type="submit" >
          Login
        </button>

      </form>
      <div className="link-container">
             <a href="/registerUser" className="button">Register as User</a>
             <a href="/registerSupplier" className="button">Register as Supplier</a>
 </div>
    </div>
    </body>
  );
};

export default Login;
