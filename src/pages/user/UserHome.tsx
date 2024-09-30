// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Shepherd from 'shepherd.js';
// import 'shepherd.js/dist/css/shepherd.css';
// import '../../styles/userHome.css';

// interface Package {
//   id: number;
//   name: string;
//   destination: string;
//   details: string;
//   finalPrice: number;
// }

// interface SaleData {
//   saleType: string;
//   description: string;
//   discount: number;
// }

// const UserHome: React.FC = () => {
//   const [specialPackages, setSpecialPackages] = useState<Package[]>([]);
//   const [saleData, setSaleData] = useState<SaleData | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string>('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSaleData = async () => {
//       try {
//         const response = await axios.get(`https://localhost:7259/api/Sale/checkSaleByDate?date=${new Date().toISOString().split('T')[0]}`);
//         setSaleData(response.data);
//         sessionStorage.setItem('SaleDiscountPercentage', response.data.discount.toString());
//       } catch (error) {
//         console.error('Error fetching sale data:', error);
//       }
//     };

//     const fetchSpecialPackages = async () => {
//       const userId = sessionStorage.getItem('UserId');
//       try {
//         const response = await axios.get<Package[]>(`https://localhost:7259/api/Package/SpeciallyAssignedPackages/${userId}`);
//         const uniquePackages = Array.from(new Map(response.data.map(pkg => [pkg.id, pkg])).values());
//         setSpecialPackages(uniquePackages);
//       } catch (error) {
//         console.error('Error fetching special packages:', error);
//         setErrorMessage('Unable to load special packages.');
//       }
//     };

//     fetchSaleData();
//     fetchSpecialPackages();
//     initializeTour();
//   }, []);

//   const initializeTour = () => {
//     const tour = new Shepherd.Tour({
//       defaultStepOptions: {
//         cancelIcon: { enabled: true },
//         classes: 'shepherd-theme-custom',
//         scrollTo: { behavior: 'smooth', block: 'center' },
//       },
//       useModalOverlay: true,
//     });

//     const tourButtons = [
//       { text: 'Back', action: tour.back, classes: 'shepherd-button-secondary' },
//       { text: 'Next', action: tour.next, classes: 'shepherd-button-primary' },
//       { text: 'Skip', action: tour.cancel, classes: 'shepherd-button-danger' },
//     ];

//     tour.addStep({
//       id: 'welcome',
//       text: 'Welcome to the User Home! Let us guide you through the key features of this page.',
//       title: 'Tafri Travels',
//       buttons: [{ text: 'Start Tour', action: tour.next, classes: 'shepherd-button-primary' }, ...tourButtons],
//     });

//     tour.addStep({
//       id: 'search-bar',
//       attachTo: { element: '.search-bar', on: 'bottom' },
//       title: 'Tafri Travels',
//       text: 'Use this search bar to find packages based on your preferences.',
//       buttons: tourButtons,
//     });

//     tour.addStep({
//       id: 'special-packages',
//       attachTo: { element: '#specialPackageHeading', on: 'top' },
//       title: 'Tafri Travels',
//       text: 'Here are the specially assigned packages just for you. Explore these exclusive offers!',
//       buttons: tourButtons,
//     });

//     tour.on('complete', () => tour.hide());
//     tour.on('cancel', () => tour.hide());

//     if (parseInt(localStorage.getItem('loginCount') || '0', 10) <= 1) {
//       tour.start();
//     }
//   };

//   const searchPackages = async () => {
//     const destination = (document.getElementById('destination') as HTMLInputElement).value;
//     const checkinDate = (document.getElementById('checkinDate') as HTMLInputElement).value;
//     const budget = parseFloat((document.getElementById('budget') as HTMLInputElement).value);

//     try {
//       const request = { destination, checkinDate, budget };
//       const response = await axios.post('https://localhost:7259/api/Package/PackageSearchBar', request, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//         displayPackages(response.data);
//       } else {
//         throw new Error('Failed to fetch packages');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const displayPackages = (packages: Package[]) => {
//     setSpecialPackages(packages);
//   };

//   const addToWishlist = async (packageId: number) => {
//     const userId = sessionStorage.getItem('UserId');

//     try {
//       const response = await axios.get(`https://localhost:7259/api/Wishlist/addToWishList?userId=${userId}&packageId=${packageId}`);
//       if (response.data.success) {
//         alert('Package added to wishlist!');
//       } else {
//         alert('Failed to add package to wishlist.');
//       }
//     } catch (error) {
//       console.error('Error adding to wishlist:', error);
//     }
//   };

//   const moreDetails = (packageId: number) => {
//     navigate(`/Supplier/PackageDetails/${packageId}`);
//   };

//   const toggleSidebar = () => {
//     const sidebar = document.getElementById('sidebar');
//     const hamburger = document.getElementById('hamburger1');
//     const closebtn = document.getElementById('closebtn1');
//     const isOpen = sidebar?.classList.contains('sidebar-open');

