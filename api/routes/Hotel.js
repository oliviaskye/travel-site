import express from "express";
import { createHotel, deleteHotel, getHotel,  getHotels, updateHotel } from "../controllers/Hotel.js";
import upload from "../Middleware/upload.js";

const router = express.Router();

// POST
router.post("/", upload.array("photos"), createHotel);

// UPDATE
router.put("/:id", updateHotel);

// DELETE
router.delete("/:id", deleteHotel);

// GET
router.get("/", getHotels);
router.get("/find/:id", getHotel);




export default router;