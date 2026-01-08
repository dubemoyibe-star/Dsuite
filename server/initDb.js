import fs from "fs";
import sqlite3 from "sqlite3";

const PROD_DB_PATH = "/var/data/database.db";
const SOURCE_DB_PATH = "./database.db";

function hasTables(dbPath) {
  return new Promise((resolve) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) return resolve(false);

      db.all(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
        (err, rows) => {
          db.close();
          if (err) return resolve(false);
          resolve(rows.length > 0);
        }
      );
    });
  });
}

export async function ensureDatabase() {
  if (process.env.NODE_ENV !== "production") return;

  if (!fs.existsSync(PROD_DB_PATH)) {
    fs.mkdirSync("/var/data", { recursive: true });
    fs.copyFileSync(SOURCE_DB_PATH, PROD_DB_PATH);
    console.log("✅ DB copied (file did not exist)");
    return;
  }

  const tablesExist = await hasTables(PROD_DB_PATH);

  if (!tablesExist) {
    fs.copyFileSync(SOURCE_DB_PATH, PROD_DB_PATH);
    console.log("✅ DB copied (empty database fixed)");
  } else {
    console.log("✅ DB already initialized");
  }
}