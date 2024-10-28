import Room from '../models/Room.js'; 
import jwt from 'jsonwebtoken';


export const createRoom = async (req, res) => {
  console.log('Request body:', req.body);
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { _id: uid, name: uName } = user;
  
    const newRoom = new Room({
      ...req.body,
      uid,
      uName,
    });
  
    await newRoom.save();
    res.status(201).json({ success: true, result: newRoom });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
