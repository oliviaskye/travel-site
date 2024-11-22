import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClusterMap from "../Map/ClusterMap";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotels");
        setHotels(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to fetch hotels. Please try again.");
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleShowLocation = (latitude, longitude) => {
    setSelectedLocation([longitude, latitude]);
    
  };

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Hotels</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {hotels.map((hotel) => (
          <div key={hotel._id} className="container">
            <img
              src={`http://localhost:5000/${hotel.img ? hotel.img.replace(/\\/g, "/") : "default-image.jpg"}`}
              alt={hotel.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h3>{hotel.name}</h3>
            <p><strong>Country:</strong> {hotel.country}</p>
            <p><strong>City:</strong> {hotel.city}</p>
            <p><strong>Address:</strong> {hotel.address}</p>
            <p><strong>Price:</strong> ${hotel.cheapestPrice}</p>
            <p><strong>Price:</strong> ${hotel.maxPrice}</p>
            <p><strong>Phone Number:</strong> {hotel.phoneNumber}</p> 
            <button onClick={() => handleShowLocation(hotel.latitude, hotel.longitude)}>
              Show on Map
            </button>
            <Link to={`/hotels/${hotel._id}/rooms`}>Go to Rooms</Link>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div style={{ height: "400px", marginTop: "20px" }}>
          <ClusterMap selectedLocation={selectedLocation} />
        </div>
      )}
    </div>
  );
};

export default Hotels;
