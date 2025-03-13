import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Map from "../../pages/Map/Map";
import Nav from "@Nav";

const HotelFltring = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const location = useLocation();
  const { destination, date, options, priceRange } = location.state || {};

  useEffect(() => {
    const fetchHotels = async () => {
      if (!destination || !priceRange || priceRange[1] <= 0) {
        setError("Invalid parameters. Please ensure you selected a valid destination and price range.");
        setLoading(false);
        return;
      }
    
      try {
        const response = await axios.get("http://localhost:5000/api/hotels/filter", {
          params: {
            city: destination,
            maxPrice: priceRange[1],
          },
        });
        setHotels(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchHotels();
  }, [destination, priceRange]);

  const handleShowLocation = (latitude, longitude) => {
    setSelectedLocation([longitude, latitude]);
  };

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Nav />
      <h2>Available Hotels</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="container"
            style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}
          >
            <div className="hotel-images">
              {hotel.photos?.length > 0 ? (
                hotel.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${photo.replace(/\\/g, "/")}`}
                    alt={`${hotel.name} ${index + 1}`}
                    className="hotel-img"
                    style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                  />
                ))
              ) : (
                <img
                  src="http://localhost:5000/uploads/default-image.jpg"
                  alt="Default Hotel"
                  className="hotel-img"
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                />
              )}
            </div>

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
              <strong>Cheapest Price:</strong> ${hotel.cheapestPrice}
            </p>
            <p>
              <strong>Max Price:</strong> ${hotel.maxPrice}
            </p>
            <p>
              <strong>Phone Number:</strong> {hotel.phoneNumber}
            </p>

            <Link
              to={`/hotels/${hotel._id}/rooms`}
              style={{
                display: "block",
                marginTop: "10px",
                color: "#007BFF",
                textDecoration: "underline",
              }}
            >
              Go to Rooms
            </Link>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div style={{ height: "400px", marginTop: "20px" }}>
          <Map selectedLocation={selectedLocation} />
        </div>
      )}
    </div>
  );
};

export default HotelFltring;
