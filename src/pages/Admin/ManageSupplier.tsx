import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

// Define the Supplier interface
interface Supplier {
  id: number;
  name: string;
  companyName: string;
  phoneNumber: string;
  accountNumber: string;
  isAuthorized: boolean;
}

const ManageSuppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch all suppliers
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('https://localhost:7259/api/User/getUsers');
        if (response.ok) {
          const users: Supplier[] = await response.json();
          setSuppliers(users.filter(user => user.id));  // Filter all suppliers
        } else {
          setErrorMessage('Failed to load suppliers.');
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching suppliers.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Approve supplier by ID
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
        setSuppliers(suppliers.map(supplier => 
          supplier.id === supplierId ? { ...supplier, isAuthorized: true } : supplier
        ));
      } else {
        setErrorMessage('Failed to approve supplier.');
      }
    } catch (error) {
      console.error('Error approving supplier:', error);
      setErrorMessage('An error occurred while approving the supplier.');
    }
  };

  // Lock supplier by ID
  const lockSupplier = async (supplierId: number) => {
    try {
      const response = await fetch('https://localhost:7259/api/User/lockSupplier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierId),
      });

      if (response.ok) {
        setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));  // Remove locked supplier from the list
      } else {
        setErrorMessage('Failed to lock supplier.');
      }
    } catch (error) {
      console.error('Error locking supplier:', error);
      setErrorMessage('An error occurred while locking the supplier.');
    }
  };

  return (
    <>
    <AdminSidebar/>
    <div className="admin-container">
      {loading && <p>Loading suppliers...</p>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="main-content">
        <h2 className="section-title">Manage Suppliers</h2>
        <ul className="item-list">
          {suppliers.map((supplier) => (
            <li
              key={supplier.id}
              className="item"
              onClick={() => window.location.href = `/Admin/SupplierDetails/${supplier.id}`}
            >
              <span>Name: {supplier.name}</span>
              <span>Company: {supplier.companyName}</span>
              <span>Phone: {supplier.phoneNumber}</span>
              <span>Bank Account: {supplier.accountNumber}</span>

              <div>
                {!supplier.isAuthorized ? (
                  <button
                    className="approve-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      approveSupplier(supplier.id);
                    }}
                  >
                    Approve
                  </button>
                ) : (
                  <button
                    className="lock-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      lockSupplier(supplier.id);
                    }}
                  >
                    Lock Account
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default ManageSuppliers;
