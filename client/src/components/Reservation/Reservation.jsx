import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for current path
import { useValue } from '../../context/ContextProvider';
import PaymentForm from '../Payment/Payment';

const ReservationForm = ({ roomId, hotelId }) => {
  const { state } = useValue();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const [formData, setFormData] = useState({
    roomId: '',
    userId: '',
    startDate: '',
    endDate: '',
    hotelId: '',
  });

  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [payNow, setPayNow] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      roomId,
      userId: state.user ? state.user.id : '',
      hotelId,
    }));
  }, [state.user, roomId, hotelId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!state.user) {
      alert('You must be logged in to make a reservation.');
      navigate('/RegisterLogin', { state: { from: location } });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reservations', formData);
      setReservation(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    setPaymentSuccess(true);
    console.log('Payment successful:', paymentData);
  };

  const handlePaymentError = (message) => {
    setError(`Payment error: ${message}`);
  };

  return (
    <div>
      <h2>Create a Reservation</h2>
      {!reservation ? (
        <form onSubmit={handleSubmit}>
          {/* <div>
            <label>User ID:</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              readOnly
            />
          </div> */}
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
          <div>


           <br />
         

            <label>
              <input
                type="checkbox"
                checked={payNow}
                onChange={(e) => setPayNow(e.target.checked)}
              />
              Pay Now
            </label>
          </div>
          <button type="submit">Create Reservation</button>
        </form>
      ) : (
        <>
          {!paymentSuccess ? (
            <div>
              <h3>Reservation Details</h3>
              <p>Reservation ID: {reservation._id}</p>
              <p>Room Number: {reservation.roomnumber}</p>
              <p>User ID: {reservation.userId}</p>
              <p>Start Date: {new Date(reservation.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(reservation.endDate).toLocaleDateString()}</p>

              {payNow ? (
                <>
                  <h3>Payment</h3>
                  <PaymentForm
                    reservationId={reservation._id}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                  />
                </>
              ) : (
                <p>You have chosen to pay later. Please ensure payment is completed before your stay.</p>
              )}
            </div>
          ) : (
            <div>
              <h3>Payment Successful</h3>
              <p>Your reservation and payment were completed successfully.</p>
            </div>
          )}
        </>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default ReservationForm;
