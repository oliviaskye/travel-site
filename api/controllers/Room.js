// import Room from '../models/Room.js'; 
// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); 
//   },
// });

// const upload = multer({ storage: storage });

// export const createRoom = async (req, res) => {
//   try {
//     const { title, details, price, location } = req.body; 
    
//     const img = req.file.path; 
//     const newRoom = new Room({
//       title,
//       details,
//       img,
//       price,
//       location,
//     });

//     await newRoom.save();

//     res.status(201).json({
//       message: 'Room added successfully',
//       room: newRoom,
//     });
//   } catch (error) {
//     console.error("Error adding room:", error);
//     res.status(500).json({ message: 'Failed to add room', error: error.message });
//   }
// };


// export const getRooms = async (req, res) => {
//   try {
    
//     const rooms = await Room.find(); 
//     res.status(200).json(rooms); 
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching rooms' }); 
//   }
// };


import Room from '../models/Room.js';
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


export const createRoom = async (req, res) => {
  try {
    const { title, details, price, location } = req.body; 
    
   
    const img = req.file ? req.file.path : null;

    const newRoom = new Room({
      title,
      details,
      img,
      price,
      location,
    });

    await newRoom.save();

    res.status(201).json({
      message: 'Room added successfully',
      room: newRoom,
    });
  } catch (error) {
    console.error("Error adding room:", error);
    res.status(500).json({ message: 'Failed to add room', error: error.message });
  }
};


export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find(); 
    res.status(200).json(rooms); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching rooms' }); 
  }
};


export const getRoomById = async (req, res) => {
  const roomId = req.params.id;
  try {
    const room = await Room.findById(roomId); 
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error); 
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
