import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";
import { startServer } from "./database.js";

import roomRoutes from "./routes/Room.js";
import authRoutes from "./routes/Auth.js";
import Sunshine from "./routes/Hotel.js";
import reservationRoutes from './routes/Reservation.js';


dotenv.config();

const app = express();

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/hotels", Sunshine);
app.use('/api/reservation', reservationRoutes);





app.use('/uploads', express.static('uploads'));





startServer(app);
