import express from "express";
<<<<<<< HEAD
import { processPayment } from '../controllers/PaymentIntent.js';
=======

import { handlePayment } from "../controllers/payment.js";
=======

>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a


const router = express.Router();

<<<<<<< HEAD
router.post("/",processPayment );

export default router;
=======
// Route for handling payment

router.post("/", handlePayment);

export default router;  // Use 'export default' instead of 'module.exports' since we're using ES modules.
=======
router.post("/",processPayment );

export default router;  // Use 'export default' instead of 'module.exports' since we're using ES modules.

>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
