// 'import { Router } from 'express'; 
// import Hotel from '../models/Hotel'; 
// const router = Router();

// router.get("/map", async (req, res, next) => {
//   try {
//     const { query } = req.query;

//     if (!query) {
//       return res.status(400).json({ message: "Query parameter is required." });
//     }

//     const trimmedQuery = query.trim().toLowerCase();

//     const hotels = await Hotel.find({
//       $or: [
//         { city: { $regex: new RegExp(trimmedQuery, "i") } },
//         { country: { $regex: new RegExp(trimmedQuery, "i") } },
//       ],
//     });

//     if (hotels.length === 0) {
//       return res.status(404).json({
//         message: "No hotels found for the given search criteria.",
//       });
//     }

//     res.status(200).json(hotels);
//   } catch (err) {
//     console.error("Error fetching hotels:", err);
//     next(err);
//   }
// });

// export default router;
// '