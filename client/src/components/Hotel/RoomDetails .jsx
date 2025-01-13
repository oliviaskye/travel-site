import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReservationForm from "../Reservation/Reservation"; 
import Nav from "../Nav/Nav";

const RoomDetails = () => {
  const { hotelId, roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false); 

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}/rooms/${roomId}`);
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError("Failed to fetch room details. Please try again.");
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [hotelId, roomId]);

  if (loading) return <p>Loading room details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Nav />
      <h2>{room.title}</h2>

      {/* عرض جميع الصور إذا كانت موجودة */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {room.img && Array.isArray(room.img) ? (
          room.img.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/uploads/${image.replace(/\\/g, "/")}`}
              alt={room.title}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          ))
        ) : (
          <img
            src="default-image.jpg"
            alt={room.title}
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        )}
      </div>

      <p>{room.details}</p>
      <p><strong>Price:</strong> ${room.price}</p>
      <p><strong>Location:</strong> {room.location}</p>

      <button onClick={() => setShowBookingForm(true)}>Book Now</button>

      {showBookingForm && (
        <ReservationForm roomId={roomId} hotelId={hotelId} /> 
      )}
    </div>
  );
};

export default RoomDetails;
