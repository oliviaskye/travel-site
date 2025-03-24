import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RoomModals from "./RoomModals";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import "./HotelFltring.css";

const Hotels = ({ searchData }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHotelImages, setCurrentHotelImages] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      if (!searchData || !searchData.destination) return;

      setLoading(true);

      try {
        let url = "http://localhost:5000/api/hotels/filter";
        let params = {
          city: searchData.destination,
          maxPrice: searchData.priceRange[1],
        };

        const response = await axios.get(url, { params });
        setHotels(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to fetch data, please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchData]);

  const handleOpenModal = (hotelImages) => {
    setCurrentHotelImages(hotelImages || []);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!searchData || !searchData.destination)
    return <p>Please enter search criteria to find hotels.</p>;
  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>{error}</p>;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star full" />);
    }

    if (halfStar) {
      stars.push(<FaStar key="half" className="star half" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  return (
    <div className="hotels-container">
      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <img
              src={
                hotel.photos?.length
                  ? `http://localhost:5000/${hotel.photos[0].replace(
                      /\\/g,
                      "/"
                    )}`
                  : "/default-image.jpg"
              }
              alt={hotel.name}
              className="hotel-img"
              onClick={() => handleOpenModal(hotel.photos)}
            />
            <div className="hotel-info">
              <div className="hotel-rating">
                {renderStars(hotel.rating)}
              </div>
              <h2 className="hotel-name">{hotel.name}</h2>
              <div className="location">
                <FaMapMarkerAlt className="location-icon" />
                <span>{hotel.country} / {hotel.city}</span>
              </div>
              <p className="hotel-price">
  Price: <span className="min-price">${hotel.cheapestPrice}</span> 
  <span className="separator">to</span> 
  <span className="max-price">${hotel.maxPrice}</span> 
  
</p>

              <p className="hotel-description">
                {hotel.description || "Experience the comfort and luxury at our hotel. Enjoy modern amenities, spacious rooms, and exceptional service."}
              </p>
              <button className="card-btn">
                <Link
                  to={`/Discover/${hotel._id}/Rooms`}
                  onClick={() =>
                    localStorage.setItem("selectedHotel", JSON.stringify(hotel))
                  }
                >
                  Rooms
                </Link>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No hotels found for this search.</p>
      )}
      <RoomModals
        isImageModalOpen={isModalOpen}
        closeImageModal={handleCloseModal}
        currentRoomImages={currentHotelImages || []}
      />
    </div>
  );
};

export default Hotels;


