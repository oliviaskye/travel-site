import express from "express";
import {
  register,
  login,
  getUsers,
  getUser,
  deleteUser,
  PutUser,
} from "../controllers/Auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

<<<<<<< HEAD
router.get("/users", GetUsers);
router.get("/users/:id", getUser);
=======
router.get("/users", verifyToken, isAdmin, getUsers);
router.get("/users/:id", verifyToken, isAdmin, getUser);
>>>>>>> ac5b9dec60074e4ce6223173ed67d4042f0c37cb

router.delete("/users/:id",  deleteUser);

router.put("/users/:id",PutUser);

export default router;