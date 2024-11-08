import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const HotelRooms = () => {
  const { hotelId } = useParams();

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); 

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/hotels/${hotelId}/rooms`
        );
        setRooms(response.data);
        setFilteredRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Failed to fetch rooms. Please try again.");
        setLoading(false);
      }
    };
    fetchRooms();
  }, [hotelId]);

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/hotels/${hotelId}/rooms/${roomId}`
      );
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
      setFilteredRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId)); 
    } catch (error) {
      console.error("Error deleting room:", error);
      setError("Failed to delete room. Please try again.");
    }
  };


  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query === "") {
      setFilteredRooms(rooms); 
    } else {
 
      const filtered = rooms.filter((room) =>
        room.roomNumber.toString().includes(query)
      );
      setFilteredRooms(filtered);
    }
  };

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Rooms</h2>

      <div>
        <input
          type="text"
          placeholder="Search by Room Number"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <Link to={`/hotels/${hotelId}/add-room`}>
        <button>Add Room</button>
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Room Image</th>
            <th scope="col">Title</th>
            <th scope="col">Details</th>
            <th scope="col">Price</th>
            <th scope="col">Room Number</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room) => (
            <tr key={room._id}>
              <td>
                <img
                  src={`http://localhost:5000/${
                    room.img
                      ? room.img.replace(/\\/g, "/")
                      : "default-image.jpg"
                  }`}
                  alt={room.title}
                  style={{ width: "100px", height: "80px", objectFit: "cover" }}
                />
              </td>
              <td>{room.title}</td>
              <td>{room.details}</td>
              <td>${room.price}</td>
              <td>{room.roomNumber}</td>
              <td>
                <Link
                  to={`/hotels/${hotelId}/rooms/${room._id}/edit`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelRooms;
