import Stripe from "stripe";
<<<<<<< HEAD
import Reservation from "../models/Reservation.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const processPayment = async (req, res) => {
  const { amount, email, reservationId } = req.body;

  if (!amount || !email || !reservationId) {
    return res.status(400).send({ error: "Amount, email, and reservationId are required" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      receipt_email: email,
    });

    
    await Reservation.findByIdAndUpdate(reservationId, { isPaid: true });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe payment error:", error);
=======

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  // Extract amount and email from the request body
  const { amount, email } = req.body;

  // Validate required fields
  if (!amount || !email) {
    return res.status(400).send({ error: "Amount and email are required" });
  }

  try {
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in the smallest currency unit (e.g., cents for USD)
      currency: "usd", // Currency (you can change this as needed)
      receipt_email: email, // Customer email for the receipt
    });

    // Send the client secret back to the frontend
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe payment error:", error);

    // Send an error response if the payment creation fails
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
    res.status(500).send({ error: error.message });
  }
};
