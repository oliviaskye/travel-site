import express from "express";
import { register, login, getUsers, getUser, deleteUser} from "../controllers/Auth.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);

router.delete("/users/:id", deleteUser);

router.post("/register", register);
router.post("/login", login);
export default router;