//     if (isOpen) {
//       sidebar?.classList.remove('sidebar-open');
//       sidebar?.classList.add('sidebar-close');
//       hamburger!.style.display = 'block';
//       closebtn!.style.display = 'none';
//     } else {
//       sidebar?.classList.remove('sidebar-close');
//       sidebar?.classList.add('sidebar-open');
//       hamburger!.style.display = 'none';
//       closebtn!.style.display = 'block';
//     }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <div className="navbar">
//         <div className="nav-links">
//           <a href="/User/Wishlist"><i className="fas fa-heart"></i> Wishlist</a>
//           <a href="/User/UserProfile"><i className="fas fa-user"></i> Home</a>
//         </div>
//         <button className="logout-button" onClick={() => navigate('/Home/Logout')}>Logout</button>
//       </div>

//       {/* Sidebar */}
//       <div id="sidebar" className="sidebar sidebar-close">
//         <div className="sidebar-header">
//           <button id="closebtn1" className="closebtn" onClick={toggleSidebar}><i className="fas fa-times"></i></button>
//           <h2 id="sidebarHeading">Menu</h2>
//         </div>
//         <div className="sidebar-links">
//           <a href="/User/Wishlist"><span>Explore Wishlist</span></a>
//           <a href="/User/UserProfile"><span>Manage Profile</span></a>
//           <a href="/Map/MapView"><span>Search Using Map</span></a>
//         </div>
//       </div>
//       <span id="hamburger1" className="hamburger" onClick={toggleSidebar}><i className="fas fa-bars"></i></span>

//       {/* Sale Banner */}
//       {saleData && (
//         <div className="sale-banner">
//           <div className="sale-banner-content">
//             <div className="sale-avatar"><img src="/images/saleAvatar.jpg" alt="Sale Avatar" /></div>
//             <div className="sale-info">
//               <h3 id="saleType">{saleData.saleType}</h3>
//               <p>{saleData.description}</p>
//               <div className="discount-arc"><span className="discount">{saleData.discount} % off</span></div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Search Bar */}
//       <div className="search-bar">
//         <input type="text" id="destination" placeholder="Destination (Type All to see all packages)" />
//         <input type="date" id="checkinDate" />
//         <input type="number" id="budget" placeholder="Budget per person" />
//         <button onClick={searchPackages}>Search</button>
//       </div>

//       {/* <!-- Packages Container --> */}
//     <div className="packages-container">
//         <h2>Available Packages</h2>
//         <div id="packages-container" className="package-grid"></div>
//     </div>

//       {/* Special Packages */}
//       <div className="special-packages">
//         <h2 id="specialPackageHeading">Specially Assigned Packages</h2>
//         {specialPackages.length > 0 ? (
//           <div className="package-grid">
//             {specialPackages.map(pkg => (
//               <div key={pkg.id} className="package-card">
//                 <div className="card-header">
//                   <h3>{pkg.name}</h3>
//                   <button className="btn btn-heart" onClick={() => addToWishlist(pkg.id)}><i className="fa fa-heart"></i></button>
//                 </div>
//                 <div className="card-body">
//                   <p className="card-text">Destination: {pkg.destination}</p>
//                   <p className="card-text">Price: {pkg.finalPrice.toFixed(2)}</p>
//                   <p className="card-text">Description: {pkg.details}</p>
//                   <button className="btn btn-danger" onClick={() => moreDetails(pkg.id)}>More details</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No special packages assigned.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserHome;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import '../../styles/userHome.css';

interface Package {
  id: number;
  name: string;
  destination: string;
  details: string;
  finalPrice: number;
}

interface SaleData {
  saleType: string;
  description: string;
  discount: number;
}

