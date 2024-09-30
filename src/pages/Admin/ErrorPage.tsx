import React from 'react';
import '../../styles/Admin/ErrorPage.css'; // Import the CSS file

const ErrorPage: React.FC = () => {

  const handleBackToHome = () => {
     window.location.href = "/user/userhome";
  };

  return (
    <div className="container">
      <h1 className="header">Oops!</h1>
      <h2 className="subHeader">Sorry for the Inconvenience</h2>
      <h4 className="message">
        It looks like someone else booked the package you selected or the vendor does not provide this package services anymore.
        Currently, we do not have enough package instances to serve your request.
      </h4>
      <h5>Please try again or explore other options.</h5>
      <div className="buttonContainer">
        <button className="button" onClick={handleBackToHome}>Back to Home</button>
      </div>
    </div>
  );
};

export default ErrorPage;
