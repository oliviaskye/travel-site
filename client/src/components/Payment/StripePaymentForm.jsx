import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
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
      // Create PaymentIntent on the server
      const { data } = await axios.post("/api/create-payment-intent", {
        amount: parseFloat(amount) * 100, // Convert to cents
        email,
      });

      const clientSecret = data.clientSecret;

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Stripe Payment in React</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Your email"
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

