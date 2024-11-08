import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import 'Reservation.css';

const Reservation = () => {
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [message, setMessage] = useState("");
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    const fetchRoomDetails = async () => {
      const roomId = window.location.pathname.split('/')[2]; 
      try {
        const response = await axios.get(`http://localhost:5000/api/room/${roomId}`);
        setRoomDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError("Failed to fetch room details. Please try again.");
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setMessage("Please select both start and end dates.");
      return;
    }

    try {
      const roomId = window.location.pathname.split('/')[2]; 
      await axios.post("http://localhost:5000/api/reservation", {
        roomId,
        userId,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      });

      setMessage("Reservation created successfully!");
    } catch (error) {
      console.error("Error creating reservation:", error);
      setMessage("Error creating reservation");
    }
  };

  if (loading) return <p>Loading room details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>Reservation Form</h2>
      {roomDetails && (
        <div className="subcontainer">
          <h3>{roomDetails.title}</h3>
          <p>{roomDetails.details}</p>
          <p><strong>Price:</strong> ${roomDetails.price}</p>
          <p><strong>Location:</strong> {roomDetails.location}</p>
          <img
            src={`http://localhost:5000/${roomDetails.img ? roomDetails.img.replace(/\\/g, "/") : "default-image.jpg"}`}
            alt={roomDetails.title}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        </div>
      )}
      <form className='reservation-form' onSubmit={handleSubmit}>
        <label>Date Range:</label><br/>
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />

        <button type="submit">Submit Reservation</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Reservation;
