import Hotel from "../models/Hotel.js";



export const createHotel = async (req, res, next) => {
  try {
    const { rooms, ...hotelData } = req.body;

    const newHotel = new Hotel({
      ...hotelData,
    });

    const savedHotel = await newHotel.save();

    res.status(200).json({ message: "Hotel added successfully", savedHotel });
  } catch (err) {
    next(err);
  }
};



// export const updateHotel = async (req, res, next) => {
//   try {
//     const updatedHotel = await Hotel.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );

//     res.status(200).json(updatedHotel);
//   } catch (err) {
//     next(err);
//   }
// };

export const updateHotel = async (req, res, next) => {
  try {
    console.log("Request body:", req.body); // فحص البيانات المرسلة
    console.log("Hotel ID:", req.params.id); // فحص المعرف المرسل

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" }); // التعامل مع حالة عدم وجود الفندق
    }

    res.status(200).json(updatedHotel);
  } catch (err) {
    console.error("Error updating hotel:", err); // تسجيل الخطأ
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




export const filterHotelsByCityAndPrice = async (req, res, next) => {
  try {
    const { city, price } = req.query;

    if (!city || !price) {
      return res.status(400).json({ message: "City and price parameters are required." });
    }

    const parsedPrice = Number(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Invalid price value" });
    }

    const hotels = await Hotel.find({
      city: city,
      cheapestPrice: { $lte: parsedPrice },
      maxPrice: { $gte: parsedPrice },
    });

    res.status(200).json(hotels);
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