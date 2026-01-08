import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_PATH 
    : path.join(__dirname, "./database.db"); 

export async function getDbConnection() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  return db;
}