import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const StripePaymentForm = ({
  reservationId,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // استرجاع بيانات الحجز والإضافات من localStorage
  useEffect(() => {
    const reservationData = JSON.parse(localStorage.getItem("reservationData")) || {};
    const addsData = JSON.parse(localStorage.getItem("addsData")) || {};

    const roomPrice = parseFloat(reservationData.price) || 0; // تحويل السعر إلى رقم عشري
    setAmount(roomPrice);

    const additionalPrice =
      (addsData.wifiPrice || 0) +
      (addsData.parkingPrice || 0) +
      (addsData.roomServicePrice || 0) +
      (addsData.breakfastPrice || 0);

    setTotalPrice(roomPrice + additionalPrice);
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
        amount: totalPrice * 100, // إرسال المبلغ بالسنتات
        email,
        reservationId,
      });

      const clientSecret = data.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { email },
          },
        }
      );

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
          <p>Amount (USD): {amount.toFixed(2)}</p>
          <p>Total Price (USD): {totalPrice.toFixed(2)}</p>
        </div>
        <div>
          <CardElement />
        </div>
        <button type="submit" disabled={loading || !stripe}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StripePaymentForm;
