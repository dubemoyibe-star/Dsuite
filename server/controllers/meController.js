import express from "express";
import { getDbConnection } from "../db.js";

export async function getCurrentUser(req, res) {
  const db = await getDbConnection();
  try {
    const userId = req.session.userId;

    if(!userId) {
      return res.status(200).json({ isLoggedIn: false });
    }
    
    
    
    const user = await db.get('SELECT id, name, role,  username, email FROM users WHERE id = ?', [userId]);
     if (!user) {
      req.session.destroy(() => {});
      return res.status(200).json({ isLoggedIn: false, user: null });
    }
    return res.status(200).json({ isLoggedIn: true, user });
   
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
      await db.close();
    }
}