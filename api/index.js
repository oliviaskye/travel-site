import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

import { startServer } from "./database.js";
import roomRoutes from "./routes/Room.js";
import authRoutes from "./routes/Auth.js";
import hotelRoutes from "./routes/Hotel.js";
import reservationRoutes from './routes/Reservation.js';
import getUsers from './routes/Auth.js'
import processPayment from "./routes/payment.js";

// Load environment variables from .env file
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

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/", getUsers);

app.use("/api/hotels", hotelRoutes);
app.use("/api/hotels", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/payment", processPayment);

app.use('/uploads', express.static('uploads'));



// Start the database server (if needed)
startServer(app);
