import express from "express";
import { handlePayment } from "../controllers/payment.js";

const router = express.Router();

// Route for handling payment
router.post("/", handlePayment);

export default router;  // Use 'export default' instead of 'module.exports' since we're using ES modules.