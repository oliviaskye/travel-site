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
  },
};

Modal.setAppElement("#root");

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHotelImages, setCurrentHotelImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // To track the current image index

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotels");
        setHotels(response.data);
        setFilteredHotels(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to fetch hotels. Please try again.");
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query === "") {
      setFilteredHotels(hotels);
    } else {
      const filtered = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredHotels(filtered);
    }
  };

  const handleViewImages = (hotel) => {
    setCurrentHotelImages(hotel.photos || []);
    setCurrentImageIndex(0); // Reset to first image
    setIsModalOpen(true);
  };

  const handleNextImage = () => {
    if (currentImageIndex < currentHotelImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
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
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
      >
        {filteredHotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <div className="hotel-image">
              {/* <img
                src={`http://localhost:5000/${
                  hotel.img ? hotel.img.replace(/\\/g, "/") : "default-image.jpg"
                }`}
                alt={hotel.name}
                className="hotel-img"
              /> */}
            </div>
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p><strong>Country:</strong> {hotel.country}</p>
              <p><strong>City:</strong> {hotel.city}</p>
              <p><strong>Address:</strong> {hotel.address}</p>
              <p><strong>Price:</strong> ${hotel.cheapestPrice}</p>
              <p><strong>Max Price:</strong> ${hotel.maxPrice}</p>
              <p><strong>Phone Number:</strong> {hotel.phoneNumber}</p>
              <Link to={`/hotels/${hotel._id}/rooms`}>Go to Rooms</Link>

              {hotel.photos && hotel.photos.length > 0 && (
                <button onClick={() => handleViewImages(hotel)}>
                  See Pics
                </button>
              )}
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
              src={`http://localhost:5000/${currentHotelImages[currentImageIndex].replace(
                /\\/g,
                "/"
              )}`}
              alt={`Hotel Image ${currentImageIndex + 1}`}
              className="gallery-image"
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
