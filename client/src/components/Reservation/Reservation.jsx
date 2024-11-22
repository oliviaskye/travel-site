import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useValue } from '../../context/ContextProvider';

const ReservationForm = ({ roomId, hotelId }) => { 
  const { state } = useValue();
  
  const [formData, setFormData] = useState({
    roomId: '',
    userId: '',
    startDate: '',
    endDate: '',
    hotelId: ''
  });

  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      roomId: roomId, 
      userId: state.user ? state.user.id : '',
      hotelId: hotelId 
    }));
  }, [state.user, roomId, hotelId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/reservations', formData);
      setReservation(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Create a Reservation</h2>
      <form onSubmit={handleSubmit}>
      
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            readOnly
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
      
        <button type="submit">Create Reservation</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {reservation && (
        <div>
          <h3>Reservation Details</h3>
          <p>Reservation ID: {reservation._id}</p>
          <p>Room Number: {reservation.roomnumber}</p>
          <p>User ID: {reservation.userId}</p>
          <p>Start Date: {new Date(reservation.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(reservation.endDate).toLocaleDateString()}</p>
         
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
