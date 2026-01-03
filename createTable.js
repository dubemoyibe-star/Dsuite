import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';
import { get } from 'node:http';
import { getDbConnection } from './db.js';

async function createTable() {

  const db = await getDbConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price_per_night INTEGER NOT NULL,
      image_url TEXT,
      max_guests INTEGER DEFAULT 1,
      beds INTEGER DEFAULT 1,
      size_sqm INTEGER,                 
      has_wifi INTEGER DEFAULT 1,       
      has_ac INTEGER DEFAULT 1,
      has_tv INTEGER DEFAULT 1,
      has_breakfast INTEGER DEFAULT 0,
      is_available INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
    `);

    await db.close();
    console.log("table created successfully");

}

createTable()
  .catch((err) => {
  console.error("Error creating table:", err);
});