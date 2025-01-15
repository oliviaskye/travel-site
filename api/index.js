import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

import { startServer } from "./database.js";
import roomRoutes from "./routes/Room.js";
import authRoutes from "./routes/Auth.js";
import hotelRoutes from "./routes/Hotel.js";
import reservationRoutes from './routes/Reservation.js';
<<<<<<< HEAD
import GetUsers from './routes/Auth.js';
import processPayment from "./routes/payment.js";
import path from 'path';
import { fileURLToPath } from 'url';

=======
import GetUsers from './routes/Auth.js'

import handlePayment from "./routes/payment.js";
=======
import processPayment from "./routes/payment.js";


// Load environment variables from .env file
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
dotenv.config();
const app = express();

// Check if 'uploads' directory exists, if not, create it
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Middleware
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173"], 
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
// Get the current directory in ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

=======
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/", GetUsers);
app.use("/api/hotels", hotelRoutes);
app.use("/api/hotels", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/payment", processPayment);

<<<<<<< HEAD
// Start Server
=======
app.use("/api/payment", handlePayment);

=======
app.use("/api/payment", processPayment);


app.use('/uploads', express.static('uploads'));



// Start the database server (if needed)
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
startServer(app);
