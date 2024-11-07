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
dotenv.config();
const app = express();

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

// Router
app.use("/api/auth", authRoutes);

app.use("/api/", GetUsers);

app.use("/api/hotels", hotelRoutes);
app.use("/api/hotels", roomRoutes);

app.use("/api/reservations", reservationRoutes);


app.use('/uploads', express.static('uploads'));

//START
startServer(app);
