import Stripe from "stripe";
const stripe = new Stripe("sk_test_51QFvkhLAzYW8YRzj0TEpJ9Y1OOQJCYy7K7JvOaplWmDZpI1UcUX3V5mxA37NOrTpXHk96gT6VkaYR91HHBKfnHYZ002HzPfgrG");

const handlePayment = async (req, res) => {
  try {
    const { amount, email, paymentMethodId } = req.body;

    // Validate required parameters
    if (!amount || !email || !paymentMethodId) {
      return res.status(400).send({
        success: false,
        message: "Missing required parameters: amount, email, and paymentMethodId.",
      });
    }

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(amount) * 100), // Convert dollars to cents
      currency: "usd",
      payment_method: paymentMethodId,
      receipt_email: email,
      confirm: true, // Automatically confirm the payment
    });

    // Respond with success
    res.status(200).send({
      success: true,
      message: "Payment successful.",
      paymentIntent,
    });
  } catch (error) {
    console.error("Error during payment process:", error.message);

    // Handle Stripe errors specifically
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

export default handlePayment;
