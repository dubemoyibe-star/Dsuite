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


export async function getUserData(req, res) {
  try {

    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.session.userId;

    const db = await getDbConnection();

    const rows = await db.all(
      `
      SELECT
        b.id,
        b.check_in,
        b.check_out,
        b.total_price,
        b.status,
        b.physical_room_number,
        r.name AS room_name,
        r.image_url AS room_image,
        r.max_guests,
        (julianday(b.check_out) - julianday(b.check_in)) AS nights
      FROM bookings b
      JOIN rooms r ON r.id = b.room_id
      WHERE b.user_id = ?
      ORDER BY b.check_in DESC
      `,
      [userId]
    );

    const formatted = rows.map(row => ({
      id: row.id,
      room_name: row.room_name,
      room_image: row.room_image,
      check_in: row.check_in,
      check_out: row.check_out,
      guests: row.max_guests,
      nights: Number(row.nights),
      total_price: row.total_price,
      status: row.status,
      physical_room_number: row.physical_room_number,
    }));

    res.json(formatted);

  } catch (err) {
    console.error("BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function cancelBooking(req, res) {

  console.log("CANCEL ROUTE HIT", req.params.id);
  const db = await getDbConnection();
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

   
    const bookingId = req.params.id;
    const userId = req.session.userId
    const role = req.session.role

    const booking = await db.get(
      "SELECT user_id, status FROM bookings WHERE id = ?",
      [bookingId]
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const isOwner = booking.user_id === userId;
    const isAdmin = role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

     if (booking.status === "cancelled") {
      await db.close();
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    await db.run(
      "UPDATE bookings SET status = 'cancelled' WHERE id = ?",
      [bookingId]
    );

    res.json({ message: "Booking cancelled" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }finally{
    await db.close()
  }
}

export async function getAdminBookings(req, res){
   const db = await getDbConnection();

    const bookings = await db.all(`
      SELECT
        b.id,
        b.user_id,
        b.check_in,
        b.check_out,
        b.total_price,
        b.status,
        b.physical_room_number,
        r.name AS room_name,
        r.image_url AS room_image,
        (julianday(b.check_out) - julianday(b.check_in)) AS nights
      FROM bookings b
      JOIN rooms r ON r.id = b.room_id
      ORDER BY b.check_in DESC
    `);

    res.json(bookings);

    await db.close()
}

export async function adminCancelBooking(req,res){
    const bookingId = req.params.id;
    const db = await getDbConnection();

    const result = await db.run(
      "UPDATE bookings SET status = 'cancelled' WHERE id = ?",
      [bookingId]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking cancelled by admin" });
}

export async function assignPhysicalRoom(req,res){
   const db = await getDbConnection();
  try {
    if (!req.session?.userId || req.session.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const bookingId = req.params.id;
    const { physical_room_number } = req.body;

    if (!physical_room_number) {
      await db.close();
      return res.status(400).json({ message: "Room number required" });
    }

    const booking = await db.get(
      "SELECT status FROM bookings WHERE id = ?",
      [bookingId]
    );

    if (!booking) {
      await db.close();
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "cancelled") {
      await db.close();
      return res.status(400).json({ message: "Cannot assign room to cancelled booking" });
    }

    await db.run(
      "UPDATE bookings SET physical_room_number = ? WHERE id = ?",
      [physical_room_number, bookingId]
    );

    await db.close();
    res.json({ message: "Room assigned successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}