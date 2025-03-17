import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./Hotel.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
    textAlign: "center",
  },
};

Modal.setAppElement("#root");

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

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
      <h2>Available Hotels</h2>

      <div>
        <input
          type="text"
          placeholder="Search by Hotel Name"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {hotels
          .filter((hotel) =>
            hotel.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((hotel) => (
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
                <Link to={`/hotels/${hotel._id}/rooms`}>Go to Rooms</Link>
              </div>
            </div>
          ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Hotel Images Modal"
      >
        <h2>Hotel Images</h2>
        <div className="image-gallery">
          {currentHotelImages.length > 0 ? (
            <img
              src={`http://localhost:5000/${currentHotelImages[
                currentImageIndex
              ].replace(/\\/g, "/")}`}
              alt={`Hotel Image ${currentImageIndex + 1}`}
              className="gallery-image"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          ) : (
            <p>No images available for this hotel.</p>
          )}
        </div>

       
        <div className="image-gallery-buttons">
          <button onClick={handlePrevImage} disabled={currentImageIndex === 0}>
            Previous
          </button>
          <button
            onClick={handleNextImage}
            disabled={currentImageIndex === currentHotelImages.length - 1}
          >
            Next
          </button>
        </div>

        <button onClick={closeModal} style={{ marginTop: "10px" }}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Hotels;