const UserHome: React.FC = () => {
  const [specialPackages, setSpecialPackages] = useState<Package[]>([]);
  const [saleData, setSaleData] = useState<SaleData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaleData = async () => {
      try {
        const response = await axios.get(`https://localhost:7259/api/Sale/checkSaleByDate?date=${new Date().toISOString().split('T')[0]}`);
        setSaleData(response.data);
        sessionStorage.setItem('SaleDiscountPercentage', response.data.discount.toString());
      } catch (error) {
        console.error('Error fetching sale data:', error);
      }
    };

    const fetchSpecialPackages = async () => {
      const userId = sessionStorage.getItem('UserId');
      try {
        const response = await axios.get<Package[]>(`https://localhost:7259/api/Package/SpeciallyAssignedPackages/${userId}`);
        const uniquePackages = Array.from(new Map(response.data.map(pkg => [pkg.id, pkg])).values());
        setSpecialPackages(uniquePackages);
      } catch (error) {
        console.error('Error fetching special packages:', error);
        setErrorMessage('Unable to load special packages.');
      }
    };

    fetchSaleData();
    fetchSpecialPackages();
    initializeTour();
  }, []);

  const initializeTour = () => {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        classes: 'shepherd-theme-custom',
        scrollTo: { behavior: 'smooth', block: 'center' },
      },
      useModalOverlay: true,
    });

    const tourButtons = [
      { text: 'Back', action: tour.back, classes: 'shepherd-button-secondary' },
      { text: 'Next', action: tour.next, classes: 'shepherd-button-primary' },
      { text: 'Skip', action: tour.cancel, classes: 'shepherd-button-danger' },
    ];

    tour.addStep({
      id: 'welcome',
      text: 'Welcome to the User Home! Let us guide you through the key features of this page.',
      title: 'Tafri Travels',
      buttons: [{ text: 'Start Tour', action: tour.next, classes: 'shepherd-button-primary' }, ...tourButtons],
    });

    tour.addStep({
      id: 'search-bar',
      attachTo: { element: '.search-bar', on: 'bottom' },
      title: 'Tafri Travels',
      text: 'Use this search bar to find packages based on your preferences.',
      buttons: tourButtons,
    });

    tour.addStep({
      id: 'special-packages',
      attachTo: { element: '#specialPackageHeading', on: 'top' },
      title: 'Tafri Travels',
      text: 'Here are the specially assigned packages just for you. Explore these exclusive offers!',
      buttons: tourButtons,
    });

    tour.on('complete', () => tour.hide());
    tour.on('cancel', () => tour.hide());

    if (parseInt(localStorage.getItem('loginCount') || '0', 10) < 1) {
      tour.start();
    }
  };

  const searchPackages = async () => {
    const destination = (document.getElementById('destination') as HTMLInputElement).value;
    const checkinDate = (document.getElementById('checkinDate') as HTMLInputElement).value;
    const budget = parseFloat((document.getElementById('budget') as HTMLInputElement).value);

    try {
      const request = { destination, checkinDate, budget };
      const response = await axios.post('https://localhost:7259/api/Package/PackageSearchBar', request, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        displayPackages(response.data);
      } else {
        throw new Error('Failed to fetch packages');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const displayPackages = (packages: Package[]) => {
    setSpecialPackages(packages);
  };

  const addToWishlist = async (packageId: number) => {
    const userId = sessionStorage.getItem('UserId');

    try {
      const response = await axios.get(`https://localhost:7259/api/Wishlist/addToWishList?userId=${userId}&packageId=${packageId}`);
      if (response.data.success) {
        alert('Package added to wishlist!');
      } else {
        alert('Failed to add package to wishlist.');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const moreDetails = (packageId: number) => {
    navigate(`/Supplier/PackageDetails/${packageId}`);
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const isOpen = sidebar?.classList.contains('sidebar-open');

    if (isOpen) {
      sidebar?.classList.remove('sidebar-open');
      sidebar?.classList.add('sidebar-close');
    } else {
      sidebar?.classList.remove('sidebar-close');
      sidebar?.classList.add('sidebar-open');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <span id="hamburger1" className="hamburger" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </span>
        <div className="nav-links">
          <a href="/User/Wishlist"><i className="fas fa-heart"></i> Wishlist</a>
          <a href="/User/UserProfile"><i className="fas fa-user"></i> Home</a>
        </div>
        <button className="logout-button" onClick={() => navigate('/Home/Logout')}>Logout</button>
      </div>

      {/* Sidebar */}
      <div id="sidebar" className="sidebar sidebar-close">
        <div className="sidebar-header">
          <button id="closebtn1" className="closebtn" onClick={toggleSidebar}><i className="fas fa-times"></i></button>
          <h2 id="sidebarHeading">Menu</h2>
        </div>
        <div className="sidebar-links">
          <a href="/User/Wishlist"><span>Explore Wishlist</span></a>
          <a href="/User/UserProfile"><span>Manage Profile</span></a>
          <a href="/Map/MapView"><span>Search Using Map</span></a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" id="destination" placeholder="Destination" />
        <input type="date" id="checkinDate" />
        <input type="number" id="budget" placeholder="Budget per person" />
        <button onClick={searchPackages}>Search</button>
      </div>

      {/* Packages Container */}
      <div className="packages-container">
        <h2>Available Packages</h2>
        <div id="packages-container" className="package-grid"></div>
      </div>

      {/* Special Packages */}
      <div className="special-packages">
        <h2 id="specialPackageHeading">Specially Assigned Packages</h2>
        {specialPackages.length > 0 ? (
          <div className="package-grid">
            {specialPackages.map(pkg => (
              <div key={pkg.id} className="package-card">
                <div className="card-header">
                  <h3>{pkg.name}</h3>
                  <button className="btn btn-heart" onClick={() => addToWishlist(pkg.id)}><i className="fa fa-heart"></i></button>
                </div>
                <div className="card-body">
                  <p className="card-text">Destination: {pkg.destination}</p>
                  <p className="card-text">Price: {pkg.finalPrice.toFixed(2)}</p>
                  <p className="card-text">Description: {pkg.details}</p>
                  <button className="btn btn-danger" onClick={() => moreDetails(pkg.id)}>More details</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No special packages assigned.</p>
        )}
      </div>
    </div>
  );
};

export default UserHome;
