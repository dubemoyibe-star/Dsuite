import express from 'express'
import { getDbConnection } from '../db.js'

export async function getAllMessages(req,res){
  const db = await getDbConnection()
   try {
    const messages = await db.all(`
      SELECT *
      FROM messages
      ORDER BY created_at DESC
    `);

    res.json(messages);
  } catch (err) {
    console.error("Fetch messages error:", err);
    res.status(500).json({ message: "Server error" });
  }finally{
    await db.close()
  }
}

export async function updateMessages(req,res){
  const db = await getDbConnection()
  try {
    const { id } = req.params;

    await db.run(
      `UPDATE messages SET status = 'read' WHERE id = ?`,
      [id]
    );

    res.json({ message: "Message marked as read" });
  } catch (err) {
    console.error("Update message error:", err);
    res.status(500).json({ message: "Server error" });
  }finally{
    await db.close()
  }

}

export async function deleteMessages(req,res){
  const db = await getDbConnection()
  try {
    const { id } = req.params;

    await db.run(`DELETE FROM messages WHERE id = ?`, [id]);

    res.json({ message: "Message deleted" });
  } catch (err) {
    console.error("Delete message error:", err);
    res.status(500).json({ message: "Server error" });
  }finally{
    await db.close()
  }
}