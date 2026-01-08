import express from 'express';
import { getDbConnection } from '../db.js';

export async function getMessages(req,res){
  const db = await getDbConnection()
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required",
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        message: "Message too long",
      });
    }

    const userId = req.session?.user?.id || null;

    await db.run(
      `
      INSERT INTO messages (name, email, subject, message, user_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [name.trim(), email.trim(), subject?.trim() || null, message.trim(), userId]
    );

    res.status(201).json({
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({ message: "Server error" });
  }
}