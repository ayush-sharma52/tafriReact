// src/components/RegisterSupplier.tsx
import React, { useState } from "react";
import { PasswordHashingService } from "../../services/PasswordHashingService"; // Assuming you have this service already
import "../../styles/home/RegisterSupplier.css";

const RegisterSupplier: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    address: "",
    contactPerson: "",
    phoneNumber: "",
    accountNumber: "",
  });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setAgree(!agree);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages([]);
    setSuccessMessage(null);

    const {
      username,
      email,
      password,
      confirmPassword,
      companyName,
      address,
      contactPerson,
      phoneNumber,
      accountNumber,
    } = formData;

    // Client-side validation
    const errors = [];
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !companyName ||
      !address ||
      !contactPerson ||
      !phoneNumber ||
      !accountNumber
    ) {
      errors.push("All fields are required.");
    }
    if (username.length >= 15) {
      errors.push("Username should be of max 15 characters.");
    }
    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      // Check if a user with this email already exists
      const responseCheckEmail = await fetch("https://localhost:7259/api/User/findUserByEmailId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(email),
      });
  
      if (responseCheckEmail.ok) {
          // Safely check if there's a response body
          const textResponse = await responseCheckEmail.text();
  
          // Check if the response body is not empty
          if (textResponse) {
              try {
                  const user = JSON.parse(textResponse); // Attempt to parse the JSON
                  if (user) {
                      setErrorMessages(['User with this email ID already exists.']);
                      return;
                  }
              } catch (jsonError) {
                  console.error('Error parsing JSON:', jsonError);
                  setErrorMessages(['Invalid response from server. Please try again later.']);
              }
          } else {
              console.warn('No response body returned from the server.');
          }
      } else {
          setErrorMessages(['Failed to check email existence. Please try again.']);
      }
        // Hash the password
        const hashedPassword = await PasswordHashingService.hashPassword(password);

        // Prepare data for registration
        const supplierDto = {
          Username: username,
          Email: email,
          Password: hashedPassword,
          CompanyName: companyName,
          Address: address,
          ContactPerson: contactPerson,
          PhoneNumber: phoneNumber,
          AccountNumber: accountNumber,
          Role: 'SUPPLIER',
          IsAuthorized: false,
        };
  
        // Make the registration API call
        const responseRegister = await fetch('https://localhost:7259/api/Register/registerSupplier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(supplierDto),
        });
  
        if (responseRegister.ok) {
          setSuccessMessage('Supplier registered successfully. Redirecting to login...');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000); // Redirect after 2 seconds
        } else {
          setErrorMessages(['An error occurred while registering the supplier.']);
        }
      } catch (error) {
        console.error(error);
        setErrorMessages(['An error occurred during registration. Please try again.']);
      }
    };
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Terms and Conditions Overlay */}
      {!showRegisterForm && (
        <div className="overlay">
          <div className="terms-container">
            <h2 className="heading">Terms and Conditions</h2>

            <p>
              By registering as a supplier on our platform, you agree to comply
              with the following terms and conditions. Failure to adhere to
              these terms may result in termination of your registration and
              potential legal action.
            </p>

            <p>
              <strong>Service Commitment:</strong> The supplier agrees to
              provide all goods and services as specified in their listed
              packages, ensuring that all commitments made to customers are
              fulfilled in a timely and professional manner. The supplier shall
              ensure the quality and accuracy of the items and services
              provided, maintaining consistency with the descriptions and images
              displayed on our platform. The supplier commits to delivering all
              products and services within the agreed-upon timeframes, taking
              into account the customer’s requirements and expectations.
            </p>

            <p>
              <strong>Customer Satisfaction and Support:</strong> Customer
              satisfaction is the supplier’s top priority. The supplier agrees
              to prioritize customer needs and resolve any issues promptly. The
              supplier shall provide customer support 24/7, ensuring that any
              inquiries, complaints, or service requests are addressed in a
              courteous and timely manner. The supplier agrees to provide
              accurate contact information and ensure that they can be reached
              during all agreed-upon hours of operation.
            </p>

            <p>
              <strong>Data Privacy and Security:</strong> The supplier agrees to
              maintain the confidentiality of all customer data obtained through
              our platform and will not share, sell, or misuse such data in any
              way. The supplier acknowledges that any breach of customer data
              may result in severe legal consequences. The supplier must
              implement all necessary security measures to protect customer data
              and prevent unauthorized access or data theft.
            </p>

            <p>
              <strong>Compliance with Laws and Regulations:</strong> The
              supplier agrees to operate in full compliance with all applicable
              laws, regulations, and industry standards. This includes, but is
              not limited to, obtaining all necessary licenses, permits, and
              certifications required to operate legally. The supplier must
              ensure that all services provided comply with health and safety
              regulations and standards.
            </p>

            <p>
              <strong>Transparency and Honesty:</strong> The supplier agrees to
              be transparent and honest in all dealings with customers and our
              platform. The supplier shall not engage in false advertising,
              misleading descriptions, or any form of deceitful behavior. The
              supplier agrees to clearly outline any terms, conditions,
              restrictions, or additional fees associated with their packages.
            </p>

            <p>
              <strong>Intellectual Property:</strong> The supplier agrees not to
              infringe on the intellectual property rights of others. The
              supplier must ensure that all content (including images, text, and
              media) uploaded to our platform is original or properly licensed.
              The supplier shall not use any third-party trademarks, logos, or
              copyrighted material without permission.
            </p>

            <p>
              <strong>Non-Compete and Confidentiality:</strong> The supplier
              agrees not to engage in any activities that would directly compete
              with our platform or harm its reputation. The supplier shall not
              share any proprietary information or trade secrets obtained
              through our platform with any competitors or third parties. The
              supplier agrees to keep all business practices, data, and
              strategies obtained through our platform confidential.
            </p>

            <p>
              <strong>Termination and Suspension:</strong> The platform reserves
              the right to terminate or suspend the supplier's registration if
              any of the terms and conditions are violated. In the event of
              termination, the supplier must fulfill any outstanding commitments
              to customers and provide any necessary refunds. The supplier
              acknowledges that termination may also result in legal action and
              financial penalties.
            </p>

            <p>
              <strong>Amendments to Terms and Conditions:</strong> The platform
              reserves the right to amend these terms and conditions at any
              time. The supplier will be notified of any changes and is expected
              to comply with the updated terms. Continued use of the platform
              after changes are made constitutes acceptance of the new terms.
            </p>

            <p>
              By checking the box below and proceeding with registration, you
              agree to these terms and conditions and acknowledge that you have
              read and understood them in their entirety.
            </p>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="agreeCheckbox"
                checked={agree}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="agreeCheckbox">
                I agree to the terms and conditions
              </label>
            </div>
            <button
              id="agreeButton"
              className="button"
              disabled={!agree}
              onClick={() => setShowRegisterForm(true)}
            >
              I Agree, Proceed to Register
            </button>
          </div>
        </div>
      )}

      {/* Registration Form */}
      {showRegisterForm && (
        <div className="container" id="registerForm">
          <h1 className="heading2">Register as Supplier</h1>
          <form id="registrationForm" onSubmit={handleSubmit}>
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

            {/* Display success message */}
            {successMessage && (
              <p style={{ color: "green", textAlign: "center" }}>
                {successMessage}
              </p>
            )}

            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

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

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label htmlFor="contactPerson">Contact Person Name:</label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
            />

            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

            <label htmlFor="accountNumber">Bank Account Number:</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />

            <button type="submit" className="button">
              Register
            </button>
          </form>
          <div className="redirect-btn">
            <a href="/login" className="button">
              Login
            </a>
            <a href="/register-user" className="button">
              Register as User
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterSupplier;
