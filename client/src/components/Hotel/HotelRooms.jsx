import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./HotelRoomsx.css";

const HotelRoomsx = () => {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}/rooms`);
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Failed to fetch rooms. Please try again.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hotel-rooms-container">
      <Nav />
      <h2>Available Rooms</h2>
      <div className="room-grid">
        {rooms.map((room) => (
          <div key={room._id} className="room-card">
            <div className="room-image">
              {room.img && Array.isArray(room.img) ? (
                <div className="room-images-container">
                  {room.img.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/${image.replace(/\\/g, "/")}`}
                      alt={`${room.title} ${index + 1}`}
                      className="room-img-multi"
                    />
                  ))}
                </div>
              ) : (
                <img
                  src={`http://localhost:5000/${room.img ? room.img.replace(/\\/g, "/") : "default-image.jpg"}`}
                  alt={room.title}
                  className="room-img"
                />
              )}
            </div>
            <div className="room-info">
              <h3>{room.title}</h3>
              <p>{room.details}</p>
              <p>
                <strong>Price:</strong> ${room.price}
              </p>
              <p>
                <strong>Room Number:</strong> {room.roomNumber}
              </p>
              <Link to={`/hotels/${hotelId}/rooms/${room._id}`} className="room-details-link">
                Room Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelRoomsx;
