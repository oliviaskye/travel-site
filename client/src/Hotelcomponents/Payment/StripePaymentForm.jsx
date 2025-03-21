import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const StripePaymentForm = ({ reservationId, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Get the amount and the add-on data from localStorage
  useEffect(() => {
    const reservationData = JSON.parse(localStorage.getItem("reservationData"));
    const addsData = JSON.parse(localStorage.getItem("addsData"));

    if (reservationData && reservationData.price) {
      setAmount(reservationData.price); // Set the room price
    }

    if (addsData) {
      const additionalPrice = 
        addsData.wifiPrice + addsData.parkingPrice + addsData.roomServicePrice + addsData.breakfastPrice;

      // Calculate the total price by adding the room price and the add-ons
      setTotalPrice(parseFloat(reservationData.price) + additionalPrice);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      setMessage("Stripe is not ready yet.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/payment", {
        amount: totalPrice * 100, // Send the total price in cents
        email,
        reservationId,
      });

      const clientSecret = data.clientSecret;

      // Getting the CardElement from elements
      const cardElement = elements.getElement(CardElement);

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email,
          },
        },
      });

      if (error) {
        onPaymentError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent);
      }
    } catch (error) {
      setMessage(`An unexpected error occurred: ${error.message}`);
      onPaymentError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Stripe Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Amount (USD)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            readOnly
          />
        </div>
        <div>
          <CardElement />
        </div>
        <button type="submit" disabled={loading || !stripe}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>

      <h1>Total Price: ${totalPrice.toFixed(2)}</h1> {/* Display total price */}

      {message && <p>{message}</p>}
    </div>
  );
};

export default StripePaymentForm;
