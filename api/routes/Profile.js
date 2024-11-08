import express from "express";
import {findUser} from '../controllers/Profile.js';

const router = express.Router();

router.get("/find/:id", findUser);

export default router;
