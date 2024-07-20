import { Router } from "express";
import { loginUser, registerAdmin } from "../controllers/UserController";

const userRoutes = Router();

userRoutes.post("/signup", registerAdmin).post("/login", loginUser);

export default userRoutes;