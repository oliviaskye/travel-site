import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


export const createHotel = async (req, res, next) => {
  try {
    // تحقق أولاً من وجود فندق موجود مسبقًا
    const existingHotel = await Hotel.findOne();
    if (existingHotel) {
      return res.status(400).json({ message: "A hotel already exists. Only one hotel document is allowed." });
    }

    // استخراج البيانات الخاصة بالغرف من الطلب
    const { rooms, ...hotelData } = req.body;

    // إضافة الغرف إذا كانت موجودة في الطلب
    const roomDocs = rooms && rooms.length > 0 
      ? await Room.insertMany(rooms.map(room => ({
          title: room.title, 
          details: room.details, 
          img: room.img, 
          price: room.price, 
          location: room.location 
        }))) 
      : [];

    const roomIds = roomDocs.map((room) => room._id);


    const newHotel = new Hotel({
      ...hotelData,
      rooms: roomIds,
    });

    const savedHotel = await newHotel.save();

    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};


export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};


export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};


export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};



export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


export const getHotelRooms = async (req, res, next) => {
  try {
    const hotelId = req.params.id.trim(); 
    console.log("Fetching hotel with ID:", hotelId);
    
    const hotel = await Hotel.findById(hotelId);
    
    if (!hotel) {
      console.log("Hotel not found");
      return res.status(404).json({ message: "Hotel not found" });
    }

    const list = await Promise.all(
      hotel.rooms.map((roomId) => Room.findById(roomId))
    );

    res.status(200).json(list);
  } catch (err) {
    console.error("Error fetching hotel rooms:", err);
    next(err);
  }
};
