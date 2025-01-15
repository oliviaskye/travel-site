<<<<<<< HEAD
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
=======

import React from "react";
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
import axios from "axios";

// Stripe public key
const stripePromise = loadStripe("pk_test_51QFvkhLAzYW8YRzjlm4VYKp19bMXpFMoHcCsHM3wda661NR4YOjHO2iyXMrDZmNqKfGUNXD5neKjeUmt1mTClIgc00RBYWEAAX");

const StripePaymentForm = ({ reservationId, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(""); // Amount should be passed dynamically from Reservation data
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
      // Request to the server to create the PaymentIntent
      const { data } = await axios.post("http://localhost:5000/api/payment", {
        amount: parseFloat(amount) * 100, // Convert to cents
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
<<<<<<< HEAD
    } catch (error) {
      setMessage(`An unexpected error occurred: ${error.message}`);
      onPaymentError(error.message);
    } finally {
      setLoading(false);
=======
    } catch (err) {
      onPaymentError(err.message);

>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
    }
  };

  return (
<<<<<<< HEAD
    <div>
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

const App = () => (
  <Elements stripe={stripePromise}>
    <StripePaymentForm />
  </Elements>
);

export default App;
=======

    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe}>
        Submit Payment
      </button>
    </form>
  );
};

export default PaymentForm;

>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
