import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Map from "../../Map/Map/Map";
import "./Hotel.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [currentHotelImages, setCurrentHotelImages] = useState([]); 

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

  const handleShowLocation = (latitude, longitude) => {
    setSelectedLocation([longitude, latitude]);
  };

  const handleViewImages = (hotel) => {
    setCurrentHotelImages(hotel.photos || []); 
    setIsModalOpen(true); 
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
              <img
                src={`http://localhost:5000/${
                  hotel.img ? hotel.img.replace(/\\/g, "/") : "default-image.jpg"
                }`}
                alt={hotel.name}
                className="hotel-img"
                onClick={() => handleViewImages(hotel)} 
              />
            </div>
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p><strong>Country:</strong> {hotel.country}</p>
              <p><strong>City:</strong> {hotel.city}</p>
              <p><strong>Address:</strong> {hotel.address}</p>
              <p><strong>Price:</strong> ${hotel.cheapestPrice}</p>
              <p><strong>Max Price:</strong> ${hotel.maxPrice}</p>
              <p><strong>Phone Number:</strong> {hotel.phoneNumber}</p>
              <button onClick={() => handleShowLocation(hotel.latitude, hotel.longitude)}>
                Show on Map
              </button>
              <Link to={`/hotels/${hotel._id}/rooms`}>Go to Rooms</Link>
            </div>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div style={{ height: "400px", marginTop: "20px" }}>
          <Map selectedLocation={selectedLocation} />
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={closeModal}>X</button>
            <h3>Hotel Images</h3>
            <div className="image-gallery">
              {currentHotelImages.length > 0 ? (
                currentHotelImages.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${img.replace(/\\/g, "/")}`}
                    alt={`Hotel Image ${index + 1}`}
                    className="gallery-image"
                  />
                ))
              ) : (
                <p>No images available for this hotel.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
