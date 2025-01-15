import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

<<<<<<< HEAD
const StripePaymentForm = ({ reservationId, onPaymentSuccess, onPaymentError }) => {
=======
const StripePaymentForm = () => {
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
<<<<<<< HEAD
  const [amount, setAmount] = useState(""); 
=======
  const [amount, setAmount] = useState("");
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
<<<<<<< HEAD
      const { data } = await axios.post("http://localhost:5000/api/payment", {
        amount: parseFloat(amount) * 100,
        email,
        reservationId,
=======
      // Create PaymentIntent on the server
      const { data } = await axios.post("/api/create-payment-intent", {
        amount: parseFloat(amount) * 100, // Convert to cents
        email,
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
      });

      const clientSecret = data.clientSecret;

<<<<<<< HEAD
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
=======
      // Confirm the payment using client_secret
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email,
            },
          },
        }
      );

      if (error) {
        setMessage(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === "succeeded") {
        setMessage("Payment succeeded!");
      }
    } catch (error) {
      setMessage(`An unexpected error occurred: ${error.message}`);
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
<<<<<<< HEAD
      <h2>Stripe Payment Form</h2>
=======
      <h1>Stripe Payment in React</h1>
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
<<<<<<< HEAD
            placeholder="Email"
=======
            placeholder="Your email"
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
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
          />
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
<<<<<<< HEAD
=======

>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
