import React, { useEffect, useState } from 'react';
import '../../styles/Admin/AdminDashBoard.css'; // Custom CSS styles
import AdminSidebar from '../../components/AdminSidebar';

// Define interfaces for data types
interface Booking {
  bookingId: number;
  user: { name: string };
  package: { name: string };
  totalAmount: number;
  payment: { paymentId: string; paymentMethod: string };
  bookingDate: string;
}

interface Review {
  id: number;
  userDetail: { name: string };
  isAnonymous: boolean;
  packageDetail: { name: string };
  rating: number;
  description: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>(''); // For section visibility

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await fetch('https://localhost:7259/api/Booking/GetAllBookingsWithDetailsForAdmin');
        const reviewsResponse = await fetch('https://localhost:7259/api/Review/GetAllReviews');

        // Check if both responses are okay
        if (!bookingsResponse.ok || !reviewsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const bookingsData: Booking[] = await bookingsResponse.json();
        const reviewsData: Review[] = await reviewsResponse.json();

        setBookings(bookingsData);
        setReviews(reviewsData);
      } catch (error) {
        setError('Failed to fetch booking and review details');
      }
    };

    fetchData();
  }, []);

  // Handling the dropdown section selection
  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <>
      <AdminSidebar />
      <div className="admin-dashboard">

        {error && <div className="error-message">{error}</div>}

        <div className="dropdown-container">
          <label htmlFor="dashboard-dropdown" className="dropdown-label">Select Section:</label>
          <select
            id="dashboard-dropdown"
            className="dropdown"
            onChange={(e) => handleSectionChange(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="reviews">Show Reviews</option>
            <option value="bookings">Show Bookings</option>
          </select>
        </div>

        {selectedSection === 'reviews' && (
          <div id="show-reviews" className="content-section">
            <h3 className="section-subtitle">Customer Reviews</h3>
            <div className="table-container">
              <table className="reviews-table">
                <thead>
                  <tr>
                    <th>Review ID</th>
                    <th>User</th>
                    <th>Identity Revealed</th>
                    <th>Package</th>
                    <th>Rating</th>
                    <th>Description</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td>{review.id}</td>
                      <td>{review.userDetail.name}</td>
                      <td>{review.isAnonymous ? 'Yes' : 'No'}</td>
                      <td>{review.packageDetail.name}</td>
                      <td>{review.rating}</td>
                      <td>{review.description}</td>
                      <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedSection === 'bookings' && (
          <div id="show-bookings" className="content-section">
            <h3 className="section-subtitle">Customer Bookings</h3>
            <div className="table-container">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>User</th>
                    <th>Package</th>
                    <th>Total Amount</th>
                    <th>Payment Id</th>
                    <th>Payment Method</th>
                    <th>Booking Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.bookingId}>
                      <td>{booking.bookingId}</td>
                      <td>{booking.user.name}</td>
                      <td>{booking.package.name}</td>
                      <td>{booking.totalAmount.toFixed(2)}</td>
                      <td>{booking.payment.paymentId}</td>
                      <td>{booking.payment.paymentMethod}</td>
                      <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
