import express from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import { getDbConnection } from "../db.js";

export async function registerUser(req, res) {
  let { name, username, email, password } = req.body;
  const db = await getDbConnection();

  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

 name = name.trim();
 email = email.trim();
 username = username.trim();

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {

    return res.status(400).json(
      { message: 'Username must be 1–20 characters, using letters, numbers, _ or -.' }
    )
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if(!validator.isLength(password, { min: 6})) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  try {
    const existingUser = await db.get("SELECT * FROM users WHERE email = ? OR username = ?", [email, username]);
    if (existingUser) {
      return res.status(409).json({ message: "User with this email or username already exists." });
    }



    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
      "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)",
      [name, username, email, hashedPassword]
    );
    req.session.userId = result.lastID
    return res.status(201).json({ message: "Account created successfully" });
  }catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ message: "Registration failed. Please try again." });
  } finally {
    await db.close();
  }


}

export async function loginUser(req, res) {
  let { username, password } = req.body;
  const db = await getDbConnection();

  if(!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }
   
  username = username.trim();

  try{
    const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
    if(!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.userId = user.id
    res.status(200).json({ message: "Login successful" });
  }catch (err) {
    console.error("Error logging in user:", err.message);
    return res.status(500).json({ message: "Login failed. Please try again" });
  }finally {
    await db.close();
  }


}

export async function logoutUser(req, res) {
     req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out" });
  });
}