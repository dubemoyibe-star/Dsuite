import express from "express";
import { getDbConnection } from "../db.js";

export async function getCheckout(req, res) {
  const userId = req.session.userId;
  const { room_id, check_in, check_out, adults, children } = req.body;
  const db = await getDbConnection();

  const totalGuests = Number(adults) + Number(children);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!room_id || !check_in || !check_out) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (new Date(check_in) >= new Date(check_out)) {
    return res.status(400).json({ message: "Invalid date range" });
  }

 
  try {
  const room = await db.get(
    "SELECT price_per_night, max_guests FROM rooms WHERE id = ?",
    [room_id]
  );

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  if (totalGuests > room.max_guests) {
      return res.status(400).json({
        message: `Maximum allowed guests for this room is ${room.max_guests}`,
      });
    }

  const conflict = await db.get(
    `
    SELECT id FROM bookings
    WHERE room_id = ?
    AND status != 'cancelled'
    AND (
      check_in < ?
      AND check_out > ?
    )
    `,
    [room_id, check_out, check_in]
  );

  if (conflict) {
    return res
      .status(409)
      .json({ message: "Room not available for selected dates" });
  }

  const nights =
    (new Date(check_out) - new Date(check_in)) /
    (1000 * 60 * 60 * 24);

  const total_price = nights * room.price_per_night;

  const result = await db.run(
    `
    INSERT INTO bookings (
      user_id,
      room_id,
      check_in,
      check_out,
      total_price,
      status
    ) VALUES (?, ?, ?, ?, ?, 'booked')
    `,
    [userId, room_id, check_in, check_out, total_price]
  );

  return res.status(201).json({
    message: "Booking created successfully",
    booking_id: result.lastID
  });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}