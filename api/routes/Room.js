import express from 'express';
import { createRoom, getRooms,getRoomById} from "../controllers/Room.js";
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();


router.post('/', upload.single('img'), createRoom);
router.get('/', getRooms);
router.get('/:id', getRoomById);

export default router;
