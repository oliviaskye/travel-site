import express from "express";
import dotenv from "dotenv";
import roomRoutes from "./routes/Room.js"
import authRoutes from "./routes/Auth.js"
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type, Authorization"
    );
    next();
});


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());


//Router
app.use("/api/room", roomRoutes); 
app.use("/api/auth", authRoutes); 






const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        app.listen(port, () =>
            console.log(`Server is listening on http://localhost:${port}`)
        );
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

startServer();
 






// app.get("/", (req, res) => res.json({ message: "Welcome to our API" }));
// app.use((req, res) =>
//     res.status(404).json({ success: false, message: "Not Found" })
// );