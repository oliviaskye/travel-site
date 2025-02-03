import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Map from "../../Map/Map/Map";
import Nav from "../Nav/Nav";

const HotelFltring = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const location = useLocation();
  const { destination, date, options, priceRange } = location.state || {};

  useEffect(() => {
    const fetchHotels = async () => {
      if (!destination || !priceRange || priceRange[0] > priceRange[1]) {
        setError("Invalid parameters. Please ensure you selected a valid destination and price range.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/hotels/filter", {
          params: {
            city: destination,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
          },
        });
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
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

  if (loading) return <p className="text-center text-xl font-semibold text-gray-700">Loading hotels...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-8">
      <Nav />
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Available Hotels</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl hover:border hover:border-gray-300"
          >
            <div className="h-56 overflow-hidden mb-4">
              {hotel.photos?.length > 0 ? (
                hotel.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${photo.replace(/\\/g, "/")}`}
                    alt={`${hotel.name} ${index + 1}`}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                ))
              ) : (
                <img
                  src="http://localhost:5000/uploads/default-image.jpg"
                  alt="Default Hotel"
                  className="w-full h-full object-cover rounded-t-xl"
                />
              )}
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{hotel.name}</h3>
              <p className="text-sm text-gray-600"><strong>Country:</strong> {hotel.country}</p>
              <p className="text-sm text-gray-600"><strong>City:</strong> {hotel.city}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {hotel.address}</p>
              <p className="text-sm text-gray-600"><strong>Cheapest Price:</strong> ${hotel.cheapestPrice}</p>
              <p className="text-sm text-gray-600"><strong>Max Price:</strong> ${hotel.maxPrice}</p>
              <p className="text-sm text-gray-600"><strong>Phone Number:</strong> {hotel.phoneNumber}</p>

              <Link
                to={`/hotels/${hotel._id}/rooms`}
                className="text-blue-500 underline mt-4 block hover:text-blue-700 transition-colors"
              >
                Go to Rooms
              </Link>

              <button
                onClick={() => handleShowLocation(hotel.latitude, hotel.longitude)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Show on Map
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div className="mt-8">
          <div className="h-96">
            <Map selectedLocation={selectedLocation} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelFltring;



