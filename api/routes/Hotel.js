import express from "express";
import { createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/Hotel.js";

const router = express.Router();

// CREATE
router.post("/", createHotel);

// UPDATE
router.put("/:id", updateHotel);

// DELETE
router.delete("/:id", deleteHotel);

// GET
router.get("/", getHotels);
router.get("/find/:id", getHotel);
router.get("/room/:id", getHotelRooms);

export default router;
