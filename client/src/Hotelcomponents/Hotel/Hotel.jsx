import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HotelImagesModal from "./HotelImagesModal";
import "./Hotel.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHotelImages, setCurrentHotelImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotels");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to fetch hotels. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleViewImages = (hotel) => {
    if (hotel.photos && hotel.photos.length > 0) {
      setCurrentHotelImages(hotel.photos);
      setCurrentImageIndex(0);
      setIsModalOpen(true);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < currentHotelImages.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <div className="hotel-image">
              <img
                src={`http://localhost:5000/${
                  hotel.photos?.length
                    ? hotel.photos[0].replace(/\\/g, "/")
                    : "default-image.jpg"
                }`}
                alt={hotel.name}
                className="hotel-img"
                onClick={() => handleViewImages(hotel)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p>
                <strong>Country:</strong> {hotel.country}
              </p>
              <p>
                <strong>City:</strong> {hotel.city}
              </p>
              <p>
                <strong>Address:</strong> {hotel.address}
              </p>
              <p>
                <strong>Price:</strong> ${hotel.cheapestPrice}
              </p>
              <p>
                <strong>Max Price:</strong> ${hotel.maxPrice}
              </p>
              <p>
                <strong>Phone Number:</strong> {hotel.phoneNumber}
              </p>
              <button className="nav-button">
                <Link to={`/hotels/${hotel._id}/rooms`}><p>Go to Rooms</p></Link>
              </button>
            </div>
          </div>
        ))}
      </div>

      <HotelImagesModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={currentHotelImages}
        currentIndex={currentImageIndex}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </div>
  );
};

export default Hotels;
