import { getDbConnection } from './db.js';

async function createTable() {

  const db = await getDbConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      user_id INTEGER NOT NULL,
      room_id INTEGER NOT NULL,

      check_in TEXT NOT NULL,
      check_out TEXT NOT NULL,

      total_price REAL NOT NULL,

      status TEXT NOT NULL DEFAULT 'booked',

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (room_id) REFERENCES rooms(id)
    );
    `);

    console.log("bookings table created successfully");
    await db.close();

}

createTable()
  .catch((err) => {
  console.error("Error creating table:", err);
});