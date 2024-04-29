import express from "express";
import { login, signup } from "../controllers/userController";
import { signupValidator } from "../middleware/validator";
const router = express.Router();

router.post("/signup", signupValidator, signup);

router.post("/login", login);

export default router;
