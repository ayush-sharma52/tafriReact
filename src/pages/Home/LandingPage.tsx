// src/components/LandingPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "../../styles/home/LandingPage.css"; // Include the custom styles

const LandingPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleNavigate = (path: string) => {
    navigate(path); // Use navigate instead of history.push
  };
 
  return (
    <body>
      <div>
        <h1>Welcome to Tafri Holidays</h1>
        <p>Your one-stop solution for managing all your travel needs.</p>
      </div>
      <div>
        <button className="button" onClick={() => handleNavigate("/login")}>
          Login
        </button>
        <button
          className="button"
          onClick={() => handleNavigate("/register-user")}
        >
          Register User
        </button>
        <button
          className="button"
          onClick={() => handleNavigate("/register-supplier")}
        >
          Register Supplier
        </button>
      </div>
      <div className="special-section">
        <p>Explore our exclusive travel packages now!</p>
      </div>
    </body>
  );
};

export default LandingPage;
