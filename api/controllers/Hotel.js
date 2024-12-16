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



export const filterHotelsByCityAndPrice = async (req, res, next) => {
  try {
    const { city, minPrice, maxPrice } = req.query;

    if (!city || !minPrice || !maxPrice) {
      return res.status(400).json({ message: "City, minPrice, and maxPrice parameters are required." });
    }

    const parsedMinPrice = Number(minPrice);
    const parsedMaxPrice = Number(maxPrice);

    if (isNaN(parsedMinPrice) || isNaN(parsedMaxPrice)) {
      return res.status(400).json({ message: "Invalid price values" });
    }

    const hotels = await Hotel.find({
      city: city,
      cheapestPrice: { $lte: parsedMaxPrice },
      maxPrice: { $gte: parsedMinPrice },
    });

    if (hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found for the given filters." });
    }

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

export const Map = async (req, res, next) => {
  try {
    const { query } = req.query; 

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required." });
    }

    const trimmedQuery = query.trim().toLowerCase(); 

    const hotels = await Hotel.find({
      $or: [
        { city: { $regex: new RegExp(trimmedQuery, 'i') } },
        { country: { $regex: new RegExp(trimmedQuery, 'i') } },
      ],
    });

    if (hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found for the given search criteria." });
    }

    res.status(200).json(hotels);
  } catch (err) {
    console.error('Error fetching hotels:', err);
    next(err);
  }
};
