import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

interface Sale {
  SaleDate: string;
  SaleType: string;
  Description: string;
  Discount: number;
}

const ScheduleSale: React.FC = () => {
  const [saleDate, setSaleDate] = useState<string>('');
  const [saleType, setSaleType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validate date
    const today = new Date().toISOString().split('T')[0];
    if (saleDate < today) {
      setErrorMessage('Sale date cannot be in the past.');
      return;
    }

    const requestPayload: Sale = {
      SaleDate: saleDate,
      SaleType: saleType,
      Description: description,
      Discount: discount,
    };

    try {
      // Sending the POST request to the API to schedule the sale
      const response = await fetch('https://localhost:7259/api/Sale/saveSaleRequest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // Send SMS after successful sale scheduling
      await sendSmsNotification(requestPayload);
      setSuccessMessage('Great job! Your sale has been successfully scheduled and an SMS notification was sent.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred while scheduling the sale.');
    }
  };

  const sendSmsNotification = async (requestPayload: Sale) => {
    const apiUrl = 'https://kqdgq1.api.infobip.com/sms/2/text/advanced';
    const apiKey = '629da67c0cf5a51718c16f0924a291f2-dc8110fb-75fa-41f0-8770-8197d7662d3c'; // Infobip API Key

    const smsPayload = {
      messages: [
        {
          from: 'InfoSMS',
          destinations: [{ to: '+919354249649' }],
          text: `New sale scheduled: ${requestPayload.Description} with a discount of ${requestPayload.Discount}%`,
        },
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `App ${apiKey}`,
        },
        body: JSON.stringify(smsPayload),
      });

      if (!response.ok) {
        const smsResult = await response.text();
        throw new Error(`Failed to send SMS: ${smsResult}`);
      }
    } catch (error) {
      throw new Error(`Error sending SMS: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <>
    <AdminSidebar/>
    <div className="container">

      <div className="form-container mt-5">
        <h2 className="text-center">Schedule a Sale</h2>
        <p className="text-center message">Feeling low engagement on the website? Schedule a sale to increase engagement!</p>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
          {successMessage && <div className="text-success">{successMessage}</div>}

          <div className="form-group">
            <label htmlFor="saledate">Sale Date</label>
            <input type="date" className="form-control" id="saledate" name="saledate" min="" required
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="saletype">Sale Type</label>
            <select className="form-control" id="saletype" name="saletype" required
              value={saleType}
              onChange={(e) => setSaleType(e.target.value)}>
              <option value="">Select Sale Type</option>
              <option value="Summer Holiday Sale">Summer Holiday Sale</option>
              <option value="Festival Sale">Festival Sale</option>
              <option value="Black Friday Sale">Black Friday Sale</option>
              <option value="End of Season Sale">End of Season Sale</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Sale Description</label>
            <textarea className="form-control" id="description" name="description" rows={3} required
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="discountpercentage">Discount Percentage</label>
            <input type="number" className="form-control" id="discountpercentage" name="discountpercentage" min="1" max="100" required
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))} />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Schedule Sale</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ScheduleSale;
