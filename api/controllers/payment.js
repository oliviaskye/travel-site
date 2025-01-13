import Stripe from "stripe";


// Initialize Stripe with your secret key
const stripe = new Stripe("sk_test_51QFvkhLAzYW8YRzj0TEpJ9Y1OOQJCYy7K7JvOaplWmDZpI1UcUX3V5mxA37NOrTpXHk96gT6VkaYR91HHBKfnHYZ002HzPfgrG");

export const handlePayment = async (req, res) => {
  try {
    // Log the incoming request body
    console.log("Request body:", req.body);
    
    const { amount, email, token } = req.body;

    // Check if the required fields exist in the request body
    if (!amount || !email || !token) {
      console.log("Missing required parameters: amount, email, or token.");
      return res.status(400).send({
        success: false,
        message: "Missing required parameters: amount, email, or token.",
      });
    }

    // Log the amount, email, and token to verify they are received correctly
    console.log("Amount:", amount);
    console.log("Email:", email);
    console.log("Token:", token);

    // Create a new customer
    console.log("Creating customer...");
    const customer = await stripe.customers.create({
      email: email,
      source: token.id,
      name: token.card.name,
    });
    console.log("Customer created:", customer);

    // Check if customer creation was successful
    if (!customer || !customer.id) {
      console.log("Failed to create customer.");
      return res.status(500).send({
        success: false,
        message: "Failed to create customer.",
      });
    }

    // Charge the customer
    console.log("Charging customer...");
    const charge = await stripe.charges.create({
      amount: Math.round(parseFloat(amount) * 100), // Convert to cents
      description: `Payment for USD ${amount}`,
      currency: "USD",
      customer: customer.id,
    });
    console.log("Charge created:", charge);

    // Send success response
    res.status(200).send({
      success: true,
      message: "Payment successful",
      charge,
    });
  } catch (error) {
    // Log the error message and the full error object
    console.error("Error during payment:", error.message);
    console.error("Full error details:", error);

    // Send failure response
    res.status(500).send({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
};
=======

export default handlePayment;

