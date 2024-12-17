import express from "express";
import { processPayment } from '../controllers/PaymentIntent.js';


const router = express.Router();

// Route for handling payment
router.post("/",processPayment );

export default router;  // Use 'export default' instead of 'module.exports' since we're using ES modules.
