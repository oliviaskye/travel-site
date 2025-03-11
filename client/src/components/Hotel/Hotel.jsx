import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import your local images from assets
import hotel1Image from "../../assets/hotel1Image.jpg";
import hotel2Image from "../../assets/hotel2Image.jpg";
import hotel3Image from "../../assets/hotel3Image.jpg";
import hotel4Image from "../../assets/hotel4Image.jpg";
import hotel5Image from "../../assets/hotel5Image.jpg";
import hotel6Image from "../../assets/hotel6Image.jpg";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotels");
        console.log(response); // Log the full response for debugging
        if (response.status === 200) {
          // Ensure that the API returns a list of hotels
          setHotels(response.data.hotels || response.data); // Adjust based on the actual response
        } else {
          throw new Error("Failed to fetch hotels.");
        }
      } catch (err) {
        console.error("Error fetching hotels:", err); // Log the error for debugging
        setError("Failed to fetch hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Map images to hotels by their index
  const hotelImages = [hotel1Image, hotel2Image, hotel3Image, hotel4Image, hotel5Image, hotel6Image];

  if (loading) return <p className="text-center text-xl">Loading hotels...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Explore Our Hotels
      </h2>

      {hotels.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No hotels available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <div
              key={hotel._id}
              className="relative bg-cover bg-center rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              style={{
                backgroundImage: `url(${hotelImages[index % hotelImages.length]})`,
              }}
            >
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              <div className="relative p-6 text-white">
                <h3 className="text-2xl font-semibold mb-3">{hotel.name}</h3>
                <p className="mb-2"><strong>Country:</strong> {hotel.country}</p>
                <p className="mb-2"><strong>City:</strong> {hotel.city}</p>
                <p className="mb-2"><strong>Price:</strong> ${hotel.cheapestPrice}</p>
                <button
                  onClick={() => navigate(`/hotels/${hotel._id}/rooms`)}
                  className="bg-gray-800 text-white py-3 px-5 rounded-lg w-full text-center font-semibold transition-all duration-200 hover:bg-gray-900"
                >
                  Go to Rooms
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotels;

