import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { useValue } from "../../context/ContextProvider";
import StripePaymentForm from "../Payment/StripePaymentForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
  },
};

Modal.setAppElement("#root");

const ReservationForm = () => {
  const { state } = useValue();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    roomId: "",
    userId: "",
    startDate: "",
    endDate: "",
    hotelId: "",
    email: "", 
    price: "", 
  });

  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);
  const [payNow, setPayNow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
   
    const storedHotelId = localStorage.getItem("hotelId");
    const storedRoomId = localStorage.getItem("roomId");
    const storedEmail = localStorage.getItem("email");
    const storedPrice = localStorage.getItem("price");

    if (storedHotelId && storedRoomId) {
      setFormData((prev) => ({  
        ...prev,
        hotelId: storedHotelId,
        roomId: storedRoomId,
        userId: state.user ? state.user.id : "",
        email: storedEmail || "",
        price: storedPrice || "",
      }));
    }
  }, [state.user]);

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
    setLoading(true);

    if (!formData.hotelId || !formData.roomId || !formData.userId || !formData.startDate || !formData.endDate) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (!state.user) {
      alert("You must be logged in to make a reservation.");
      navigate("/RegisterLogin", { state: { from: location } });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/reservations", formData);
      setReservation(response.data);
      if (payNow) {
        setIsModalOpen(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while creating the reservation.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    alert("Payment Successful");
    setReservation((prev) => ({
      ...prev,
      isPaid: true,
    }));
    setIsModalOpen(false);
  };

  const handlePaymentError = (message) => {
    alert("Payment Failed");
    setError(`Payment error: ${message}`);
  };

  return (
    <div>¨

      <h2>Create a Reservation</h2>
      {!reservation ? (
        <form onSubmit={handleSubmit}>
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

          {payNow && (
            <>
             
             
            </>
          )}

          <div>
            <label>
              <input
                type="checkbox"
                checked={payNow}
                onChange={(e) => setPayNow(e.target.checked)}
              />
              Pay Now
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Reservation"}
          </button>
        </form>
      ) : (
        <div>
          <h3>Reservation Details</h3>
          <p>Reservation ID: {reservation._id}</p>
          <p>Room Number: {reservation.roomnumber}</p>
          <p>User ID: {reservation.userId}</p>
          <p>Start Date: {new Date(reservation.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(reservation.endDate).toLocaleDateString()}</p>
          <p>Status: {reservation.status}</p>
          <p>Payment Status: {reservation.isPaid ? "Paid" : "Not Paid"}</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Payment Modal"
      >
        <h2>Payment</h2>
        <StripePaymentForm
          reservationId={reservation?._id}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
        <button onClick={() => setIsModalOpen(false)} style={{ marginTop: "10px" }}>
          Close
        </button>
      </Modal>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ReservationForm;
