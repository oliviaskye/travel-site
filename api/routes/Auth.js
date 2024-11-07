import express from "express";
import { register, login, GetUsers, deleteUser} from "../controllers/Auth.js";

const router = express.Router();

router.get("/users", GetUsers);

router.delete("/users/:id", deleteUser);

router.post("/register", register);
router.post("/login", login);
export default router;

