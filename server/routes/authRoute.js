import  express  from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { authLimiter } from "../middleware/rateLimiters.js";

export const authRouter = express.Router();

authRouter.post('/register', authLimiter, registerUser);
authRouter.post('/login', authLimiter, loginUser);
authRouter.post('/logout', authLimiter, logoutUser);