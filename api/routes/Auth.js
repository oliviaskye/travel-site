import express from "express";
import {
  register,
  login,
  getUsers,
  getUser,
  deleteUser,
  PutUser,
} from "../controllers/Auth.js";
import { verifyToken, isAdmin } from "../Middleware/admin.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", verifyToken, isAdmin, getUsers);
router.get("/users/:id", verifyToken, isAdmin, getUser);

router.delete("/users/:id", verifyToken, isAdmin, deleteUser);

router.put("/users/:id", verifyToken, isAdmin, PutUser);



export default router;
