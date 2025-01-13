import Stripe from "stripe";

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
    res.status(500).send({ error: error.message });
  }
};
