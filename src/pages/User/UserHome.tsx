import React, { useEffect, useState } from 'react';

interface Package {
  id: number;
  name: string;
  price: number;
  description: string;
  // Add any additional fields as necessary
}

interface Sale {
  discount: number;
}

interface UserHomeViewModel {
  specialPackages: Package[];
  SaleData: Sale;
}

const UserHome: React.FC = () => {
  const [specialPackages, setSpecialPackages] = useState<Package[]>([]);
  const [saleData, setSaleData] = useState<Sale | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const currentDate = new Date().toISOString().split('T')[0];

        // Fetch sale data
        const saleResponse = await fetch(`https://localhost:7259/api/Sale/checkSaleByDate?date=${currentDate}`);
        if (saleResponse.ok) {
          const sale = await saleResponse.json();
          sessionStorage.setItem('SaleDiscountPercentage', sale.discount.toString());
          setSaleData(sale);
        }

        // Fetch special packages
        const packageResponse = await fetch(`https://localhost:7259/api/Package/SpeciallyAssignedPackages/${userId}`);
        if (packageResponse.ok) {
          const packages: Package[] = await packageResponse.json();
          const uniquePackages: { [key: number]: Package } = {};

          packages.forEach((pkg) => {
            if (!uniquePackages[pkg.id]) {
              uniquePackages[pkg.id] = pkg;
            }
          });

          setSpecialPackages(Object.values(uniquePackages));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredPackages = specialPackages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-home">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Travel Website</h1>
        {/* Add links and navigation items */}
      </nav>

      {/* Sidebar */}
      {/* <aside className="sidebar">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Wishlist</a></li>
          <li><a href="#">Profile</a></li>
       
        </ul>
      </aside> */}

      {/* Main Content */}
      <div className="main-content">
        {/* Search Bar */}
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search packages..." 
            value={searchQuery}
            onChange={handleSearchChange} 
          />
        </div>

        {/* Special Sale Section */}
        {saleData && (
          <div className="sale-banner">
            <h2>Today's Sale: {saleData.discount}% off on all bookings!</h2>
          </div>
        )}

        {/* Specially Assigned Packages Section */}
        {/* <section className="special-packages">
          <h2>Specially Assigned Packages</h2>
          <div className="package-list">
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                  <h3>{pkg.name}</h3>
                  <p>{pkg.description}</p>
                  <p>Price: ${pkg.price}</p>
                </div>
              ))
            ) : (
              <p>No packages found.</p>
            )}
          </div>
        </section> */}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-images">
          <img src="/path/to/image1.jpg" alt="Image 1" />
          <img src="/path/to/image2.jpg" alt="Image 2" />
          <img src="/path/to/image3.jpg" alt="Image 3" />
        </div>
        <p>&copy; 2024 Travel Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserHome;
