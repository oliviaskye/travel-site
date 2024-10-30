import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/room");
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Failed to fetch rooms. Please try again.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Rooms</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {rooms.map((room) => (
          <div key={room._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            <img
              src={`http://localhost:5000/${room.img ? room.img.replace(/\\/g, "/") : "default-image.jpg"}`}
              alt={room.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h3>{room.title}</h3>
            <p>{room.details}</p>
            <p><strong>Price:</strong> ${room.price}</p>
            <p><strong>Location:</strong> {room.location}</p>
            <Link to={`/reservation/${room._id}`}>Make a Reservation</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
