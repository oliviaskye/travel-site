import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import ClusterMap from "../Map/ClusterMap";

const HotelFltring = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const location = useLocation();
  const { destination, date, options, priceRange } = location.state || {};

  useEffect(() => {
    const fetchHotels = async () => {
      if (!destination || !priceRange) return; 

      try {
        const response = await axios.get("http://localhost:5000/api/hotels/filter", {
          params: {
            city: destination,
            price: priceRange[1],
          },
        });
        setHotels(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to fetch hotels. Please try again.");
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destination, priceRange]); 

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
          <div key={hotel._id} className="container" style={{ border: "1px solid #ccc", padding: "15px" }}>
            <img
              src={`http://localhost:5000/${hotel.photos ? hotel.photos[0].replace(/\\/g, "/") : "default-image.jpg"}`}
              alt={hotel.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h3>{hotel.name}</h3>
            <p><strong>Country:</strong> {hotel.country}</p>
            <p><strong>City:</strong> {hotel.city}</p>
            <p><strong>Address:</strong> {hotel.address}</p>
            <p><strong>Cheapest Price:</strong> ${hotel.cheapestPrice}</p>
            <p><strong>Max Price:</strong> ${hotel.maxPrice}</p>
            <p><strong>Phone Number:</strong> {hotel.phoneNumber}</p>
            <button onClick={() => handleShowLocation(hotel.latitude, hotel.longitude)}>
              Show on Map
            </button>
            <Link to={`/hotels/${hotel._id}/rooms`} style={{ display: "block", marginTop: "10px" }}>Go to Rooms</Link>
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

export default HotelFltring;
