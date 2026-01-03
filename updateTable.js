import { getDbConnection } from "./db.js";


async function updateTable() {
  const db = await getDbConnection();

  try {
    await db.exec(`
      UPDATE rooms SET image_url = 'standard.jpg' WHERE id = 4;
      UPDATE rooms SET image_url = 'presidential.jpg'   WHERE id = 5;
      UPDATE rooms SET image_url = 'deluxe.jpg'    WHERE id = 6;
    `);

    console.log("Room image names updated successfully");
  } catch (error) {
    console.error("Error updating room images:", error);
  } finally {
    await db.close();
  }
}

updateTable();