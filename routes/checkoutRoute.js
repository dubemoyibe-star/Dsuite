import express from "express";
import { getCheckout } from "../controllers/checkoutController.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const checkoutRouter = express.Router();

checkoutRouter.post('/', requireAuth, getCheckout);

