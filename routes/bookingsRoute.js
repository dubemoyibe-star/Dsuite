import express from "express";
import { getCheckout } from "../controllers/bookingsController.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const bookingsRouter = express.Router();

bookingsRouter.post('/checkout', requireAuth, getCheckout);

