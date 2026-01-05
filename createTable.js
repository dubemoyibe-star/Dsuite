import { getDbConnection } from './db.js';

async function createTable() {

  const db = await getDbConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
    `);

    console.log("users table created successfully");
    await db.close();

}

createTable()
  .catch((err) => {
  console.error("Error creating table:", err);
});