import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/supplier/packageDetails2.css'; // Ensure this is where your CSS file is located

interface Review {
  id: number;
  description: string;
  rating: number;
  isAnonymous: boolean;
  createdAt: string;
  userDetail: UserDetail | null;
}

interface UserDetail {
  id: number;
  name: string;
}

interface Package {
  id: number;
  name: string;
  destination: string;
  details: string;
  finalPrice: number;
  available: boolean;
}

interface PackageDetailsViewModel {
  package: Package;
  reviewList: Review[];
}

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [packageDetails, setPackageDetails] = useState<Package | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const packageResponse = await axios.get<Package>(`https://localhost:7259/api/Package/Details/${id}`);
        setPackageDetails(packageResponse.data);

        const reviewsResponse = await axios.get<Review[]>(`https://localhost:7259/api/Review/getReviewsByPackageId?pkgId=${id}`);
        const reviewsWithUserDetails = await Promise.all(
          reviewsResponse.data.map(async (review) => {
            if (!review.isAnonymous) {
              const userResponse = await axios.get<UserDetail>(`https://localhost:7259/api/User/findUserById/${review.userDetail?.id}`);
              return { ...review, userDetail: userResponse.data };
            }
            return review;
          })
        );

        setReviews(reviewsWithUserDetails);
      } catch (error) {
        setErrorMessage('Unable to load package details or reviews.');
        console.error(error);
      }
    };

    fetchPackageDetails();
  }, [id]);

  const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numTravellers = (event.currentTarget.elements.namedItem('numTravellers') as HTMLInputElement).value;

    try {
      // Assuming there's an endpoint to handle booking
      await axios.post('https://localhost:7259/api/Supplier/BookNow', { packageId: id, numTravellers });
      alert('Booking successful');
    } catch (error) {
      console.error('Error in booking:', error);
    }
  };

  return (
    <div className="container mt-5">
      {packageDetails ? (
        <div className="card">
          <div className="card-header">
            <h2>{packageDetails.name}</h2>
          </div>
          <div className="card-body">
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}

            <p><strong>Destination:</strong> {packageDetails.destination}</p>
            <p><strong>Price:</strong> {packageDetails.finalPrice.toFixed(2)}</p>
            <p><strong>Description:</strong> {packageDetails.details}</p>
            <p><strong>Available:</strong> {packageDetails.available ? 'Yes' : 'No'}</p>

            {/* Form to enter the number of travellers */}
            <form onSubmit={handleBooking}>
              <div className="form-group">
                <label htmlFor="numTravellers">Enter the number of travellers:</label>
                <input type="number" id="numTravellers" name="numTravellers" className="form-control" required />
              </div>
              <button type="submit" className="btn btn-light">Proceed to Booking</button>
            </form>

            <div className="mt-3">
              <button className="btn btn-light" onClick={() => navigate('/user/home')}>Back to Home</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading package details...</p>
      )}

      <div className="container mt-4">
        <h3>Reviews</h3>
        <h6>What other users say about this package</h6>
        <div className="row">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="review-card">
                  <div className="review-header">
                    <div className="profile-symbol">
                      <i className="fa fa-user"></i>
                    </div>
                    <span>{review.isAnonymous ? 'Anonymous' : review.userDetail?.name}</span>
                    <div className="review-rating ml-auto">
                      <div className="stars-container">
                        {[...Array(5)].map((_, starIndex) => (
                          <i key={starIndex} className={`fa fa-star ${starIndex < review.rating ? 'review-stars' : ''}`}></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="review-body">
                    <p>{review.description}</p>
                    <p className="review-date"><small><em>{new Date(review.createdAt).toLocaleDateString()}</em></small></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-md-12">
              <p id="noReview">Buy this Package and be the first one to add a review.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
