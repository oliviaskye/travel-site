import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

import { startServer } from "./database.js";
import roomRoutes from "./routes/Room.js";
import authRoutes from "./routes/Auth.js";
import hotelRoutes from "./routes/Hotel.js";
import reservationRoutes from './routes/Reservation.js';
import GetUsers from './routes/Auth.js'
import processPayment from "./routes/payment.js";

// Load environment variables from .env file
dotenv.config();
const app = express();

// Check if 'uploads' directory exists, if not, create it
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/", GetUsers);
app.use("/api/hotels", hotelRoutes);
app.use("/api/hotels", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/payment", processPayment);

app.use('/uploads', express.static('uploads'));



// Start the database server (if needed)
startServer(app);
