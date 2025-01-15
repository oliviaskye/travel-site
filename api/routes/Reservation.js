import express from 'express';
import { createReservation,  GetReservation,deleteReservation,GetReservationForUser   } from '../controllers/Reservation.js';

const router = express.Router();

router.post('/', createReservation);

router.get('/all', GetReservation);
router.delete('/:id', deleteReservation);
router.get('/user/:userId', GetReservationForUser);

export default router;