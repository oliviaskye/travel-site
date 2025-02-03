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

  if (loading) return <p className="text-center text-xl text-brown-600">Loading room details...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <Nav />
      <h2 className="text-3xl font-semibold text-brown-800 mb-6 text-center">{room.title}</h2>

      <img
        src={`http://localhost:5000/${room.img ? room.img.replace(/\\/g, "/") : "default-image.jpg"}`}
        alt={room.title}
        className="w-full h-72 object-cover rounded-lg shadow-md mb-6"
      />
      
      <p className="text-brown-700 mb-4">{room.details}</p>
      <p className="text-brown-700 mb-4"><strong>Price:</strong> ${room.price}</p>
      <p className="text-brown-700 mb-6"><strong>Location:</strong> {room.location}</p>

      <button 
        onClick={() => setShowBookingForm(true)} 
        className="bg-brown-500 text-white py-2 px-6 rounded-md hover:bg-brown-600 transition"
      >
        Book Now
      </button>

      {showBookingForm && (
        <div className="mt-6">
          <ReservationForm roomId={roomId} hotelId={hotelId} />
        </div>
      )}
    </div>
  );
};

export default RoomDetails;


