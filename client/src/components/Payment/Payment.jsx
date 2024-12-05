// PaymentForm.js
import React from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ reservationId, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      // Create a PaymentMethod with Stripe
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) throw new Error(error.message);

      // Send the payment method ID and reservation ID to the backend via HTTPS
      const response = await axios.post("https://localhost:5000/api/payment", {
        paymentMethodId: paymentMethod.id,
        reservationId,
      });

      if (response.status === 200) {
        onPaymentSuccess(response.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      onPaymentError(err.message);
    }
  };

  return (
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
