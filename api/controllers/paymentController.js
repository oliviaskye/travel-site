// import Stripe from 'stripe';


// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key

// // Payment controller to handle payment processing
// export const processPayment = async (req, res) => {
//   const { amount, token, userId, roomId, startDate, endDate } = req.body; // Expect amount and token from the client
  
//   // Validation for missing data
//   if (!amount || !token || !userId || !roomId || !startDate || !endDate) {
//     return res.status(400).json({ message: "Missing required data" });
//   }

//   try {
//     // Create a payment intent with Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount, // amount in cents (e.g., $10 = 1000)
//       currency: 'usd',
//       payment_method_types: ['card'],
//       receipt_email: token.email, // Send email receipt
//       metadata: { userId, roomId, startDate, endDate }
//     });

//     // Save payment details in MongoDB
//     const payment = new Payment({
//       amount,
//       paymentIntentId: paymentIntent.id,
//       receiptEmail: token.email,
//     });

//     await payment.save();

//     // Send the client secret to the frontend
//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("Payment Error: ", error);
//     res.status(500).json({ error: error.message });
//   }
// };

