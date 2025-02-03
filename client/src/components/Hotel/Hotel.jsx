import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

// Custom modal styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "800px",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotels");
        if (response.status === 200) {
          setHotels(response.data);
          setFilteredHotels(response.data);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch hotels.");
        }
      } catch (error) {
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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p className="text-center text-xl">Loading hotels...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Explore Our Hotels
      </h2>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search Hotels"
          value={search}
          onChange={handleSearchChange}
          className="w-full max-w-lg p-4 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredHotels.map((hotel) => (
          <div key={hotel._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="hotel-image">
              <img
                src={`http://localhost:5000/${hotel.img ? hotel.img.replace(/\\/g, "/") : "default-image.jpg"}`}
                alt={hotel.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{hotel.name}</h3>
              <p className="text-gray-600 mb-2"><strong>Country:</strong> {hotel.country}</p>
              <p className="text-gray-600 mb-2"><strong>City:</strong> {hotel.city}</p>
              <p className="text-gray-600 mb-2"><strong>Price:</strong> ${hotel.cheapestPrice}</p>
              <p className="text-gray-600 mb-4"><strong>Phone Number:</strong> {hotel.phoneNumber}</p>

              {/* Button Section */}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/hotels/${hotel._id}/rooms`)}
                  className="bg-blue-600 text-white py-3 px-5 rounded-lg w-full text-center font-semibold transition-all duration-200 hover:bg-blue-700"
                >
                  Go to Rooms
                </button>
                {hotel.photos && hotel.photos.length > 0 && (
                  <button
                    onClick={() => handleViewImages(hotel)}
                    className="bg-gray-600 text-white py-3 px-5 rounded-lg w-full text-center font-semibold transition-all duration-200 hover:bg-gray-700"
                  >
                    View Photos
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying images */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Hotel Images Modal"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Hotel Images</h2>
        <div className="image-gallery grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentHotelImages.length > 0 ? (
            currentHotelImages.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${img.replace(/\\/g, "/")}`}
                alt={`Hotel Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No images available for this hotel.</p>
          )}
        </div>
        <button
          onClick={closeModal}
          className="mt-6 py-2 px-6 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700 transition"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Hotels;







