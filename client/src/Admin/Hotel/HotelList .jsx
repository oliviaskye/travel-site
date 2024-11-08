import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotels");

        const hotelsWithRoomsCount = await Promise.all(
          response.data.map(async (hotel) => {
            try {
              const roomsResponse = await axios.get(
                `http://localhost:5000/api/hotels/${hotel._id}/rooms`
              );
              return { ...hotel, roomsCount: roomsResponse.data.length };
            } catch {
              return { ...hotel, roomsCount: 0 };
            }
          })
        );

        setHotels(hotelsWithRoomsCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to fetch hotels. Please try again.");
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleDeleteHotel = async (hotelId) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        await axios.delete(`http://localhost:5000/api/hotels/${hotelId}`);
        setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
      } catch (error) {
        console.error("Error deleting hotel:", error);
        alert("Failed to delete hotel. Please try again.");
      }
    }
  };

  
  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Hotel List</h2>

      
      <input
        type="text"
        placeholder="Search by hotel name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      />

      <Link to="/admin/hotels/AddHotels">
        <button
          style={{
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add New Hotel
        </button>
      </Link>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Price</th>
            <th>Rooms Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHotels.map((hotel) => (
            <tr key={hotel._id}>
              <td>{hotel.name}</td>
              <td>{hotel.city}</td>
              <td>{hotel.address}</td>
              <td>${hotel.cheapestPrice}</td>
              <td>{hotel.roomsCount}</td>
              <td>
                <button onClick={() => handleDeleteHotel(hotel._id)}>
                  Delete
                </button>
                <Link to={`/admin/hotels/edit/${hotel._id}`}>
                  <button>Edit Hotel</button>
                </Link>
                <Link to={`/hotels/${hotel._id}/add-room`}>
                  <button>Add Room</button>
                </Link>
                <Link to={`/admin/hotels/${hotel._id}/rooms`}>
                  <button>View Rooms</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelList;
