import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

// Define interfaces for User and Supplier
interface Supplier {
  id: number;
  name: string;
  companyName: string;
  phoneNumber: string;
  accountNumber: string;
  isAuthorized: boolean;
}

const PendingSuppliers: React.FC = () => {
  const [pendingSuppliers, setPendingSuppliers] = useState<Supplier[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch pending suppliers from the API
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('https://localhost:7259/api/User/getUsers');
        if (response.ok) {
          const suppliers: Supplier[] = await response.json();
          const pending = suppliers.filter(s => s.isAuthorized === false);
          setPendingSuppliers(pending);
        } else {
          setErrorMessage('Failed to load pending suppliers.');
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching the suppliers.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Approve a supplier by ID
  const approveSupplier = async (supplierId: number) => {
    try {
      const response = await fetch('https://localhost:7259/api/User/approveSupplier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierId),
      });

      if (response.ok) {
        setPendingSuppliers(pendingSuppliers.filter(supplier => supplier.id !== supplierId));
      } else {
        setErrorMessage('Failed to approve supplier.');
      }
    } catch (error) {
      console.error('Error approving supplier:', error);
      setErrorMessage('An error occurred while approving the supplier.');
    }
  };

  return (
    <>
    <AdminSidebar/>
    <div className="admin-container">
     
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      {!loading && pendingSuppliers.length === 0 && (
        <p>Currently there are no requests pending for approval.</p>
      )}
      { pendingSuppliers.length > 0 && 
      (
        <div className="main-content">
        <h2 className="section-title">Approve Suppliers</h2>
        <ul className="item-list">
          {pendingSuppliers.map((supplier) => (
            <li
              key={supplier.id}
              className="item"
              onClick={() => window.location.href = `/admin/supplierDetails/${supplier.id}`}
            >
              <span>Name: {supplier.name}</span>
              <span>Company: {supplier.companyName}</span>
              <span>Phone: {supplier.phoneNumber}</span>
              <span>Bank Account: {supplier.accountNumber}</span>

              <button
                className="approve-button"
                onClick={(event) => {
                  event.stopPropagation();
                  approveSupplier(supplier.id);
                }}
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      </div>
      )
        }
    </div>
    </>
  );
};

export default PendingSuppliers;
