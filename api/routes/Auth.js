import express from "express";
import {
  register,
  login,
  GetUsers,
  getUser,
  deleteUser,
  PutUser,
} from "../controllers/Auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", GetUsers);
router.get("/users/:id", getUser);

router.delete("/users/:id",  deleteUser);

router.put("/users/:id",PutUser);

export default router;