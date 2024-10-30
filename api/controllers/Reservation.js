import Room from "../models/Room.js";
import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  const { roomId, userId, startDate, endDate } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }


    const existingReservations = await Reservation.find({
      roomId,
      $or: [
        { startDate: { $lte: endDate, $gte: startDate } },
        { endDate: { $gte: startDate, $lte: endDate } }
      ]
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({ message: "Room is already booked for the selected dates." });
    }

    const newReservation = new Reservation({
      roomId,
      userId,
      startDate,
      endDate,
    });
    const savedReservation = await newReservation.save();

    res.status(201).json(savedReservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Error creating reservation", error: error.message });
  }
};
