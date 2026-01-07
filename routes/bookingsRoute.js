import express from "express";
import { 
  getCheckout, 
  getUserData , 
  cancelBooking, 
  getAdminBookings,
  adminCancelBooking,
  assignPhysicalRoom

} from "../controllers/bookingsController.js";
import { requireAuth} from "../middleware/requireAuth.js";
import { adminOnly } from "../middleware/adminOnly.js";

export const bookingsRouter = express.Router();

bookingsRouter.post('/checkout', requireAuth, getCheckout);
bookingsRouter.get('/me', requireAuth, getUserData)
bookingsRouter.patch('/cancel/:id', requireAuth, cancelBooking )
bookingsRouter.get('/admin', requireAuth, adminOnly,  getAdminBookings)
bookingsRouter.patch('/admin/cancel/:id', requireAuth, adminOnly, adminCancelBooking)
bookingsRouter.patch('/admin/assign-room/:id', requireAuth, adminOnly, assignPhysicalRoom)