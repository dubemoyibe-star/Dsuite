import { getDbConnection } from "./db.js";

async function alterTable() {
  const db = await getDbConnection();

  try {
    await db.exec(`
      ALTER TABLE rooms ADD COLUMN thumbnails TEXT;
    `);
    console.log("Table altered successfully");
  } catch (error) {
    console.error("Error altering table:", error.message);
  } finally {
    await db.close();
  }
}

alterTable();