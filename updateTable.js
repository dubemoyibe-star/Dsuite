import { getDbConnection } from "./db.js";


async function updateTable() {
  const db = await getDbConnection();

  const features = JSON.stringify([
  "Spacious room with elegant décor",
  "Generously sized comfortable bed",
  "Smart TV with entertainment options",
  "Comfortable seating area",
  "Modern bathroom with premium amenities"
])

  try {
    await db.run(`
      UPDATE rooms SET features = ?   WHERE id = 6;
    `, [features]);

    console.log("Room thumbails updated successfully");
  } catch (error) {
    console.error("Error updating room images:", error);
  } finally {
    await db.close();
  }
}

updateTable();